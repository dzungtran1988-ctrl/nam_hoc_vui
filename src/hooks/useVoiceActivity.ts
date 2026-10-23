import { useEffect, useRef, useState } from "react";

interface VoiceDetectorProps {
  enabled: boolean;
  onSpeechDetected?: () => void;
  onSpeechEnd?: () => void;
  threshold?: number; // 0 to 1
  silenceDelayMs?: number;
}

export function useVoiceActivity({
  enabled,
  onSpeechDetected,
  onSpeechEnd,
  threshold = 0.15,
  silenceDelayMs = 1200,
}: VoiceDetectorProps) {
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(0);
  const [hasSpoken, setHasSpoken] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const silenceTimerRef = useRef<number | null>(null);
  const isSpeakingRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      cleanup();
      return;
    }

    async function initAudio() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        streamRef.current = stream;

        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.3;
        analyserRef.current = analyser;

        const source = ctx.createMediaStreamSource(stream);
        source.connect(analyser);
        microphoneRef.current = source;

        setIsListening(true);
        setError(null);
        analyzeVolume();
      } catch (err) {
        console.warn("Microphone access not available or denied:", err);
        setError("Không thể mở micro (bạn có thể bấm nút để học bình thường)");
        setIsListening(false);
      }
    }

    initAudio();

    return () => {
      cleanup();
    };
  }, [enabled, threshold, silenceDelayMs]);

  function cleanup() {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsListening(false);
    setVolume(0);
    isSpeakingRef.current = false;
  }

  function analyzeVolume() {
    const analyser = analyserRef.current;
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const average = sum / dataArray.length;
    const normalizedVolume = Math.min(1, average / 128); // 0 to 1

    setVolume(normalizedVolume);

    if (normalizedVolume > threshold) {
      if (!isSpeakingRef.current) {
        isSpeakingRef.current = true;
        setHasSpoken(true);
        onSpeechDetected?.();
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
    } else if (isSpeakingRef.current) {
      if (!silenceTimerRef.current) {
        silenceTimerRef.current = window.setTimeout(() => {
          isSpeakingRef.current = false;
          onSpeechEnd?.();
          silenceTimerRef.current = null;
        }, silenceDelayMs);
      }
    }

    animationFrameRef.current = requestAnimationFrame(analyzeVolume);
  }

  return {
    isListening,
    volume,
    hasSpoken,
    error,
    resetSpoken: () => setHasSpoken(false),
  };
}
