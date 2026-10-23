import { useCallback, useEffect, useRef, useState } from "react";
import { stopGentleMusicalBeat } from "../lib/sound";

export interface SpeakOptions {
  onEnd?: () => void;
  playbackRate?: number;
}

export interface UseSpeechOptions {
  /** Chỉ bật true ở module cần thanh chữ Karaoke chạy theo tiến độ (ReadingActivity) để tránh re-render 60fps ở các module khác */
  trackProgress?: boolean;
}

const MAX_RAM_AUDIO_CACHE = 240;
const ramAudioBlobCache = new Map<string, string>();
const inFlightAudioFetch = new Map<string, Promise<string | null>>();

export function cleanSpeechText(text: string): string {
  return text
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Pure TypeScript UTF-8 MD5 implementation (khớp 100% với Node crypto & Python hashlib.md5)
 * để tra cứu trực tiếp file tĩnh /tts-cache/<md5>.mp3 trên cả Vercel CDN và Local.
 */
function md5Utf8(input: string): string {
  const utf8 = new TextEncoder().encode(input);
  const bitLen = utf8.length * 8;
  const padLen = ((56 - ((utf8.length + 1) % 64)) + 64) % 64;
  const buf = new Uint8Array(utf8.length + 1 + padLen + 8);
  buf.set(utf8);
  buf[utf8.length] = 0x80;
  const view = new DataView(buf.buffer);
  view.setUint32(buf.length - 8, bitLen >>> 0, true);
  view.setUint32(buf.length - 4, Math.floor(bitLen / 0x100000000) >>> 0, true);

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  const s = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];
  const K = new Uint32Array(64);
  for (let i = 0; i < 64; i++) {
    K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000) >>> 0;
  }

  for (let offset = 0; offset < buf.length; offset += 64) {
    let A = a0;
    let B = b0;
    let C = c0;
    let D = d0;

    for (let i = 0; i < 64; i++) {
      let F = 0;
      let g = 0;
      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }
      const word = view.getUint32(offset + g * 4, true);
      const temp = D;
      D = C;
      C = B;
      const sum = (A + F + K[i] + word) >>> 0;
      const rotated = ((sum << s[i]) | (sum >>> (32 - s[i]))) >>> 0;
      B = (B + rotated) >>> 0;
      A = temp;
    }

    a0 = (a0 + A) >>> 0;
    b0 = (b0 + B) >>> 0;
    c0 = (c0 + C) >>> 0;
    d0 = (d0 + D) >>> 0;
  }

  const out = new Uint8Array(16);
  const outView = new DataView(out.buffer);
  outView.setUint32(0, a0, true);
  outView.setUint32(4, b0, true);
  outView.setUint32(8, c0, true);
  outView.setUint32(12, d0, true);
  return Array.from(out)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function buildTtsUrl(cleanedText: string, lang = "vi-VN"): string {
  const isEn = lang.toLowerCase().startsWith("en");
  const voice = isEn ? "en-US-AnaNeural" : "vi-VN-HoaiMyNeural";
  const rate = isEn ? "-10%" : "-8%";
  const hash = md5Utf8(`${voice}|${rate}|${cleanedText}`);
  return `/tts-cache/${hash}.mp3`;
}

export function buildDynamicTtsApiUrl(cleanedText: string, lang = "vi-VN"): string {
  return `/api/tts?lang=${encodeURIComponent(lang)}&text=${encodeURIComponent(cleanedText)}`;
}

function setRamCachedUrl(ttsUrl: string, objectUrl: string) {
  if (ramAudioBlobCache.has(ttsUrl)) return;
  if (ramAudioBlobCache.size >= MAX_RAM_AUDIO_CACHE) {
    const oldestKey = ramAudioBlobCache.keys().next().value;
    if (oldestKey) {
      const oldObjUrl = ramAudioBlobCache.get(oldestKey);
      if (oldObjUrl && typeof URL !== "undefined" && URL.revokeObjectURL) {
        URL.revokeObjectURL(oldObjUrl);
      }
      ramAudioBlobCache.delete(oldestKey);
    }
  }
  ramAudioBlobCache.set(ttsUrl, objectUrl);
}

/**
 * Tải trước (Preload/Warm-up) file âm thanh vào RAM để khi bé bấm sẽ phát tức thì (0ms network delay).
 */
export function prefetchSpeech(text: string, lang = "vi-VN"): Promise<string | null> {
  if (typeof window === "undefined" || typeof fetch === "undefined") {
    return Promise.resolve(null);
  }
  const cleaned = cleanSpeechText(text);
  if (!cleaned) return Promise.resolve(null);

  const ttsUrl = buildTtsUrl(cleaned, lang);
  const cached = ramAudioBlobCache.get(ttsUrl);
  if (cached) return Promise.resolve(cached);

  const existing = inFlightAudioFetch.get(ttsUrl);
  if (existing) return existing;

  const req = fetch(ttsUrl)
    .then(async (res) => {
      const ct = res.headers.get("content-type") || "";
      if (res.ok && ct.includes("audio")) {
        const blob = await res.blob();
        if (blob.size >= 100) {
          const objUrl = URL.createObjectURL(blob);
          setRamCachedUrl(ttsUrl, objUrl);
          return objUrl;
        }
      }
      const fallbackRes = await fetch(buildDynamicTtsApiUrl(cleaned, lang));
      const fallbackCt = fallbackRes.headers.get("content-type") || "";
      if (!fallbackRes.ok || !fallbackCt.includes("audio")) return null;
      const blob = await fallbackRes.blob();
      if (blob.size < 100) return null;
      const objUrl = URL.createObjectURL(blob);
      setRamCachedUrl(ttsUrl, objUrl);
      return objUrl;
    })
    .catch(() => null)
    .finally(() => {
      inFlightAudioFetch.delete(ttsUrl);
    });

  inFlightAudioFetch.set(ttsUrl, req);
  return req;
}

/**
 * Hệ thống giọng đọc chuẩn Việt Nam (vi-VN-HoaiMyNeural) và Tiếng Anh trẻ em (en-US-AnaNeural)
 * thông qua Local Neural TTS Server (/api/tts) + Pre-cached MP3 + RAM Blob Cache.
 * Tối ưu hiệu năng: Mặc định tắt vòng lặp 60fps progressRatio ở các module không cần tô chữ Karaoke.
 */
export function useSpeech(soundEnabled: boolean, hookOptions?: UseSpeechOptions) {
  const trackProgress = Boolean(hookOptions?.trackProgress);
  const [speaking, setSpeakingState] = useState(false);
  const [progressRatio, setProgressRatio] = useState(0);
  const [message, setMessage] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastRatioRef = useRef(0);
  const seqTokenRef = useRef(0);
  const enabledRef = useRef(soundEnabled);
  enabledRef.current = soundEnabled;
  const trackProgressRef = useRef(trackProgress);
  trackProgressRef.current = trackProgress;

  const cancelRaf = useCallback(() => {
    if (rafRef.current !== null && typeof window !== "undefined") {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const setSpeaking = useCallback((val: boolean, text = "") => {
    setSpeakingState(val);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("nam:speech-state", { detail: { speaking: val, text } }),
      );
    }
  }, []);

  const stop = useCallback(() => {
    seqTokenRef.current += 1;
    cancelRaf();
    stopGentleMusicalBeat();
    if (audioRef.current) {
      audioRef.current.onplay = null;
      audioRef.current.ontimeupdate = null;
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (trackProgressRef.current && lastRatioRef.current !== 0) {
      lastRatioRef.current = 0;
      setProgressRatio(0);
    }
    setSpeaking(false);
  }, [cancelRaf, setSpeaking]);

  useEffect(() => {
    if (!soundEnabled) stop();
  }, [soundEnabled, stop]);

  useEffect(() => () => stop(), [stop]);

  const speak = useCallback(
    (text: string, lang = "vi-VN", options?: SpeakOptions) => {
      stop();
      const cleaned = cleanSpeechText(text);
      if (!cleaned) {
        options?.onEnd?.();
        return;
      }

      if (!enabledRef.current) {
        setMessage("Âm thanh đang tắt. Con bấm nút Loa ở góc trên để bật nhé!");
        options?.onEnd?.();
        return;
      }

      setMessage("");
      if (trackProgressRef.current) {
        lastRatioRef.current = 0;
        setProgressRatio(0);
      }
      setSpeaking(true, cleaned);

      const ttsUrl = buildTtsUrl(cleaned, lang);
      const cachedBlobUrl = ramAudioBlobCache.get(ttsUrl);
      const audio = new Audio(cachedBlobUrl || ttsUrl);
      audio.preload = "auto";
      if (options?.playbackRate) {
        audio.playbackRate = options.playbackRate;
      }
      audioRef.current = audio;

      // Nếu câu này chưa nằm trong RAM cache, tải ngầm vào RAM cho lần bấm sau phát 0ms
      if (!cachedBlobUrl) {
        void prefetchSpeech(cleaned, lang);
      }

      if (trackProgressRef.current) {
        const updateProgress = () => {
          if (audioRef.current !== audio) return;
          if (audio.duration && Number.isFinite(audio.duration) && audio.duration > 0) {
            const ratio = Math.min(1, Math.max(0, audio.currentTime / audio.duration));
            if (Math.abs(ratio - lastRatioRef.current) >= 0.015 || ratio >= 0.99) {
              lastRatioRef.current = ratio;
              setProgressRatio(ratio);
            }
          }
          if (!audio.paused && !audio.ended) {
            rafRef.current = window.requestAnimationFrame(updateProgress);
          }
        };

        audio.onplay = () => {
          if (audioRef.current === audio) {
            rafRef.current = window.requestAnimationFrame(updateProgress);
          }
        };

        audio.ontimeupdate = () => {
          if (
            audioRef.current === audio &&
            audio.duration &&
            Number.isFinite(audio.duration) &&
            audio.duration > 0
          ) {
            const ratio = Math.min(1, Math.max(0, audio.currentTime / audio.duration));
            if (Math.abs(ratio - lastRatioRef.current) >= 0.015) {
              lastRatioRef.current = ratio;
              setProgressRatio(ratio);
            }
          }
        };
      }

      audio.onended = () => {
        if (audioRef.current === audio) {
          cancelRaf();
          audioRef.current = null;
          if (trackProgressRef.current) {
            lastRatioRef.current = 1;
            setProgressRatio(1);
          }
          setSpeaking(false);
          options?.onEnd?.();
        }
      };

      let triedDynamicFallback = false;
      audio.onerror = () => {
        if (audioRef.current !== audio) return;
        if (!triedDynamicFallback && !cachedBlobUrl) {
          triedDynamicFallback = true;
          audio.src = buildDynamicTtsApiUrl(cleaned, lang);
          audio.play().catch(() => {
            if (audioRef.current === audio) {
              cancelRaf();
              setSpeaking(false);
              options?.onEnd?.();
            }
          });
          return;
        }
        cancelRaf();
        audioRef.current = null;
        setSpeaking(false);
        if ("speechSynthesis" in window) {
          const voices = window.speechSynthesis.getVoices();
          const prefix = lang.slice(0, 2).toLowerCase();
          const matchedVoice = voices.find((v) =>
            v.lang.toLowerCase().startsWith(prefix),
          );
          if (matchedVoice) {
            const utt = new SpeechSynthesisUtterance(cleaned);
            utt.voice = matchedVoice;
            utt.lang = matchedVoice.lang;
            utt.rate = 0.85;
            utt.onend = () => options?.onEnd?.();
            window.speechSynthesis.speak(utt);
            return;
          }
        }
        options?.onEnd?.();
      };

      audio.play().catch(() => {
        if (audioRef.current === audio) {
          cancelRaf();
          setSpeaking(false);
          options?.onEnd?.();
        }
      });
    },
    [cancelRaf, setSpeaking, stop],
  );

  // Ghép nối chuỗi mẫu âm thanh nhỏ (ví dụ: ["3", "cộng", "2", "bằng mấy nhỉ?"]) mượt mà không tốn file
  const speakSequence = useCallback(
    (parts: string[], lang = "vi-VN", playbackRate = 1.1) => {
      stop();
      const cleanParts = parts.map((p) => cleanSpeechText(p)).filter(Boolean);
      if (cleanParts.length === 0 || !enabledRef.current) return;

      const token = seqTokenRef.current;
      setSpeaking(true);

      // Tải trước toàn bộ các phần trong chuỗi song song
      for (const p of cleanParts) {
        void prefetchSpeech(p, lang);
      }

      let idx = 0;
      const playNext = () => {
        if (seqTokenRef.current !== token) return;
        if (idx >= cleanParts.length) {
          audioRef.current = null;
          setSpeaking(false);
          return;
        }
        const part = cleanParts[idx++];
        const ttsUrl = buildTtsUrl(part, lang);
        const cachedBlobUrl = ramAudioBlobCache.get(ttsUrl);
        const audio = new Audio(cachedBlobUrl || ttsUrl);
        audio.playbackRate = playbackRate;
        audioRef.current = audio;

        audio.onended = () => {
          if (seqTokenRef.current === token) {
            playNext();
          }
        };
        audio.onerror = () => {
          if (seqTokenRef.current === token) {
            playNext();
          }
        };
        audio.play().catch(() => {
          if (seqTokenRef.current === token) {
            setSpeaking(false);
          }
        });
      };

      playNext();
    },
    [setSpeaking, stop],
  );

  return {
    speak,
    speakSequence,
    prefetch: prefetchSpeech,
    stop,
    speaking,
    progressRatio,
    message,
    available: true,
  };
}
