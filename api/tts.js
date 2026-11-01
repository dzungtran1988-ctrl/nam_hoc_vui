function normalizeSpeechText(rawText, isEn) {
  let text = String(rawText || "")
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return "";

  if (!isEn) {
    text = text
      .replace(/\[\s*\?\s*\]|\(\s*\?\s*\)|_{2,}|\.{3,}/g, " ô trống ")
      .replace(/(\d)\s*\+\s*(\d)/g, "$1 cộng $2")
      .replace(/(\d)\s*-\s*(\d)/g, "$1 trừ $2")
      .replace(/(\d)\s*[x×*]\s*(\d)/gi, "$1 nhân $2")
      .replace(/(\d)\s*[:÷/]\s*(\d)/g, "$1 chia $2")
      .replace(/=\s*\?/g, " bằng mấy ")
      .replace(/=/g, " bằng ")
      .replace(/\bvs\b/gi, " và ")
      .replace(/\s+/g, " ")
      .trim();
  }

  return text;
}

function splitTextIntoChunks(text, maxLen = 175) {
  if (text.length <= maxLen) return [text];
  const rawParts = text.split(/(?<=[.?!,;:])\s+/);
  const chunks = [];
  let current = "";

  for (const part of rawParts) {
    if (!part) continue;
    if ((current ? `${current} ${part}` : part).length <= maxLen) {
      current = current ? `${current} ${part}` : part;
    } else {
      if (current) chunks.push(current);
      if (part.length <= maxLen) {
        current = part;
      } else {
        const words = part.split(/\s+/);
        let wordChunk = "";
        for (const w of words) {
          if ((wordChunk ? `${wordChunk} ${w}` : w).length <= maxLen) {
            wordChunk = wordChunk ? `${wordChunk} ${w}` : w;
          } else {
            if (wordChunk) chunks.push(wordChunk);
            wordChunk = w;
          }
        }
        current = wordChunk;
      }
    }
  }
  if (current) chunks.push(current);
  return chunks.length > 0 ? chunks : [text.slice(0, maxLen)];
}

export default async function handler(req, res) {
  try {
    const urlObj = new URL(req.url || "/", "http://localhost");
    const rawText = (req.query?.text ?? urlObj.searchParams.get("text") ?? "").toString().trim();
    const rawLang = (req.query?.lang ?? urlObj.searchParams.get("lang") ?? "vi-VN").toString().trim();

    const isEn = rawLang.toLowerCase().startsWith("en");
    const tl = isEn ? "en" : "vi";
    const cleaned = normalizeSpeechText(rawText, isEn);

    if (!cleaned) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Missing text");
      return;
    }

    const chunks = splitTextIntoChunks(cleaned, 175);
    const audioBuffers = [];

    for (const chunk of chunks) {
      const gUrl =
        `https://translate.google.com/translate_tts?ie=UTF-8&tl=${tl}&client=tw-ob&q=` +
        encodeURIComponent(chunk);

      const gRes = await fetch(gUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Referer: "https://translate.google.com/",
        },
      });

      if (!gRes.ok) {
        throw new Error(`Upstream TTS HTTP ${gRes.status}`);
      }

      const arrBuf = await gRes.arrayBuffer();
      const buf = Buffer.from(arrBuf);
      if (buf.length > 100) {
        audioBuffers.push(buf);
      }
    }

    if (audioBuffers.length === 0) {
      res.statusCode = 502;
      res.end("Empty TTS audio");
      return;
    }

    const finalBuffer = Buffer.concat(audioBuffers);
    res.statusCode = 200;
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", String(finalBuffer.length));
    res.setHeader("Cache-Control", "public, max-age=31536000, s-maxage=31536000, immutable");
    res.end(finalBuffer);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end(`TTS Error: ${err instanceof Error ? err.message : String(err)}`);
  }
}
