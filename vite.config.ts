import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const PARENT_DIR = path.resolve(process.cwd(), "..");
const VIDEO_NAM_DIR = path.join(PARENT_DIR, "Video nấm");
const KARAOKE_DIR = path.join(PARENT_DIR, "Karaoke");
const ENGLISH_VIDEO_DIR = path.join(PARENT_DIR, "Nhạc tiếng anh");

function parseLrcToStructuredLines(lrcText: string, duration = 240) {
  const rawLines: { time: number; text: string }[] = [];
  for (const rawLine of lrcText.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    const regex = /\[(\d{2}):(\d{2}(?:\.\d{1,3})?)\]/g;
    const textPart = line.replace(regex, "").trim();
    let match: RegExpExecArray | null;
    while ((match = regex.exec(line)) !== null) {
      const mins = parseInt(match[1], 10);
      const secs = parseFloat(match[2]);
      const t = Math.round((mins * 60 + secs) * 100) / 100;
      if (textPart) {
        rawLines.push({ time: t, text: textPart });
      }
    }
  }
  rawLines.sort((a, b) => a.time - b.time);

  return rawLines.map((item, idx) => {
    const startT = item.time;
    const nextT = idx + 1 < rawLines.length ? rawLines[idx + 1].time : duration;
    const gap = nextT - startT;
    const singDur = Math.min(Math.max(gap - 0.12, 1.2), 5.6);
    const endT = Math.round((startT + singDur) * 100) / 100;
    const wordsRaw = item.text.split(/\s+/).filter(Boolean);
    const weights = wordsRaw.map((w) => Math.max(w.replace(/[,.!?]/g, "").length, 2));
    const totalW = weights.reduce((a, b) => a + b, 0) || 1;
    let curT = startT;
    const words = wordsRaw.map((w, wIdx) => {
      const wDur = singDur * (weights[wIdx] / totalW);
      const wEnd = Math.round((curT + wDur) * 100) / 100;
      const wordItem = {
        word: w,
        start: Math.round(curT * 100) / 100,
        end: wEnd,
      };
      curT = wEnd;
      return wordItem;
    });
    return {
      id: idx,
      startTime: startT,
      endTime: endT,
      nextLineTime: nextT,
      text: item.text,
      words,
    };
  });
}

function collectKaraokeSongs() {
  const songs: any[] = [];
  if (!fs.existsSync(KARAOKE_DIR)) return songs;

  const preferredOrder = [
    "Những Ngày Trời Bao La.mp3",
    "SUNNY SUNNY.mp3",
    "TIẾNG RU CỘI NGUỒN.mp3",
    "ÁNH SÁNG CỦA ĐỜI TÔI.mp3",
    "LET ME GO - THƠM (Da LAB), VƯƠNG ANH TÚ, HOÀNG ROB, HOÀNG DŨNG, CHENG - ATVNCG 2026.mp3",
    "EM TÔI.mp3",
    "NHONG NHONG NHONG.mp3",
    "CƠM NHÀ.mp3",
    "NHỎ XÍU NHỎ XIU.mp3",
  ];
  const rawFiles = fs.readdirSync(KARAOKE_DIR);
  const files = [
    ...preferredOrder.filter((f) => rawFiles.includes(f)),
    ...rawFiles.filter((f) => !preferredOrder.includes(f)),
  ];
  for (const f of files) {
    if (!/\.(mp3|wav|m4a|ogg)$/i.test(f)) continue;
    const fullPath = path.join(KARAOKE_DIR, f);
    const stat = fs.statSync(fullPath);
    if (!stat.isFile()) continue;

    const baseName = f.replace(/\.(mp3|wav|m4a|ogg)$/i, "");
    const jsonPath = path.join(KARAOKE_DIR, `${baseName}.json`);
    const lrcPath = path.join(KARAOKE_DIR, `${baseName}.lrc`);
    const txtPath = path.join(KARAOKE_DIR, `${baseName}.txt`);
    const thumbPath = path.join(KARAOKE_DIR, ".thumbs", `${f}.jpg`);
    const hasThumb = fs.existsSync(thumbPath);

    let songData: any = null;
    if (fs.existsSync(jsonPath)) {
      try {
        songData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
      } catch {
        songData = null;
      }
    }

    if (songData && Array.isArray(songData.lines)) {
      songs.push({
        id: songData.id || `karaoke-${baseName}`,
        filename: f,
        title: songData.title || baseName,
        artist: songData.artist || "Nhạc Thiếu Nhi & Gia Đình",
        duration: songData.duration || 240,
        audioUrl: `/api/karaoke-stream?file=${encodeURIComponent(f)}`,
        thumbUrl: hasThumb
          ? `/api/karaoke-thumb?file=${encodeURIComponent(f)}`
          : undefined,
        ...(songData.highlightMode
          ? { highlightMode: songData.highlightMode }
          : {}),
        lines: songData.lines,
      });
      continue;
    }

    let lines: any[] = [];
    if (fs.existsSync(lrcPath)) {
      try {
        const lrcText = fs.readFileSync(lrcPath, "utf-8");
        lines = parseLrcToStructuredLines(lrcText, 240);
      } catch {
        lines = [];
      }
    } else if (fs.existsSync(txtPath)) {
      try {
        const txtLines = fs
          .readFileSync(txtPath, "utf-8")
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter(Boolean);
        lines = txtLines.map((text, idx) => {
          const startT = 5 + idx * 5;
          const endT = startT + 4.5;
          const wordsRaw = text.split(/\s+/).filter(Boolean);
          const step = 4.5 / Math.max(wordsRaw.length, 1);
          return {
            id: idx,
            startTime: startT,
            endTime: endT,
            nextLineTime: startT + 5,
            text,
            words: wordsRaw.map((w, wIdx) => ({
              word: w,
              start: Math.round((startT + wIdx * step) * 100) / 100,
              end: Math.round((startT + (wIdx + 1) * step) * 100) / 100,
            })),
          };
        });
      } catch {
        lines = [];
      }
    }

    songs.push({
      id: `karaoke-${baseName}`,
      filename: f,
      title: baseName,
      artist: "Bé Nấm Karaoke",
      duration: 240,
      audioUrl: `/api/karaoke-stream?file=${encodeURIComponent(f)}`,
      thumbUrl: hasThumb
        ? `/api/karaoke-thumb?file=${encodeURIComponent(f)}`
        : undefined,
      lines,
    });
  }

  return songs;
}

const FRIENDLY_NAMES: Record<string, string> = {
  "1792141607159_1576451583292740914_1112878653444464291.mp4": "🐠 Nấm & Kitty Lặn Ngắm Đại Dương",
  "1792141636423_1576451583292740914_1112878653444464291.mp4": "🚌 Chuyến Xe Buýt Ca Nhạc Của Nấm",
  "1792141665482_1576451583292740914_1112878653444464291.mp4": "🎀 Nấm Dắt Tay Kitty Dạo Phố",
  "1792141688802_1576451583292740914_1112878653444464291.mp4": "🚍 Bác Tài Xế Nấm Chở Các Bạn Đi Học",
  "Be_Nam_Capybara_Final.mp4": "🐹 Bé Nấm & Bạn Capybara",
  "Clip_Bé_Nấm_Magic_World_MV.mp4": "✨ Thế Giới Phép Thuật Của Nấm (MV)",
  "Clip_Bé_Nấm_Magic_World_MV_nhac_trong_clips_SYNC.mp4": "🎵 Thế Giới Phép Thuật (Bản Nhạc Sync)",
  "Cuoc_Phieu_Luu_Vuong_Quoc_Bang_Tuyet_Final.mp4": "❄️ Phiêu Lưu Vương Quốc Băng Tuyết",
  "Untitled_Scene_10-09_14_11_08_20261009211426.mp4": "🎬 Hoạt Hình Ngắn Của Nấm",
  "wofoo_5clips_full_song.mp4": "🐺 Sói Wolfoo & Bài Hát Vui Nhộn",
  "chúc mừng chiến thắng.mp4": "🏆 Chúc Mừng Chiến Thắng Của Nấm",
  "gemini_generated_video_215eab65.mp4": "🎀 Lớp Học Vui Của Nấm (Tập 1)",
  "gemini_generated_video_ef753ca5.mp4": "🐰 Nấm & Các Bạn Đến Lớp (Tập 2)",
};

function formatVideoTitle(filename: string): string {
  if (FRIENDLY_NAMES[filename]) return FRIENDLY_NAMES[filename];
  return (
    "🎬 " +
    filename
      .replace(/\.(mp4|webm|mov)$/i, "")
      .replace(/[_-]+/g, " ")
      .trim()
  );
}

function collectLocalVideos() {
  const thumbDir = path.join(VIDEO_NAM_DIR, ".thumbs");
  let metaMap: Record<string, { duration?: string }> = {};
  const metaPath = path.join(thumbDir, "meta.json");
  if (fs.existsSync(metaPath)) {
    try {
      metaMap = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    } catch {
      metaMap = {};
    }
  }

  const list: {
    id: string;
    filename: string;
    title: string;
    sourceDir: "video-nam" | "root";
    sizeMB: number;
    duration: string;
    thumbUrl: string;
  }[] = [];

  if (fs.existsSync(VIDEO_NAM_DIR)) {
    const files = fs.readdirSync(VIDEO_NAM_DIR);
    for (const f of files) {
      if (/\.(mp4|webm|mov)$/i.test(f)) {
        const full = path.join(VIDEO_NAM_DIR, f);
        const stat = fs.statSync(full);
        if (stat.isFile()) {
          list.push({
            id: `vn:${f}`,
            filename: f,
            title: formatVideoTitle(f),
            sourceDir: "video-nam",
            sizeMB: Math.round((stat.size / (1024 * 1024)) * 10) / 10,
            duration: metaMap[f]?.duration || "0:45",
            thumbUrl: `/api/local-video-thumb?file=${encodeURIComponent(f)}`,
          });
        }
      }
    }
  }

  if (fs.existsSync(PARENT_DIR)) {
    const rootFiles = fs.readdirSync(PARENT_DIR);
    for (const f of rootFiles) {
      if (/\.(mp4|webm|mov)$/i.test(f)) {
        const full = path.join(PARENT_DIR, f);
        const stat = fs.statSync(full);
        if (stat.isFile()) {
          list.push({
            id: `root:${f}`,
            filename: f,
            title: formatVideoTitle(f),
            sourceDir: "root",
            sizeMB: Math.round((stat.size / (1024 * 1024)) * 10) / 10,
            duration: metaMap[f]?.duration || "0:45",
            thumbUrl: `/api/local-video-thumb?file=${encodeURIComponent(f)}`,
          });
        }
      }
    }
  }

  return list;
}

const ENGLISH_VIDEO_FRIENDLY_NAMES: Record<string, string> = {
  "01 - Bài hát Monsters Vui Nhộn.mp4": "🦊 01 · I See Your Monsters (Tình bạn)",
  "02 - Bài hát I Love You Mommy.mp4": "🐰 02 · I Love You Mommy (Gia đình)",
  "03 - Bài hát Đếm Ngón Tay Xinh.mp4": "🖐️ 03 · Ten Little Fingers (Đếm 1–10)",
  "04 - Bài hát Tiếng Anh Vui Nhộn (Tập 1).mp4": "🏃 04 · What Can You Do? (6 Động từ)",
  "05 - Bài hát Lemon Tree (Cây Chanh).mp4": "🍋 05 · Yellow Lemon Tree (Màu sắc)",
  "06 - Bài hát Tiếng Anh Vui Nhộn (Tập 2).mp4": "🪥 06 · Brush Your Teeth (Thói quen tốt)",
  "07 - Bài hát Tiếng Anh Vui Nhộn (Tập 3).mp4": "🐺 07 · Truyện: Open The Door! (Sói & Dê)",
  "08 - Kể chuyện Tiếng Anh Hay Cho Bé.mp4": "🐑 08 · Truyện: Do You Like Carrots? (Sói & Cừu)",
  "09 - Bài hát Sunny Sunny Vui Nhộn.mp3": "☀️ 09 · Sunny, Sunny (Vui chơi ngoài trời)",
};

function collectEnglishVideos() {
  if (!fs.existsSync(ENGLISH_VIDEO_DIR)) {
    try {
      fs.mkdirSync(ENGLISH_VIDEO_DIR, { recursive: true });
    } catch {
      // ignore
    }
  }

  const list: {
    id: string;
    filename: string;
    title: string;
    sizeMB: number;
    mediaType: "video" | "audio";
    streamUrl: string;
  }[] = [];

  if (fs.existsSync(ENGLISH_VIDEO_DIR)) {
    const files = fs.readdirSync(ENGLISH_VIDEO_DIR);
    for (const f of files) {
      if (/\.(mp4|webm|mov|mp3|wav|m4a)$/i.test(f)) {
        const full = path.join(ENGLISH_VIDEO_DIR, f);
        const stat = fs.statSync(full);
        if (stat.isFile()) {
          const isAudio = /\.(mp3|wav|m4a)$/i.test(f);
          list.push({
            id: `eng:${f}`,
            filename: f,
            title:
              ENGLISH_VIDEO_FRIENDLY_NAMES[f] ||
              (isAudio ? "🎵 " : "🎬 ") +
                f
                  .replace(/\.(mp4|webm|mov|mp3|wav|m4a)$/i, "")
                  .replace(/[_-]+/g, " ")
                  .trim(),
            sizeMB: Math.round((stat.size / (1024 * 1024)) * 10) / 10,
            mediaType: isAudio ? "audio" : "video",
            streamUrl: `/api/english-video-stream?file=${encodeURIComponent(f)}`,
          });
        }
      }
    }
  }

  return list;
}

function localMediaAndTtsPlugin() {
  return {
    name: "local-media-and-tts",
    configureServer(server: any) {
      // 0A. API danh sách clip/nhạc Tiếng Anh từ D:\Nấm học\Nhạc tiếng anh
      server.middlewares.use("/api/english-videos", (_req: any, res: any) => {
        try {
          const clips = collectEnglishVideos();
          res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
          res.end(
            JSON.stringify({
              clips,
              folderPath: ENGLISH_VIDEO_DIR,
            }),
          );
        } catch (err) {
          res.statusCode = 500;
          res.end(
            JSON.stringify({
              clips: [],
              folderPath: ENGLISH_VIDEO_DIR,
              error: String(err),
            }),
          );
        }
      });

      // 0B. API stream clip/nhạc Tiếng Anh hỗ trợ HTTP Range (206 Partial Content)
      server.middlewares.use("/api/english-video-stream", (req: any, res: any) => {
        try {
          const url = new URL(req.url || "", "http://localhost");
          const filename = path.basename(url.searchParams.get("file") || "");
          if (!filename) {
            res.statusCode = 400;
            res.end("Missing file parameter");
            return;
          }

          const filePath = path.join(ENGLISH_VIDEO_DIR, filename);
          if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
            res.statusCode = 404;
            res.end("English clip not found");
            return;
          }

          const stat = fs.statSync(filePath);
          const fileSize = stat.size;
          const range = req.headers.range;
          const contentType = /\.mp3$/i.test(filename)
            ? "audio/mpeg"
            : /\.wav$/i.test(filename)
              ? "audio/wav"
              : /\.webm$/i.test(filename)
                ? "video/webm"
                : "video/mp4";

          if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = end - start + 1;

            res.writeHead(206, {
              "Content-Range": `bytes ${start}-${end}/${fileSize}`,
              "Accept-Ranges": "bytes",
              "Content-Length": chunkSize,
              "Content-Type": contentType,
            });
            fs.createReadStream(filePath, { start, end }).pipe(res);
          } else {
            res.writeHead(200, {
              "Content-Length": fileSize,
              "Content-Type": contentType,
              "Accept-Ranges": "bytes",
            });
            fs.createReadStream(filePath).pipe(res);
          }
        } catch (err) {
          console.error("English video stream error:", err);
          res.statusCode = 500;
          res.end("English video stream error");
        }
      });

      // 0C. API tải trực tiếp clip Facebook Reel / YouTube / TikTok vào D:\Nấm học\Nhạc tiếng anh
      server.middlewares.use("/api/download-english-video", (req: any, res: any) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ ok: false, error: "Method Not Allowed" }));
          return;
        }

        let body = "";
        req.on("data", (chunk: any) => {
          body += String(chunk);
        });
        req.on("end", () => {
          try {
            const parsed = JSON.parse(body || "{}");
            const rawUrl = String(parsed.url || "").trim();
            const rawTitle = String(parsed.customTitle || "").trim();

            if (!/^https?:\/\//i.test(rawUrl)) {
              res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
              res.end(
                JSON.stringify({
                  ok: false,
                  error: "Link không hợp lệ (cần bắt đầu bằng http:// hoặc https://)",
                }),
              );
              return;
            }

            if (!fs.existsSync(ENGLISH_VIDEO_DIR)) {
              fs.mkdirSync(ENGLISH_VIDEO_DIR, { recursive: true });
            }

            const ytDlpBin = path.join(process.cwd(), "tools", "yt-dlp.exe");
            const exePath = fs.existsSync(ytDlpBin) ? ytDlpBin : "yt-dlp";

            const safeCustomTitle = rawTitle
              .replace(/[<>:"/\\|?*\x00-\x1F]/g, " ")
              .replace(/\s+/g, " ")
              .trim();

            const existingCount = collectEnglishVideos().length + 1;
            const prefix = String(existingCount).padStart(2, "0");
            const outputTemplate = safeCustomTitle
              ? path.join(ENGLISH_VIDEO_DIR, `${prefix} - ${safeCustomTitle}.%(ext)s`)
              : path.join(ENGLISH_VIDEO_DIR, `${prefix} - Clip Tiếng Anh [%(id)s].%(ext)s`);

            const args = [
              "--no-playlist",
              "--windows-filenames",
              "-f",
              "best[ext=mp4]/best",
              "-o",
              outputTemplate,
              rawUrl,
            ];

            const child = spawn(exePath, args, { windowsHide: true });
            let stderrText = "";
            let stdoutText = "";

            child.stdout.on("data", (d) => {
              stdoutText += String(d);
            });
            child.stderr.on("data", (d) => {
              stderrText += String(d);
            });

            child.on("error", (err) => {
              res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
              res.end(
                JSON.stringify({
                  ok: false,
                  error: `Không gọi được công cụ tải video: ${err.message}`,
                }),
              );
            });

            child.on("close", (code) => {
              if (code === 0) {
                const clips = collectEnglishVideos();
                res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
                res.end(
                  JSON.stringify({
                    ok: true,
                    clips,
                    folderPath: ENGLISH_VIDEO_DIR,
                  }),
                );
              } else {
                res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
                res.end(
                  JSON.stringify({
                    ok: false,
                    error:
                      stderrText.trim() ||
                      stdoutText.trim() ||
                      `Tải thất bại (mã lỗi ${code})`,
                  }),
                );
              }
            });
          } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
            res.end(
              JSON.stringify({
                ok: false,
                error: String(err),
              }),
            );
          }
        });
      });

      // 1. API danh sách video trực tiếp từ ổ D:\Nấm học\Video nấm (0MB copy vào dự án)
      server.middlewares.use("/api/local-videos", (_req: any, res: any) => {
        try {
          const videos = collectLocalVideos();
          res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
          res.end(JSON.stringify({ videos }));
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ videos: [], error: String(err) }));
        }
      });

      // 1B. API lấy ảnh thu nhỏ (Thumbnail JPG) của từng tập phim từ D:\Nấm học\Video nấm\.thumbs
      server.middlewares.use("/api/local-video-thumb", (req: any, res: any) => {
        try {
          const url = new URL(req.url || "", "http://localhost");
          const file = path.basename(url.searchParams.get("file") || "");
          const thumbPath = path.join(VIDEO_NAM_DIR, ".thumbs", `${file}.jpg`);
          if (file && fs.existsSync(thumbPath)) {
            const stat = fs.statSync(thumbPath);
            res.writeHead(200, {
              "Content-Type": "image/jpeg",
              "Content-Length": stat.size,
              "Cache-Control": "public, max-age=86400",
            });
            fs.createReadStream(thumbPath).pipe(res);
          } else {
            res.statusCode = 404;
            res.end("Thumb not found");
          }
        } catch {
          res.statusCode = 500;
          res.end("Thumb error");
        }
      });

      // 2. API stream video trực tiếp từ ổ cứng hỗ trợ HTTP Range (206 Partial Content) siêu nhẹ RAM
      server.middlewares.use("/api/local-video-stream", (req: any, res: any) => {
        try {
          const url = new URL(req.url || "", "http://localhost");
          const id = url.searchParams.get("id") || "";
          const [dirTag, ...rest] = id.split(":");
          const filename = path.basename(rest.join(":"));
          if (!filename) {
            res.statusCode = 400;
            res.end("Missing video id");
            return;
          }

          const baseDir = dirTag === "root" ? PARENT_DIR : VIDEO_NAM_DIR;
          const filePath = path.join(baseDir, filename);

          if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
            res.statusCode = 404;
            res.end("Video not found");
            return;
          }

          const stat = fs.statSync(filePath);
          const fileSize = stat.size;
          const range = req.headers.range;

          if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = end - start + 1;

            res.writeHead(206, {
              "Content-Range": `bytes ${start}-${end}/${fileSize}`,
              "Accept-Ranges": "bytes",
              "Content-Length": chunkSize,
              "Content-Type": "video/mp4",
            });
            fs.createReadStream(filePath, { start, end }).pipe(res);
          } else {
            res.writeHead(200, {
              "Content-Length": fileSize,
              "Content-Type": "video/mp4",
              "Accept-Ranges": "bytes",
            });
            fs.createReadStream(filePath).pipe(res);
          }
        } catch (err) {
          console.error("Video stream error:", err);
          res.statusCode = 500;
          res.end("Video stream error");
        }
      });

      // 2B. API danh sách bài hát Karaoke trực tiếp từ D:\Nấm học\Karaoke
      server.middlewares.use("/api/karaoke-songs", (_req: any, res: any) => {
        try {
          const songs = collectKaraokeSongs();
          res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
          res.end(JSON.stringify({ songs }));
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ songs: [], error: String(err) }));
        }
      });

      // 2C. API ảnh bìa bài hát Karaoke từ D:\Nấm học\Karaoke\.thumbs
      server.middlewares.use("/api/karaoke-thumb", (req: any, res: any) => {
        try {
          const url = new URL(req.url || "", "http://localhost");
          const file = path.basename(url.searchParams.get("file") || "");
          const thumbPath = path.join(KARAOKE_DIR, ".thumbs", `${file}.jpg`);
          if (file && fs.existsSync(thumbPath)) {
            const stat = fs.statSync(thumbPath);
            res.writeHead(200, {
              "Content-Type": "image/jpeg",
              "Content-Length": stat.size,
              "Cache-Control": "public, max-age=86400",
            });
            fs.createReadStream(thumbPath).pipe(res);
          } else {
            res.statusCode = 404;
            res.end("Karaoke thumb not found");
          }
        } catch {
          res.statusCode = 500;
          res.end("Karaoke thumb error");
        }
      });

      // 2D. API stream nhạc MP3 Karaoke trực tiếp từ D:\Nấm học\Karaoke hỗ trợ HTTP Range (206)
      server.middlewares.use("/api/karaoke-stream", (req: any, res: any) => {
        try {
          const url = new URL(req.url || "", "http://localhost");
          const filename = path.basename(url.searchParams.get("file") || "");
          if (!filename) {
            res.statusCode = 400;
            res.end("Missing audio file");
            return;
          }

          const filePath = path.join(KARAOKE_DIR, filename);
          if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
            res.statusCode = 404;
            res.end("Audio file not found");
            return;
          }

          const stat = fs.statSync(filePath);
          const fileSize = stat.size;
          const range = req.headers.range;

          if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = end - start + 1;

            res.writeHead(206, {
              "Content-Range": `bytes ${start}-${end}/${fileSize}`,
              "Accept-Ranges": "bytes",
              "Content-Length": chunkSize,
              "Content-Type": "audio/mpeg",
            });
            fs.createReadStream(filePath, { start, end }).pipe(res);
          } else {
            res.writeHead(200, {
              "Content-Length": fileSize,
              "Content-Type": "audio/mpeg",
              "Accept-Ranges": "bytes",
            });
            fs.createReadStream(filePath).pipe(res);
          }
        } catch (err) {
          console.error("Karaoke stream error:", err);
          res.statusCode = 500;
          res.end("Karaoke stream error");
        }
      });

      // 3. API Giọng đọc tiếng Việt & tiếng Anh chuẩn (Persistent Python Daemon + In-Flight Deduplication)
      const inFlightTts = new Map<string, Promise<void>>();
      const edgePythonCandidates = [
        "C:\\Users\\Admin\\AppData\\Roaming\\uv\\tools\\edge-tts\\Scripts\\python.exe",
        path.join(process.env.APPDATA || "", "uv", "tools", "edge-tts", "Scripts", "python.exe"),
      ];
      const edgePythonPath = edgePythonCandidates.find((p) => p && fs.existsSync(p));

      let ttsWorkerProc: ReturnType<typeof spawn> | null = null;
      let ttsReqSeq = 0;
      const pendingWorkerTasks = new Map<
        number,
        { resolve: () => void; reject: (err: Error) => void }
      >();

      const ensureTtsWorker = () => {
        if (ttsWorkerProc && !ttsWorkerProc.killed) return ttsWorkerProc;
        if (!edgePythonPath) return null;

        const pyScript = [
          "import sys, os, json, asyncio, edge_tts",
          "sys.stdin.reconfigure(encoding='utf-8')",
          "sys.stdout.reconfigure(encoding='utf-8')",
          "async def handle(req, loop):",
          "    rid = req.get('id')",
          "    out_path = req['out']",
          "    tmp_path = out_path + '.tmp'",
          "    try:",
          "        comm = edge_tts.Communicate(req['text'], req['voice'], rate=req['rate'])",
          "        await comm.save(tmp_path)",
          "        if os.path.exists(tmp_path) and os.path.getsize(tmp_path) >= 200:",
          "            os.replace(tmp_path, out_path)",
          "            print(json.dumps({'id': rid, 'ok': True}), flush=True)",
          "        else:",
          "            if os.path.exists(tmp_path): os.remove(tmp_path)",
          "            print(json.dumps({'id': rid, 'ok': False, 'err': 'Empty audio output'}), flush=True)",
          "    except Exception as e:",
          "        try:",
          "            if os.path.exists(tmp_path): os.remove(tmp_path)",
          "        except Exception:",
          "            pass",
          "        print(json.dumps({'id': rid, 'ok': False, 'err': str(e)}), flush=True)",
          "async def main():",
          "    loop = asyncio.get_running_loop()",
          "    while True:",
          "        line = await loop.run_in_executor(None, sys.stdin.readline)",
          "        if not line:",
          "            break",
          "        line = line.strip()",
          "        if not line:",
          "            continue",
          "        req = json.parse(line) if hasattr(json, 'parse') else json.loads(line)",
          "        asyncio.create_task(handle(req, loop))",
          "asyncio.run(main())",
        ].join("\n");

        const proc = spawn(edgePythonPath, ["-u", "-c", pyScript], {
          stdio: ["pipe", "pipe", "ignore"],
          env: { ...process.env, PYTHONIOENCODING: "utf-8" },
        });

        let stdoutBuf = "";
        proc.stdout?.on("data", (chunk: Buffer) => {
          stdoutBuf += chunk.toString("utf-8");
          const lines = stdoutBuf.split(/\r?\n/);
          stdoutBuf = lines.pop() || "";
          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const msg = JSON.parse(line);
              const task = pendingWorkerTasks.get(msg.id);
              if (task) {
                pendingWorkerTasks.delete(msg.id);
                if (msg.ok) task.resolve();
                else task.reject(new Error(msg.err || "TTS worker error"));
              }
            } catch {
              // ignore malformed line
            }
          }
        });

        proc.on("close", () => {
          ttsWorkerProc = null;
          for (const [, task] of pendingWorkerTasks) {
            task.reject(new Error("TTS worker closed"));
          }
          pendingWorkerTasks.clear();
        });

        ttsWorkerProc = proc;
        return proc;
      };

      // Tự động dọn các file .mp3 rỗng (<200 bytes) hoặc .tmp bị kẹt trong public/tts-cache khi khởi động
      const startupCacheDir = path.resolve(process.cwd(), "public", "tts-cache");
      if (fs.existsSync(startupCacheDir)) {
        try {
          for (const f of fs.readdirSync(startupCacheDir)) {
            const fp = path.join(startupCacheDir, f);
            try {
              const st = fs.statSync(fp);
              if (st.isFile() && (f.endsWith(".tmp") || st.size < 200)) {
                fs.unlinkSync(fp);
              }
            } catch {
              // ignore
            }
          }
        } catch {
          // ignore
        }
      }

      // Khởi động sẵn worker ngay khi bật server để câu nói đầu tiên không mất thời gian import Python
      ensureTtsWorker();

      const synthesizeTtsFile = (
        voice: string,
        rate: string,
        text: string,
        filePath: string,
      ): Promise<void> => {
        const existing = inFlightTts.get(filePath);
        if (existing) return existing;

        const job = (async () => {
          const tl = voice.toLowerCase().startsWith("en") ? "en" : "vi";
          try {
            const gUrl =
              `https://translate.google.com/translate_tts?ie=UTF-8&tl=${tl}&client=tw-ob&q=` +
              encodeURIComponent(text.slice(0, 190));
            const gRes = await fetch(gUrl, {
              headers: {
                "User-Agent": "Mozilla/5.0",
                Referer: "https://translate.google.com/",
              },
            });
            if (gRes.ok) {
              const arrBuf = await gRes.arrayBuffer();
              const buf = Buffer.from(arrBuf);
              if (buf.length >= 200) {
                fs.writeFileSync(filePath, buf);
                return;
              }
            }
          } catch {
            // fallback to edge-tts worker below
          }

          const worker = ensureTtsWorker();
          if (worker && worker.stdin && !worker.killed) {
            try {
              await new Promise<void>((resolve, reject) => {
                const id = ++ttsReqSeq;
                pendingWorkerTasks.set(id, { resolve, reject });
                worker.stdin!.write(
                  JSON.stringify({ id, voice, rate, text, out: filePath }) + "\n",
                );
              });
              if (fs.existsSync(filePath) && fs.statSync(filePath).size >= 200) {
                return;
              }
            } catch {
              // Fallback xuống spawn trực tiếp nếu worker gặp sự cố
            }
          }

          const tmpPath = `${filePath}.tmp`;
          const uvPath = "C:\\Users\\Admin\\.local\\bin\\uv.exe";
          await new Promise<void>((resolve, reject) => {
            const proc = spawn(uvPath, [
              "run",
              "--python",
              "3.11",
              "--with",
              "edge-tts",
              "edge-tts",
              "--voice",
              voice,
              `--rate=${rate}`,
              "--text",
              text,
              "--write-media",
              tmpPath,
            ]);
            proc.on("close", (code) => {
              if (code === 0 && fs.existsSync(tmpPath) && fs.statSync(tmpPath).size >= 200) {
                fs.renameSync(tmpPath, filePath);
                resolve();
              } else {
                try {
                  if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
                } catch {
                  // ignore
                }
                reject(new Error(`edge-tts exited with ${code}`));
              }
            });
            proc.on("error", reject);
          });
        })().finally(() => {
          inFlightTts.delete(filePath);
        });

        inFlightTts.set(filePath, job);
        return job;
      };

      server.middlewares.use("/api/tts", async (req: any, res: any) => {
        try {
          const url = new URL(req.url || "", "http://localhost");
          const text = (url.searchParams.get("text") || "").trim();
          const lang = (url.searchParams.get("lang") || "vi-VN").trim();

          if (!text) {
            res.statusCode = 400;
            res.end("Missing text");
            return;
          }

          const lowerLang = lang.toLowerCase();
          const isEn = lowerLang.startsWith("en");
          const isNorth = lowerLang.includes("north");
          const voice = isEn
            ? "en-US-AnaNeural"
            : isNorth
              ? "vi-VN-North-Female"
              : "vi-VN-HoaiMyNeural";
          const rate = isEn ? "-10%" : isNorth ? "0%" : "-8%";

          const cacheDir = path.resolve(process.cwd(), "public", "tts-cache");
          if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
          }

          const hash = crypto
            .createHash("md5")
            .update(`${voice}|${rate}|${text}`)
            .digest("hex");
          const filePath = path.join(cacheDir, `${hash}.mp3`);

          if (!fs.existsSync(filePath) || fs.statSync(filePath).size < 100) {
            await synthesizeTtsFile(voice, rate, text, filePath);
          }

          const stat = fs.statSync(filePath);
          res.writeHead(200, {
            "Content-Type": "audio/mpeg",
            "Content-Length": stat.size,
            "Cache-Control": "public, max-age=31536000, immutable",
          });
          fs.createReadStream(filePath).pipe(res);
        } catch (err) {
          console.error("TTS Error:", err);
          res.statusCode = 500;
          res.end("TTS generation error");
        }
      });

      // 4. Phục vụ trực tiếp Game 3D "Cinnamoroll Island Race" tại /island-race/ và /assets/(islands|tiles|vehicles|props|toys|characters)
      const ISLAND_RACE_DIST = path.join(PARENT_DIR, "cinnamoroll-island-race", "dist");
      const ISLAND_RACE_PUBLIC = path.join(PARENT_DIR, "cinnamoroll-island-race", "public");

      const getMimeType = (fp: string): string => {
        if (/\.html$/i.test(fp)) return "text/html; charset=utf-8";
        if (/\.js$/i.test(fp)) return "application/javascript; charset=utf-8";
        if (/\.css$/i.test(fp)) return "text/css; charset=utf-8";
        if (/\.png$/i.test(fp)) return "image/png";
        if (/\.webp$/i.test(fp)) return "image/webp";
        if (/\.svg$/i.test(fp)) return "image/svg+xml";
        if (/\.json$/i.test(fp)) return "application/json; charset=utf-8";
        return "application/octet-stream";
      };

      server.middlewares.use((req: any, res: any, next: any) => {
        try {
          const urlObj = new URL(req.url || "/", "http://localhost");
          const pathname = decodeURIComponent(urlObj.pathname);

          if (pathname === "/island-race" || pathname.startsWith("/island-race/")) {
            let relPath = pathname.replace(/^\/island-race\/?/, "");
            if (!relPath || relPath === "/") relPath = "index.html";
            const candidateDist = path.join(ISLAND_RACE_DIST, relPath);
            const candidatePub = path.join(ISLAND_RACE_PUBLIC, relPath);
            const targetFile =
              fs.existsSync(candidateDist) && fs.statSync(candidateDist).isFile()
                ? candidateDist
                : fs.existsSync(candidatePub) && fs.statSync(candidatePub).isFile()
                  ? candidatePub
                  : null;

            if (targetFile) {
              const st = fs.statSync(targetFile);
              res.writeHead(200, {
                "Content-Type": getMimeType(targetFile),
                "Content-Length": st.size,
              });
              fs.createReadStream(targetFile).pipe(res);
              return;
            }
          }

          if (
            /^\/assets\/(islands|tiles|vehicles|props|toys|characters|nav)\//i.test(pathname)
          ) {
            const localMainPublic = path.join(process.cwd(), "public", pathname);
            if (!fs.existsSync(localMainPublic)) {
              const islandAssetFile = path.join(ISLAND_RACE_PUBLIC, pathname);
              if (fs.existsSync(islandAssetFile) && fs.statSync(islandAssetFile).isFile()) {
                const st = fs.statSync(islandAssetFile);
                res.writeHead(200, {
                  "Content-Type": getMimeType(islandAssetFile),
                  "Content-Length": st.size,
                  "Cache-Control": "public, max-age=86400",
                });
                fs.createReadStream(islandAssetFile).pipe(res);
                return;
              }
            }
          }
        } catch {
          // fallback to next middleware
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localMediaAndTtsPlugin()],
  server: {
    host: true,
    allowedHosts: true,
  },
});
