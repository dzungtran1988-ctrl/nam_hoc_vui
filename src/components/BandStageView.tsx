import { useEffect, useRef, useState } from "react";
import {
  Download,
  Mic,
  Music,
  Pause,
  Play,
  Sliders,
  Sparkles,
  Square,
  Star,
  Volume2,
  Wand2,
} from "lucide-react";
import {
  BAND_SONG_THEMES,
  VOCAL_INTRO_OFFSET_MS,
  VOCAL_OUTRO_TAIL_MS,
  analyzeAudioBufferToVoiceSamples,
  buildBandArrangementFromVoice,
  estimatePitchFromTimeDomain,
  getMasterStageBus,
  playDrumHit,
  playGoldenBellChime,
  playGuitarChordStrum,
  playVocalLeadNote,
  playWoodyXylophoneNote,
  processChildVocalStudioAI,
  quantizeToPentatonic,
  renderConcertToWavBlob,
  scheduleMyMelodyHumanEcho,
  type BandBackboneMode,
  type BandInstrumentId,
  type RecordedBandStep,
  type VoiceSamplePoint,
} from "../lib/bandStageSynth";

interface BandStageViewProps {
  soundEnabled: boolean;
  onBackToMenu: () => void;
  onComplete: (summaryText: string) => void;
  onReaction?: (
    type: "happy" | "sad" | "singing" | "idle",
    message: string,
  ) => void;
}

interface BandMemberDef {
  id: BandInstrumentId;
  charName: string;
  instrumentName: string;
  shortLabel: string;
  emoji: string;
  charImgSrc: string;
  instImgSrc: string;
  accentColor: string;
  glowColor: string;
  spotlightColor: string;
  cheerLine: string;
}

const BAND_MEMBERS: BandMemberDef[] = [
  {
    id: "drums",
    charName: "Cinnamoroll",
    instrumentName: "Trống Jazz 3D",
    shortLabel: "🥁 Trống Jazz",
    emoji: "🥁",
    charImgSrc: "/assets/band-stage/char-cinnamoroll-drums.png",
    instImgSrc: "/assets/band-stage/inst-drum-3d.png",
    accentColor: "#FF5252",
    glowColor: "rgba(255, 82, 82, 0.68)",
    spotlightColor: "rgba(255, 107, 107, 0.36)",
    cheerLine: "🥁 Bùm chát bùm! Cinnamoroll giữ nhịp trống Jazz cực bốc!",
  },
  {
    id: "xylophone",
    charName: "Kuromi",
    instrumentName: "Đàn Gỗ 7 Phím 3D",
    shortLabel: "🎶 Đàn Gỗ 7 Phím",
    emoji: "🎶",
    charImgSrc: "/assets/band-stage/char-kuromi-xylophone.png",
    instImgSrc: "/assets/band-stage/inst-xylophone-3d.png",
    accentColor: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.68)",
    spotlightColor: "rgba(56, 189, 248, 0.36)",
    cheerLine: "🎶 Kuromi lướt dùi gõ đàn gỗ cầu vồng Đồ Rê Mi Son!",
  },
  {
    id: "vocal",
    charName: "Ca Sĩ Nấm",
    instrumentName: "Micro Ngôi Sao 3D",
    shortLabel: "🎤 Hát Chính & Bè",
    emoji: "🎤",
    charImgSrc: "/assets/nam-stickers/nam-stage-star.png?v=3dclay",
    instImgSrc: "/assets/band-stage/inst-mic-3d.png",
    accentColor: "#FF477E",
    glowColor: "rgba(255, 71, 126, 0.78)",
    spotlightColor: "rgba(255, 193, 7, 0.45)",
    cheerLine: "🎤 Ca Sĩ Nấm đứng giữa sân khấu hát vang cùng ban nhạc Sanrio!",
  },
  {
    id: "guitar",
    charName: "Pochacco",
    instrumentName: "Đàn Guitar Bass 3D",
    shortLabel: "🎸 Guitar & Bass",
    emoji: "🎸",
    charImgSrc: "/assets/band-stage/char-pochacco-guitar.png",
    instImgSrc: "/assets/band-stage/inst-guitar-3d.png",
    accentColor: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.68)",
    spotlightColor: "rgba(192, 132, 252, 0.36)",
    cheerLine: "🎸 Pochacco quạt hợp âm Đàn Guitar & đi Bass cực ngầu!",
  },
  {
    id: "bells",
    charName: "Pompompurin",
    instrumentName: "Đàn Organ Điện Tử 3D",
    shortLabel: "🎹 Đàn Organ Điện Tử",
    emoji: "🎹",
    charImgSrc: "/assets/band-stage/char-pompompurin-organ.png",
    instImgSrc: "/assets/band-stage/inst-organ-3d.png",
    accentColor: "#FACC15",
    glowColor: "rgba(250, 204, 21, 0.72)",
    spotlightColor: "rgba(253, 224, 71, 0.38)",
    cheerLine: "🎹 Pompompurin đánh Đàn Organ Điện Tử đa âm như ban nhạc thật!",
  },
];

const STAGE_BULB_COLORS = [
  "#FF4757",
  "#FFA502",
  "#FFD32A",
  "#2ED573",
  "#1E90FF",
  "#5352ED",
  "#9B59B6",
];

const MAX_RECORD_SECONDS = 12;

export function BandStageView({
  soundEnabled,
  onComplete,
  onReaction,
}: BandStageViewProps) {
  const [activePerformers, setActivePerformers] = useState<BandInstrumentId[]>(
    [],
  );
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingAiVocal, setIsProcessingAiVocal] = useState(false);
  const [recordElapsedSec, setRecordElapsedSec] = useState(0);
  const [voiceMeterBars, setVoiceMeterBars] = useState<number[]>([
    18, 26, 20, 32, 24, 28, 18, 22,
  ]);
  const [detectedVocalNotes, setDetectedVocalNotes] = useState(0);

  // Chế độ Nhạc cụ đệm nhịp chủ đạo ("organ" = Nhịp 1-2 | "guitar" = Nhịp 1-2-3 | "xylophone" = Đàn Gỗ Nhịp 1-2)
  const [backboneMode, setBackboneMode] = useState<BandBackboneMode>("organ");

  const [recordedSteps, setRecordedSteps] = useState<RecordedBandStep[]>([]);
  const [recordedDurationMs, setRecordedDurationMs] = useState(0);
  const [hasVoiceAudio, setHasVoiceAudio] = useState(false);
  const [isPlayingShow, setIsPlayingShow] = useState(false);
  const [isExportingWav, setIsExportingWav] = useState(false);

  const [beatStep, setBeatStep] = useState(0);
  const [liveBannerText, setLiveBannerText] = useState<string>("");
  const [performanceCount, setPerformanceCount] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timersRef = useRef<number[]>([]);
  const riffVariantRef = useRef(0);

  // Refs cho hệ thống Thu Âm & AI Studio Vocal Mastering
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const recordedAudioUrlRef = useRef<string | null>(null);
  const recordedAudioElRef = useRef<HTMLAudioElement | null>(null);
  const echoAudioElRef = useRef<HTMLAudioElement | null>(null);

  // AudioBuffers đã qua xử lý làm đẹp giọng hát AI/DSP
  const polishedLeadBufferRef = useRef<AudioBuffer | null>(null);
  const myMelodyBackingBufferRef = useRef<AudioBuffer | null>(null);
  const vocalStartOffsetMsRef = useRef<number>(VOCAL_INTRO_OFFSET_MS);
  const vocalEndOffsetMsRef = useRef<number>(VOCAL_INTRO_OFFSET_MS + 3500);
  const detectedBeatMsRef = useRef<number>(500);

  const voiceSourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const harmonySourceNodesRef = useRef<AudioBufferSourceNode[]>([]);

  const recordStartMsRef = useRef<number>(0);
  const sampleIntervalRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);
  const voiceSamplesRef = useRef<VoiceSamplePoint[]>([]);
  const manualTapsRef = useRef<RecordedBandStep[]>([]);
  const mobileMicInputRef = useRef<HTMLInputElement | null>(null);

  function getBackboneInstrumentId(mode: BandBackboneMode): BandInstrumentId {
    if (mode === "organ") return "bells";
    if (mode === "guitar") return "guitar";
    return "xylophone";
  }

  function getBackboneBadgeLabel(mode: BandBackboneMode): string {
    if (mode === "organ") return "🎹 Organ: Nhịp 1-2";
    if (mode === "guitar") return "🎸 Guitar: Nhịp 1-2-3";
    return "🎶 Đàn Gỗ: Nhịp 1-2";
  }

  function clearScheduledTimers() {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  }

  function stopVoicePlaybackSource() {
    if (voiceSourceNodeRef.current) {
      try {
        voiceSourceNodeRef.current.stop();
        voiceSourceNodeRef.current.disconnect();
      } catch {
        // ignore
      }
      voiceSourceNodeRef.current = null;
    }
    if (harmonySourceNodesRef.current.length > 0) {
      for (const node of harmonySourceNodesRef.current) {
        try {
          node.stop();
          node.disconnect();
        } catch {
          // ignore
        }
      }
      harmonySourceNodesRef.current = [];
    }
    if (recordedAudioElRef.current) {
      recordedAudioElRef.current.pause();
      recordedAudioElRef.current.currentTime = 0;
    }
    if (echoAudioElRef.current) {
      echoAudioElRef.current.pause();
      echoAudioElRef.current.currentTime = 0;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  function cleanupRecordingLoops() {
    if (sampleIntervalRef.current) {
      window.clearInterval(sampleIntervalRef.current);
      sampleIntervalRef.current = null;
    }
    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
  }

  function ensureAudioContext(): AudioContext | null {
    if (typeof window === "undefined" || !window.AudioContext) {
      return null;
    }
    if (!audioCtxRef.current) {
      audioCtxRef.current = new window.AudioContext();
    }
    if (audioCtxRef.current.state === "suspended") {
      void audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }

  useEffect(() => {
    return () => {
      clearScheduledTimers();
      stopVoicePlaybackSource();
      cleanupRecordingLoops();
      if (recordedAudioUrlRef.current) {
        URL.revokeObjectURL(recordedAudioUrlRef.current);
      }
      if (audioCtxRef.current) {
        void audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  function speakMyMelodySoftHumanVoice(text: string) {
    if (
      !soundEnabled ||
      typeof window === "undefined" ||
      !("speechSynthesis" in window)
    ) {
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "vi-VN";
      utter.volume = 0.55;
      utter.rate = 0.78;
      utter.pitch = 1.32;
      window.speechSynthesis.speak(utter);
    } catch {
      // ignore
    }
  }

  function triggerStepInstruments(
    ctx: AudioContext | null,
    step: RecordedBandStep,
    volumeScale = 1,
  ) {
    if (!ctx || !soundEnabled) return;
    const sustain = step.sustainSec ?? 0.55;
    const role = step.beatRole ?? "full";
    if (step.drum) {
      const drumVol = step.instruments.includes("drums")
        ? volumeScale * 0.82
        : volumeScale * 0.68;
      playDrumHit(ctx, step.drum, drumVol);
    }
    if (step.xyloFreq && step.instruments.includes("xylophone")) {
      const xyloRole =
        step.section === "intro" || step.section === "outro" ? "full" : role;
      playWoodyXylophoneNote(
        ctx,
        step.xyloFreq,
        volumeScale * 0.92,
        undefined,
        xyloRole,
        step.chordFreqs,
      );
    }
    if (
      !hasVoiceAudio &&
      step.vocalFreq &&
      step.instruments.includes("vocal")
    ) {
      playVocalLeadNote(ctx, step.vocalFreq, volumeScale * 0.45);
    }
    if (step.chordFreqs && step.instruments.includes("guitar")) {
      playGuitarChordStrum(
        ctx,
        step.chordFreqs,
        volumeScale,
        undefined,
        sustain,
        role,
      );
    }
    if (step.bellFreq && step.instruments.includes("bells")) {
      playGoldenBellChime(
        ctx,
        step.bellFreq,
        volumeScale,
        step.chordFreqs,
        undefined,
        sustain,
        role,
      );
    }
  }

  function handleTapMember(member: BandMemberDef) {
    if (isProcessingAiVocal) return;

    if (isPlayingShow) {
      clearScheduledTimers();
      stopVoicePlaybackSource();
      setIsPlayingShow(false);
    }

    const ctx = soundEnabled ? ensureAudioContext() : null;
    const themeIndex = riffVariantRef.current % BAND_SONG_THEMES.length;
    riffVariantRef.current += 1;
    const theme = BAND_SONG_THEMES[themeIndex];

    if (isRecording) {
      const offsetMs =
        Math.max(0, Date.now() - recordStartMsRef.current) +
        VOCAL_INTRO_OFFSET_MS;
      const tapStep: RecordedBandStep = {
        offsetMs,
        instruments: [member.id],
        drum: member.id === "drums" ? "kick-hat" : undefined,
        xyloFreq: member.id === "xylophone" ? 392.0 : undefined,
        chordFreqs:
          member.id === "guitar" || member.id === "bells"
            ? [261.63, 329.63, 392.0]
            : undefined,
        bellFreq: member.id === "bells" ? 523.25 : undefined,
        noteLabel: `${member.emoji} ${member.charName}: ${member.shortLabel}`,
      };
      manualTapsRef.current.push(tapStep);
      triggerStepInstruments(ctx, tapStep, 1.05);
      setActivePerformers([member.id]);
      setLiveBannerText(
        `🔴 Đã thêm nhịp ${member.shortLabel} của ${member.charName} vào bản thu!`,
      );
      const tId = window.setTimeout(() => {
        setActivePerformers((prev) => prev.filter((id) => id !== member.id));
      }, 450);
      timersRef.current.push(tId);
      return;
    }

    clearScheduledTimers();
    stopVoicePlaybackSource();
    setActivePerformers([member.id]);

    if (member.id === "vocal") {
      if (ctx && myMelodyBackingBufferRef.current) {
        const masterBus = getMasterStageBus(ctx);
        const backSrc = ctx.createBufferSource();
        backSrc.buffer = myMelodyBackingBufferRef.current;
        const backGain = ctx.createGain();
        backGain.gain.value = 1.25;
        backSrc.connect(backGain);
        backGain.connect(masterBus);
        backSrc.start(0);
        harmonySourceNodesRef.current = [backSrc];

        setLiveBannerText(
          "🎤🌟 Ca Sĩ Nấm đang hát vang giữa sân khấu cùng tiếng bè ngân dài!",
        );
        onReaction?.(
          "singing",
          "🎤 Lắng nghe kìa! Ca Sĩ Nấm đang biểu diễn câu hát cực hay ở chính giữa sân khấu!",
        );
        const durMs = Math.min(
          5500,
          Math.round(myMelodyBackingBufferRef.current.duration * 1000) + 400,
        );
        const endTimer = window.setTimeout(() => {
          stopVoicePlaybackSource();
          setActivePerformers([]);
          setBeatStep(0);
          setPerformanceCount((prev) => prev + 1);
        }, durMs);
        timersRef.current.push(endTimer);
        return;
      }

      speakMyMelodySoftHumanVoice(
        "Là lá la... la là la... Ca Sĩ Nấm đứng giữa sân khấu hát thật hay nè!",
      );
    }

    setLiveBannerText(`${member.cheerLine} (${theme.icon} ${theme.title})`);
    onReaction?.("singing", member.cheerLine);

    const riffSteps = theme.riffs[member.id] ?? [];

    let maxDelay = 0;
    riffSteps.forEach((step, idx) => {
      maxDelay = Math.max(maxDelay, step.delayMs + step.durationMs);
      const tId = window.setTimeout(() => {
        setBeatStep(idx + 1);
        setActivePerformers([member.id]);
        if (step.lyricChip) {
          setLiveBannerText(
            `${member.emoji} ${member.charName}: "${step.lyricChip}"`,
          );
        }
        triggerStepInstruments(
          ctx,
          {
            offsetMs: step.delayMs,
            instruments: [member.id],
            drum: step.drumType,
            xyloFreq: member.id === "xylophone" ? step.freq : undefined,
            vocalFreq: member.id === "vocal" ? step.freq : undefined,
            chordFreqs: step.chordFreqs,
            bellFreq: member.id === "bells" ? step.freq : undefined,
            noteLabel: step.lyricChip ?? member.shortLabel,
          },
          member.id === "vocal" ? 0.35 : 1.15,
        );
      }, step.delayMs);
      timersRef.current.push(tId);
    });

    const endTimer = window.setTimeout(() => {
      setActivePerformers([]);
      setBeatStep(0);
      setPerformanceCount((prev) => prev + 1);
    }, maxDelay + 450);
    timersRef.current.push(endTimer);
  }

  function handleToggleBackbone() {
    if (isProcessingAiVocal) return;
    const nextMode: BandBackboneMode =
      backboneMode === "organ"
        ? "guitar"
        : backboneMode === "guitar"
          ? "xylophone"
          : "organ";
    setBackboneMode(nextMode);

    if (recordedSteps.length > 0 && recordedDurationMs > 0) {
      const nextArrangement = buildBandArrangementFromVoice(
        voiceSamplesRef.current,
        manualTapsRef.current,
        recordedDurationMs,
        nextMode,
        detectedBeatMsRef.current,
        vocalStartOffsetMsRef.current,
        vocalEndOffsetMsRef.current,
      );
      setRecordedSteps(nextArrangement);
      playRecordedConcert(
        nextArrangement,
        recordedDurationMs,
        hasVoiceAudio,
        nextMode,
      );
    } else {
      setLiveBannerText(
        nextMode === "organ"
          ? "🎹 Đã chọn Đàn Organ Điện Tử (Pompompurin) đệm Nhịp 1 - 2 (Bùm - Chát)!"
          : nextMode === "guitar"
            ? "🎸 Đã chọn Đàn Guitar (Pochacco) đệm Nhịp 1 - 2 - 3 (Bùm - Chát - Chát)!"
            : "🎶 Đã chọn Đàn Gỗ Xylophone (Kuromi) gõ đệm Nhịp 1 - 2 (Đồ - Son)!",
      );
    }
  }

  async function handleDownloadMix() {
    if (recordedSteps.length === 0 || isExportingWav || isProcessingAiVocal) {
      return;
    }
    setIsExportingWav(true);
    setLiveBannerText(
      "💾 Đang kết xuất bài hát ngắn (.WAV): 5s Intro + Giọng Nấm & Bè My Melody + 3s Outro...",
    );

    try {
      const wavBlob = await renderConcertToWavBlob(
        polishedLeadBufferRef.current,
        recordedSteps,
        recordedDurationMs,
        myMelodyBackingBufferRef.current,
        vocalStartOffsetMsRef.current,
      );
      const downloadUrl = URL.createObjectURL(wavBlob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `be-nam-ai-studio-${backboneMode}.wav`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 4000);

      setLiveBannerText(
        "✅ Đã tải xong bài hát hoàn chỉnh (.WAV) gồm 5s Intro + Giọng Nấm trong trẻo + 3s Outro!",
      );
      onReaction?.(
        "happy",
        "🎉 Đã tải bài hát hoàn chỉnh có cả Intro và Outro của Ca sĩ Nấm về máy thành công rồi nhé!",
      );
    } catch {
      if (recordedAudioUrlRef.current) {
        const a = document.createElement("a");
        a.href = recordedAudioUrlRef.current;
        a.download = "be-nam-thu-am.webm";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } finally {
      setIsExportingWav(false);
    }
  }

  function handleClaimStarReward() {
    clearScheduledTimers();
    stopVoicePlaybackSource();
    cleanupRecordingLoops();
    setIsPlayingShow(false);
    setActivePerformers([]);
    onComplete(
      "Bé Nấm đã hoàn thành bản thu âm AI Studio cùng My Melody hát bè ngân vang và Ban Nhạc 3D!",
    );
  }

  async function handleStartRecording() {
    if (isProcessingAiVocal) return;
    clearScheduledTimers();
    stopVoicePlaybackSource();
    setIsPlayingShow(false);
    setActivePerformers([]);

    const ctx = ensureAudioContext();
    voiceSamplesRef.current = [];
    manualTapsRef.current = [];
    recordedChunksRef.current = [];
    polishedLeadBufferRef.current = null;
    myMelodyBackingBufferRef.current = null;
    setDetectedVocalNotes(0);
    setRecordElapsedSec(0);

    const activeBackboneId = getBackboneInstrumentId(backboneMode);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("getUserMedia not available");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: true,
        },
      });
      mediaStreamRef.current = stream;

      if (ctx) {
        const micSource = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 2048;
        micSource.connect(analyser);
        const timeBuf = new Float32Array(analyser.fftSize);

        sampleIntervalRef.current = window.setInterval(() => {
          analyser.getFloatTimeDomainData(timeBuf);
          const { rms, freqHz } = estimatePitchFromTimeDomain(
            timeBuf,
            ctx.sampleRate,
          );
          const offsetMs = Math.max(0, Date.now() - recordStartMsRef.current);
          voiceSamplesRef.current.push({ offsetMs, rms, freqHz });

          const boost = Math.min(100, Math.round(rms * 850));
          setVoiceMeterBars([
            Math.max(16, Math.min(100, boost * 0.75 + 18)),
            Math.max(20, Math.min(100, boost * 1.05 + 22)),
            Math.max(18, Math.min(100, boost * 0.9 + 16)),
            Math.max(24, Math.min(100, boost * 1.2 + 24)),
            Math.max(20, Math.min(100, boost * 1.1 + 20)),
            Math.max(18, Math.min(100, boost * 0.85 + 18)),
            Math.max(16, Math.min(100, boost * 0.95 + 16)),
            Math.max(18, Math.min(100, boost * 0.7 + 18)),
          ]);

          if (rms > 0.016) {
            const pNote = quantizeToPentatonic(freqHz);
            setDetectedVocalNotes((prev) => prev + 1);
            setActivePerformers(["vocal", activeBackboneId]);
            setLiveBannerText(
              `🎙️ Nấm đang hát ("${pNote.label}") — Thu xong AI sẽ ghép 5s Intro, đệm ${getBackboneBadgeLabel(backboneMode)} & 3s Outro!`,
            );
          } else {
            setActivePerformers([activeBackboneId]);
          }
        }, 90);
      }

      if (typeof MediaRecorder !== "undefined") {
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (ev) => {
          if (ev.data && ev.data.size > 0) {
            recordedChunksRef.current.push(ev.data);
          }
        };

        recorder.onstop = () => {
          void finalizeRecordingFromChunks();
        };

        recorder.start(150);
      }

      recordStartMsRef.current = Date.now();
      setIsRecording(true);
      setLiveBannerText(
        "🔴 Đang thu âm! Bé Nấm cứ tự nhiên hát nhé — Thu xong AI sẽ tạo bài hát ngắn có 5s Intro mở màn & 3s Outro kết bài!",
      );
      onReaction?.(
        "singing",
        "🎙️ Đang thu âm! Bé Nấm hát lên nào, lát nữa AI Phòng Thu sẽ ghép 5 giây dạo đầu Intro và 3 giây kết bài Outro thật trọn vẹn nhé!",
      );

      countdownIntervalRef.current = window.setInterval(() => {
        const elapsed = Math.floor(
          (Date.now() - recordStartMsRef.current) / 1000,
        );
        setRecordElapsedSec(elapsed);
        if (elapsed >= MAX_RECORD_SECONDS) {
          handleStopRecording();
        }
      }, 250);
    } catch {
      if (mobileMicInputRef.current) {
        mobileMicInputRef.current.click();
      } else {
        startTapOnlyRecordingFallback();
      }
    }
  }

  function startTapOnlyRecordingFallback() {
    recordStartMsRef.current = Date.now();
    setIsRecording(true);
    setLiveBannerText(
      "🔴 Đang ghi bản nhạc! Hãy chạm vào các nhạc cụ hoặc hát nhịp để ban nhạc ghép giai điệu nhé!",
    );
    countdownIntervalRef.current = window.setInterval(() => {
      const elapsed = Math.floor(
        (Date.now() - recordStartMsRef.current) / 1000,
      );
      setRecordElapsedSec(elapsed);
      if (elapsed >= MAX_RECORD_SECONDS) {
        handleStopRecording();
      }
    }, 250);
  }

  function handleStopRecording() {
    cleanupRecordingLoops();
    setIsRecording(false);
    setActivePerformers([]);

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      try {
        mediaRecorderRef.current.stop();
        return;
      } catch {
        // fallback below
      }
    }

    void finalizeRecordingFromChunks();
  }

  /**
   * Bước xử lý AI Studio Vocal Mastering:
   * Lọc tạp âm nền -> Cắt khoảng trống thừa -> Tạo 5s Intro dạo đầu ->
   * Căn giọng bé vào đúng Nhịp 1 -> Tạo 3.2s Outro vĩ thanh kết bài!
   */
  async function finalizeRecordingFromChunks() {
    const rawDurationMs = Math.max(
      2600,
      Math.min(MAX_RECORD_SECONDS * 1000, Date.now() - recordStartMsRef.current),
    );
    const ctx = ensureAudioContext();
    let finalDurationMs =
      VOCAL_INTRO_OFFSET_MS + rawDurationMs + VOCAL_OUTRO_TAIL_MS;
    let voiceAvailable = false;

    setIsProcessingAiVocal(true);
    setActivePerformers(["vocal", getBackboneInstrumentId(backboneMode)]);
    setLiveBannerText(
      "✨ AI Phòng Thu đang làm trong giọng Nấm, dựng 5s Intro dạo đầu, căn Nhịp 1-2 & 3s Outro kết bài...",
    );
    onReaction?.(
      "singing",
      "✨ Đợi một xíu nhé! AI Phòng Thu đang dựng thành một bài hát ngắn hoàn chỉnh có 5 giây dạo đầu và 3 giây kết bài cho Nấm!",
    );

    const startProcessTime = Date.now();
    vocalStartOffsetMsRef.current = VOCAL_INTRO_OFFSET_MS;
    vocalEndOffsetMsRef.current = VOCAL_INTRO_OFFSET_MS + rawDurationMs;

    if (recordedChunksRef.current.length > 0) {
      const blob = new Blob(recordedChunksRef.current, {
        type: recordedChunksRef.current[0]?.type || "audio/webm",
      });

      if (recordedAudioUrlRef.current) {
        URL.revokeObjectURL(recordedAudioUrlRef.current);
      }
      const url = URL.createObjectURL(blob);
      recordedAudioUrlRef.current = url;
      recordedAudioElRef.current = new Audio(url);
      recordedAudioElRef.current.preload = "auto";
      echoAudioElRef.current = new Audio(url);
      echoAudioElRef.current.preload = "auto";
      voiceAvailable = true;

      if (ctx) {
        try {
          const arrayBuf = await blob.arrayBuffer();
          const decoded = await ctx.decodeAudioData(arrayBuf.slice(0));
          const aiVocal = await processChildVocalStudioAI(decoded);

          polishedLeadBufferRef.current = aiVocal.leadVocalBuffer;
          myMelodyBackingBufferRef.current = aiVocal.myMelodyBackingBuffer;
          voiceSamplesRef.current = aiVocal.trimmedVoiceSamples;
          finalDurationMs = aiVocal.totalSongDurationMs;
          vocalStartOffsetMsRef.current = aiVocal.vocalStartOffsetMs;
          vocalEndOffsetMsRef.current = aiVocal.vocalEndOffsetMs;
          detectedBeatMsRef.current = aiVocal.detectedBeatMs;
        } catch {
          vocalStartOffsetMsRef.current = VOCAL_INTRO_OFFSET_MS;
          vocalEndOffsetMsRef.current = VOCAL_INTRO_OFFSET_MS + rawDurationMs;
          detectedBeatMsRef.current = 500;
        }
      }
    }

    const arrangement = buildBandArrangementFromVoice(
      voiceSamplesRef.current,
      manualTapsRef.current,
      finalDurationMs,
      backboneMode,
      detectedBeatMsRef.current,
      vocalStartOffsetMsRef.current,
      vocalEndOffsetMsRef.current,
    );

    const elapsedProcess = Date.now() - startProcessTime;
    if (elapsedProcess < 1100) {
      await new Promise((r) => window.setTimeout(r, 1100 - elapsedProcess));
    }

    setIsProcessingAiVocal(false);
    setRecordedSteps(arrangement);
    setRecordedDurationMs(finalDurationMs);
    setHasVoiceAudio(voiceAvailable);

    playRecordedConcert(
      arrangement,
      finalDurationMs,
      voiceAvailable,
      backboneMode,
    );
  }

  async function handleMobileMicFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      startTapOnlyRecordingFallback();
      return;
    }

    setIsProcessingAiVocal(true);
    setLiveBannerText(
      "✨ AI Phòng Thu đang dựng bài hát ngắn: 5s Intro + Giọng Nấm + 3s Outro...",
    );

    const ctx = ensureAudioContext();
    if (recordedAudioUrlRef.current) {
      URL.revokeObjectURL(recordedAudioUrlRef.current);
    }
    const url = URL.createObjectURL(file);
    recordedAudioUrlRef.current = url;
    recordedAudioElRef.current = new Audio(url);
    recordedAudioElRef.current.preload = "auto";
    echoAudioElRef.current = new Audio(url);
    echoAudioElRef.current.preload = "auto";

    let durationMs = 11500;
    let samples: VoiceSamplePoint[] = [];

    if (ctx) {
      try {
        const arrayBuf = await file.arrayBuffer();
        const decoded = await ctx.decodeAudioData(arrayBuf.slice(0));
        const aiVocal = await processChildVocalStudioAI(decoded);

        polishedLeadBufferRef.current = aiVocal.leadVocalBuffer;
        myMelodyBackingBufferRef.current = aiVocal.myMelodyBackingBuffer;
        samples = aiVocal.trimmedVoiceSamples;
        durationMs = aiVocal.totalSongDurationMs;
        vocalStartOffsetMsRef.current = aiVocal.vocalStartOffsetMs;
        vocalEndOffsetMsRef.current = aiVocal.vocalEndOffsetMs;
        detectedBeatMsRef.current = aiVocal.detectedBeatMs;
      } catch {
        samples = [];
        vocalStartOffsetMsRef.current = VOCAL_INTRO_OFFSET_MS;
        vocalEndOffsetMsRef.current = VOCAL_INTRO_OFFSET_MS + 3500;
        detectedBeatMsRef.current = 500;
      }
    }

    const arrangement = buildBandArrangementFromVoice(
      samples,
      [],
      durationMs,
      backboneMode,
      detectedBeatMsRef.current,
      vocalStartOffsetMsRef.current,
      vocalEndOffsetMsRef.current,
    );
    voiceSamplesRef.current = samples;
    setIsProcessingAiVocal(false);
    setRecordedSteps(arrangement);
    setRecordedDurationMs(durationMs);
    setHasVoiceAudio(true);

    playRecordedConcert(arrangement, durationMs, true, backboneMode);
  }

  function playRecordedConcert(
    stepsToPlay = recordedSteps,
    durationMs = recordedDurationMs,
    voiceReady = hasVoiceAudio,
    activeBackbone = backboneMode,
  ) {
    if (stepsToPlay.length === 0) return;

    clearScheduledTimers();
    stopVoicePlaybackSource();

    if (isRecording) {
      cleanupRecordingLoops();
      setIsRecording(false);
    }

    const ctx = soundEnabled ? ensureAudioContext() : null;
    setIsPlayingShow(true);
    setLiveBannerText(
      activeBackbone === "organ"
        ? "🎵 Đang dạo nhạc Intro (5s): Organ Nhịp 1-2 & Đàn Gỗ mở màn chuẩn bị đón giọng Nấm!"
        : activeBackbone === "guitar"
          ? "🎵 Đang dạo nhạc Intro (5s): Guitar Nhịp 1-2-3 & Đàn Gỗ mở màn chuẩn bị đón giọng Nấm!"
          : "🎵 Đang dạo nhạc Intro (5s): Đàn Gỗ Nhịp 1-2 mở màn chuẩn bị đón giọng Nấm!",
    );
    onReaction?.(
      "singing",
      "🌟 Lắng nghe 5 giây dạo đầu Intro trong trẻo kìa, rồi giọng Nấm sẽ bước vào đúng Nhịp 1 và khép lại bằng 3 giây Outro!",
    );

    const shouldPlayVoice = soundEnabled && voiceReady;
    const vocalOffsetMs = vocalStartOffsetMsRef.current;

    if (shouldPlayVoice) {
      if (ctx && polishedLeadBufferRef.current) {
        try {
          const masterBus = getMasterStageBus(ctx);
          const startAtSec = ctx.currentTime + Math.max(0, vocalOffsetMs / 1000);

          // Kênh A: Giọng chính của Bé Nấm (Gain chuẩn 1.25 trong vắt, không bao giờ rè/vỡ)
          const leadSrc = ctx.createBufferSource();
          leadSrc.buffer = polishedLeadBufferRef.current;
          const leadGain = ctx.createGain();
          leadGain.gain.value = 1.25;

          leadSrc.connect(leadGain);
          leadGain.connect(masterBus);
          leadSrc.start(startAtSec);
          voiceSourceNodeRef.current = leadSrc;

          // Kênh B: Kênh Giọng Hát Bè My Melody (Ngân dịu êm 0.85 phía sau giọng Nấm)
          if (myMelodyBackingBufferRef.current) {
            const backSrc = ctx.createBufferSource();
            backSrc.buffer = myMelodyBackingBufferRef.current;
            const backGain = ctx.createGain();
            backGain.gain.value = 0.85;

            backSrc.connect(backGain);
            backGain.connect(masterBus);
            backSrc.start(startAtSec);
            harmonySourceNodesRef.current = [backSrc];
          } else {
            const echoNodes = scheduleMyMelodyHumanEcho(
              ctx,
              polishedLeadBufferRef.current,
              masterBus,
              startAtSec,
            );
            harmonySourceNodesRef.current = echoNodes;
          }
        } catch {
          const fallbackTimer = window.setTimeout(() => {
            if (recordedAudioElRef.current) {
              recordedAudioElRef.current.currentTime = 0;
              recordedAudioElRef.current.volume = 0.9;
              void recordedAudioElRef.current.play().catch(() => {});
            }
          }, vocalOffsetMs);
          timersRef.current.push(fallbackTimer);
        }
      } else if (recordedAudioElRef.current) {
        const fallbackTimer = window.setTimeout(() => {
          if (recordedAudioElRef.current) {
            recordedAudioElRef.current.currentTime = 0;
            recordedAudioElRef.current.volume = 0.9;
            void recordedAudioElRef.current.play().catch(() => {});
          }
        }, vocalOffsetMs);
        timersRef.current.push(fallbackTimer);

        if (echoAudioElRef.current) {
          const echoTimer = window.setTimeout(() => {
            if (echoAudioElRef.current) {
              echoAudioElRef.current.currentTime = 0;
              echoAudioElRef.current.volume = 0.32;
              void echoAudioElRef.current.play().catch(() => {});
            }
          }, vocalOffsetMs + 340);
          timersRef.current.push(echoTimer);
        }
      }
    }

    // 2. Lên lịch phát các bước Intro (5s, vol=0.92) -> Đệm nhịp thân bài (vol=0.64) -> Outro (3s, vol=0.92)
    stepsToPlay.forEach((step, idx) => {
      const tId = window.setTimeout(() => {
        setBeatStep((idx % 8) + 1);
        setActivePerformers(step.instruments);
        setLiveBannerText(step.noteLabel);
        const stepVol =
          !shouldPlayVoice ||
          step.section === "intro" ||
          step.section === "outro"
            ? 0.92
            : 0.64;
        triggerStepInstruments(ctx, step, stepVol);
      }, step.offsetMs);
      timersRef.current.push(tId);
    });

    const totalMs = Math.max(
      durationMs + 700,
      (stepsToPlay[stepsToPlay.length - 1]?.offsetMs ?? 2000) + 1200,
    );

    const endId = window.setTimeout(() => {
      stopVoicePlaybackSource();
      setIsPlayingShow(false);
      setActivePerformers([]);
      setBeatStep(0);
      setPerformanceCount((prev) => prev + 1);
      setLiveBannerText(
        "🎉 Đã phát xong! Bấm nút Nhịp để đổi điệu (Organ 1-2 / Guitar 1-2-3 / Đàn Gỗ 1-2), ▶ Nghe Lại, 💾 Tải Nhạc hoặc ⭐ Tặng Sao nhé!",
      );
      onReaction?.(
        "happy",
        "Hoan hô Ca sĩ Nấm! Nhạc cụ đã đệm nhịp cực chuẩn với giọng hát của Nấm!",
      );
    }, totalMs + 300);
    timersRef.current.push(endId);
  }

  function handleStopPlayback() {
    clearScheduledTimers();
    stopVoicePlaybackSource();
    setIsPlayingShow(false);
    setActivePerformers([]);
    setBeatStep(0);
    setLiveBannerText(
      "Đã tạm dừng phát. Bấm ▶ Nghe Lại, đổi Nhịp đệm, 💾 Tải Nhạc hoặc ⭐ Tặng Sao bất cứ lúc nào nhé!",
    );
  }

  const hasRecordingReady =
    recordedSteps.length > 0 && !isRecording && !isProcessingAiVocal;

  return (
    <div className="band-stage-wrapper">
      <input
        ref={mobileMicInputRef}
        type="file"
        accept="audio/*"
        capture="user"
        style={{ display: "none" }}
        onChange={(e) => void handleMobileMicFileChange(e)}
      />

      {/* Thanh Topbar Gọn Gàng: Trạng Thái Thu Âm / AI Mastering + Cụm Nút Phòng Thu */}
      <div className="band-stage-topbar">
        <div className="band-studio-status">
          {isRecording ? (
            <div className="band-recording-live-pill">
              <span className="rec-red-dot" />
              <strong>
                Đang thu ({MAX_RECORD_SECONDS - recordElapsedSec}s)
              </strong>
              <div className="band-voice-meter" aria-hidden="true">
                {voiceMeterBars.map((h, i) => (
                  <span
                    key={i}
                    className="voice-meter-bar"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              {detectedVocalNotes > 0 && (
                <span className="rec-note-counter">
                  +{detectedVocalNotes} câu hát
                </span>
              )}
            </div>
          ) : isProcessingAiVocal ? (
            <div className="band-playing-live-pill">
              <Wand2 size={15} />
              <strong>
                ✨ AI Phòng Thu đang làm đẹp giọng Nấm & căn nhịp đệm...
              </strong>
            </div>
          ) : isPlayingShow ? (
            <div className="band-playing-live-pill">
              <Volume2 size={15} />
              <strong>
                Đang phát (Giọng Nấm + Bè My Melody +{" "}
                {getBackboneBadgeLabel(backboneMode)})
              </strong>
            </div>
          ) : hasRecordingReady ? (
            <div className="band-ready-live-pill">
              <Music size={14} />
              <span>
                Đã xử lý AI Studio ({getBackboneBadgeLabel(backboneMode)} + Bè
                My Melody)!
              </span>
            </div>
          ) : (
            <span className="band-hint-badge">
              ✨ Chạm nhạc cụ thử tiếng, hoặc bấm 🎙️ Thu Âm Bé Hát để AI làm
              đẹp giọng & đệm nhịp!
            </span>
          )}
        </div>

        <div className="band-topbar-right">
          {!isRecording && !isProcessingAiVocal && (
            <button
              type="button"
              className="band-vibe-switch-btn"
              onClick={handleToggleBackbone}
              title="Đổi nhạc cụ & điệu đệm nhịp xuyên suốt: Organ (Nhịp 1-2) / Guitar (Nhịp 1-2-3) / Đàn Gỗ (Nhịp 1-2)"
            >
              <Sliders size={14} />
              <span>{getBackboneBadgeLabel(backboneMode)}</span>
            </button>
          )}

          {!isRecording ? (
            <button
              type="button"
              className="band-record-voice-btn"
              onClick={() => void handleStartRecording()}
              disabled={isProcessingAiVocal}
            >
              <Mic size={15} />
              <span>{hasRecordingReady ? "Thu Mới" : "🎙️ Thu Âm Bé Hát"}</span>
            </button>
          ) : (
            <button
              type="button"
              className="band-record-voice-btn is-recording"
              onClick={handleStopRecording}
            >
              <Square size={14} fill="#FFFFFF" />
              <span>Dừng & Xử Lý AI</span>
            </button>
          )}

          {hasRecordingReady && (
            <>
              <button
                type="button"
                className={`band-ensemble-top-btn ${isPlayingShow ? "playing" : ""}`}
                onClick={() =>
                  isPlayingShow ? handleStopPlayback() : playRecordedConcert()
                }
              >
                {isPlayingShow ? <Pause size={15} /> : <Play size={15} />}
                <span>{isPlayingShow ? "Dừng" : "Nghe Lại"}</span>
              </button>

              <button
                type="button"
                className="band-download-mix-btn"
                onClick={() => void handleDownloadMix()}
                disabled={isExportingWav}
                title="Tải file nhạc .WAV gồm giọng hát Nấm đã làm đẹp AI, giọng ngân My Melody và ban nhạc"
              >
                <Download size={15} />
                <span>{isExportingWav ? "Đang xuất..." : "Tải Nhạc"}</span>
              </button>
            </>
          )}

          {(hasRecordingReady || performanceCount > 0) &&
            !isRecording &&
            !isProcessingAiVocal && (
              <button
                type="button"
                className="band-claim-star-btn"
                onClick={handleClaimStarReward}
                title="Hoàn thành và nhận Sao thưởng!"
              >
                <Star size={15} fill="#FFF" />
                <span>Tặng Sao</span>
              </button>
            )}
        </div>
      </div>

      {/* KHUNG SÂN KHẤU LED 3D CHÍNH */}
      <div className="band-stage-arena">
        <div className="band-ceiling-lights" aria-hidden="true">
          {STAGE_BULB_COLORS.map((color, idx) => {
            const isLit =
              isRecording ||
              isProcessingAiVocal ||
              isPlayingShow ||
              (activePerformers.length > 0 && (beatStep + idx) % 2 === 0);
            return (
              <span
                key={color}
                className={`band-ceiling-bulb ${isLit ? "lit" : ""}`}
                style={{ "--bulb-color": color } as React.CSSProperties}
              />
            );
          })}
        </div>

        {liveBannerText && (
          <div className="band-floating-lyric-banner" aria-live="polite">
            <Sparkles size={15} />
            <span>{liveBannerText}</span>
          </div>
        )}

        <div className="band-performers-grid">
          {BAND_MEMBERS.map((member) => {
            const isPerforming = activePerformers.includes(member.id);
            const isDimmed =
              activePerformers.length > 0 && !isPerforming && !isRecording;
            const isBackboneMember =
              member.id === getBackboneInstrumentId(backboneMode);

            return (
              <div
                key={member.id}
                role="button"
                tabIndex={0}
                className={`band-performer-pod ${member.id === "vocal" ? "is-vocal-lead" : ""} ${isPerforming ? `is-performing action-${member.id}` : ""} ${isDimmed ? "is-dimmed" : ""}`}
                style={
                  {
                    "--pod-accent": member.accentColor,
                    "--pod-glow": member.glowColor,
                    "--pod-spotlight": member.spotlightColor,
                  } as React.CSSProperties
                }
                onClick={() => handleTapMember(member)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleTapMember(member);
                  }
                }}
                aria-label={`Chạm vào ${member.charName} chơi ${member.instrumentName}`}
              >
                <div className="band-spotlight-cone" aria-hidden="true" />

                {isPerforming && (
                  <div className="band-floating-notes" aria-hidden="true">
                    <span className="f-note n1">🎵</span>
                    <span className="f-note n2">🎶</span>
                    <span className="f-note n3">{member.emoji}</span>
                  </div>
                )}

                <div className="band-char-figure-wrap">
                  <img
                    src={member.charImgSrc}
                    alt={member.charName}
                    className="band-char-img"
                    draggable={false}
                  />
                </div>

                <div className="band-instrument-3d-dock">
                  <div className="band-inst-pedestal-ring" aria-hidden="true" />
                  {member.id !== "vocal" && (
                    <img
                      src={member.instImgSrc}
                      alt={member.instrumentName}
                      className={`band-inst-3d-img inst-3d-${member.id}`}
                      draggable={false}
                    />
                  )}
                </div>

                <div className="band-pod-footer">
                  <span className="band-pod-inst-label">
                    {member.shortLabel}
                  </span>
                  <span className="band-pod-char-name">
                    {isPerforming
                      ? "✨ Đang hòa âm!"
                      : isBackboneMember
                        ? `${member.charName} • Giữ nhịp chính`
                        : member.charName}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
