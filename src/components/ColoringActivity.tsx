import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import {
  ArrowLeft,
  Download,
  Eye,
  EyeOff,
  Pipette,
  RotateCcw,
  Shuffle,
  Sparkles,
  Star,
  Undo2,
  Upload,
} from "lucide-react";
import { useSpeech } from "../hooks/useSpeech";
import {
  COLORING_PICTURES,
  GROUP_TABS,
  KAWAII_COLOR_PALETTE,
  type ColoringGroupId,
  type ColoringPicture,
} from "../data/coloringPictures";
import { playCardPlaceSound, playRewardTone } from "../lib/sound";
import { getCanvasPixelCoords } from "../lib/touchCoords";
import type { ActivityProps } from "../types";
import { ColorMixingStudio } from "./ColorMixingStudio";

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function ColoringActivity({ soundEnabled, onComplete }: ActivityProps) {
  const [artMode, setArtMode] = useState<"coloring" | "mixing">("coloring");
  const [step, setStep] = useState<"gallery" | "paint">("gallery");
  const [activeGroup, setActiveGroup] = useState<ColoringGroupId>("all");
  const [selectedPic, setSelectedPic] = useState<ColoringPicture>(COLORING_PICTURES[0]);
  const [selectedColor, setSelectedColor] = useState<string>(KAWAII_COLOR_PALETTE[0].hex);
  const [ceramic3d, setCeramic3d] = useState(true);
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(null);
  const [showSideBySideRef, setShowSideBySideRef] = useState(true);
  const [fillCount, setFillCount] = useState(0);
  const [undoCount, setUndoCount] = useState(0);
  const [reloadTick, setReloadTick] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const refCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const undoStackRef = useRef<ImageData[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const speech = useSpeech(soundEnabled);

  useEffect(() => {
    if (soundEnabled) {
      speech.speak(
        "Chào Nấm! Nấm hãy chọn một bức tranh Sanrio, Capybara hoặc Khu Vườn Hoa để tô màu nhé!",
        "vi-VN",
      );
    }
  }, []);

  const activeImageUrl = customImageUrl || selectedPic.url;
  const activeRefUrl = customImageUrl ? undefined : selectedPic.refUrl;

  const filteredPics = useMemo(
    () =>
      activeGroup === "all"
        ? COLORING_PICTURES
        : COLORING_PICTURES.filter((p) => p.group === activeGroup),
    [activeGroup],
  );

  // Vẽ bức tranh nét lên Canvas chính khi vào chế độ "paint"
  useEffect(() => {
    if (step !== "paint") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    undoStackRef.current = [];
    setUndoCount(0);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const maxDim = 960;
      const scale = Math.min(maxDim / img.width, maxDim / img.height);
      const targetW = Math.max(320, Math.round(img.width * scale));
      const targetH = Math.max(320, Math.round(img.height * scale));
      canvas.width = targetW;
      canvas.height = targetH;
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, targetW, targetH);
      ctx.drawImage(img, 0, 0, targetW, targetH);

      // Vẽ khung viền đen đều đẹp 5px bao kín 4 cạnh ngoài của bức tranh
      ctx.strokeStyle = "#1A1A1A";
      ctx.lineWidth = 10;
      ctx.strokeRect(0, 0, targetW, targetH);
    };
    img.src = activeImageUrl;
  }, [step, activeImageUrl, reloadTick]);

  // Vẽ bức tranh mẫu lên Canvas phụ để Nấm vừa nhìn mẫu vừa có thể chạm hút màu trực tiếp
  useEffect(() => {
    if (step !== "paint" || !activeRefUrl || !showSideBySideRef) return;
    const rCanvas = refCanvasRef.current;
    if (!rCanvas) return;
    const rCtx = rCanvas.getContext("2d", { willReadFrequently: true });
    if (!rCtx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const maxDim = 640;
      const scale = Math.min(maxDim / img.width, maxDim / img.height);
      const targetW = Math.max(240, Math.round(img.width * scale));
      const targetH = Math.max(240, Math.round(img.height * scale));
      rCanvas.width = targetW;
      rCanvas.height = targetH;
      rCtx.fillStyle = "#FFFFFF";
      rCtx.fillRect(0, 0, targetW, targetH);
      rCtx.drawImage(img, 0, 0, targetW, targetH);
    };
    img.src = activeRefUrl;
  }, [step, activeRefUrl, showSideBySideRef]);

  // Chạm vào bức tranh mẫu để lấy/hút màu (Eyedropper thông minh cho bé)
  const handleSampleColorFromRef = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rCanvas = refCanvasRef.current;
    if (!rCanvas) return;
    const rCtx = rCanvas.getContext("2d", { willReadFrequently: true });
    if (!rCtx) return;

    const pt = getCanvasPixelCoords(e.clientX, e.clientY, rCanvas);
    if (!pt) return;
    const { x, y } = pt;

    const pixel = rCtx.getImageData(x, y, 1, 1).data;
    const [r, g, b] = [pixel[0], pixel[1], pixel[2]];
    // Bỏ qua nếu chạm trúng viền đen đậm
    if (r < 75 && g < 75 && b < 75) return;

    const pickedHex = rgbToHex(r, g, b);
    setSelectedColor(pickedHex);
    if (soundEnabled) {
      playCardPlaceSound(2);
    }
  };

  // Thuật toán Flood-Fill + Làm mượt viền răng cưa 1px quanh nét vẽ đen
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const pt = getCanvasPixelCoords(e.clientX, e.clientY, canvas);
    if (!pt) return;
    const startX = pt.x;
    const startY = pt.y;

    const width = canvas.width;
    const height = canvas.height;

    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    const startPos = (startY * width + startX) * 4;
    const startR = data[startPos];
    const startG = data[startPos + 1];
    const startB = data[startPos + 2];

    // Không đổ màu lên chính đường viền đen đậm
    if (startR < 95 && startG < 95 && startB < 95) return;

    const [fillR, fillG, fillB] = hexToRgb(selectedColor);
    if (
      Math.abs(startR - fillR) < 8 &&
      Math.abs(startG - fillG) < 8 &&
      Math.abs(startB - fillB) < 8
    ) {
      return;
    }

    // Lưu snapshot vào Undo Stack trước khi tô (tối đa 15 bước)
    const snapshot = new ImageData(new Uint8ClampedArray(data), width, height);
    undoStackRef.current.push(snapshot);
    if (undoStackRef.current.length > 15) {
      undoStackRef.current.shift();
    }
    setUndoCount(undoStackRef.current.length);

    const visited = new Uint8Array(width * height);
    const stack = new Int32Array(width * height);
    let stackPtr = 0;
    const startIdx = startY * width + startX;
    stack[stackPtr++] = startIdx;
    visited[startIdx] = 1;

    const isWall = (idx4: number) => {
      const r = data[idx4];
      const g = data[idx4 + 1];
      const b = data[idx4 + 2];
      return r < 125 && g < 125 && b < 125;
    };

    while (stackPtr > 0) {
      const pIdx = stack[--stackPtr];
      const x = pIdx % width;
      const y = (pIdx / width) | 0;
      const dIdx = pIdx * 4;

      data[dIdx] = fillR;
      data[dIdx + 1] = fillG;
      data[dIdx + 2] = fillB;
      data[dIdx + 3] = 255;

      if (x + 1 < width) {
        const n = pIdx + 1;
        if (!visited[n] && !isWall(n * 4)) {
          visited[n] = 1;
          stack[stackPtr++] = n;
        }
      }
      if (x - 1 >= 0) {
        const n = pIdx - 1;
        if (!visited[n] && !isWall(n * 4)) {
          visited[n] = 1;
          stack[stackPtr++] = n;
        }
      }
      if (y + 1 < height) {
        const n = pIdx + width;
        if (!visited[n] && !isWall(n * 4)) {
          visited[n] = 1;
          stack[stackPtr++] = n;
        }
      }
      if (y - 1 >= 0) {
        const n = pIdx - width;
        if (!visited[n] && !isWall(n * 4)) {
          visited[n] = 1;
          stack[stackPtr++] = n;
        }
      }
    }

    // Làm mượt 1px viền răng cưa sát đường nét đen để không bị hở viền trắng
    for (let i = 0; i < width * height; i++) {
      if (visited[i]) {
        const x = i % width;
        const y = (i / width) | 0;
        const neighbors = [
          x + 1 < width ? i + 1 : -1,
          x - 1 >= 0 ? i - 1 : -1,
          y + 1 < height ? i + width : -1,
          y - 1 >= 0 ? i - width : -1,
        ];
        for (const nb of neighbors) {
          if (nb >= 0 && !visited[nb]) {
            const nb4 = nb * 4;
            const nr = data[nb4];
            const ng = data[nb4 + 1];
            const nbCol = data[nb4 + 2];
            // Nếu là điểm ảnh xám nhạt chống răng cưa của viền đen (75..125), pha màu tô vào
            if (nr >= 70 && ng >= 70 && nbCol >= 70) {
              data[nb4] = Math.round(fillR * 0.65 + nr * 0.35);
              data[nb4 + 1] = Math.round(fillG * 0.65 + ng * 0.35);
              data[nb4 + 2] = Math.round(fillB * 0.65 + nbCol * 0.35);
            }
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    setFillCount((c) => c + 1);
    if (soundEnabled) {
      playCardPlaceSound(fillCount % 5);
    }
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || undoStackRef.current.length === 0) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const prevData = undoStackRef.current.pop();
    if (prevData) {
      ctx.putImageData(prevData, 0, 0);
      setUndoCount(undoStackRef.current.length);
    }
  };

  const handleExportJpg = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
    const link = document.createElement("a");
    link.download = `nam-to-mau-${selectedPic.id}.jpg`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (soundEnabled) {
      playRewardTone();
      speech.speak("Đã lưu bức tranh tô màu của Nấm thành ảnh đẹp rồi nhé!", "vi-VN");
    }
  };

  const handleUploadCustomImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCustomImageUrl(URL.createObjectURL(file));
    setStep("paint");
  };

  const handlePickRandomPicture = () => {
    const pool = filteredPics.length > 0 ? filteredPics : COLORING_PICTURES;
    const candidates = pool.filter((p) => p.id !== selectedPic.id);
    const pick =
      candidates.length > 0
        ? candidates[Math.floor(Math.random() * candidates.length)]
        : pool[0];
    setCustomImageUrl(null);
    setSelectedPic(pick);
    if (pick.suggestedHexes.length > 0) {
      setSelectedColor(pick.suggestedHexes[0]);
    }
    setStep("paint");
  };

  return (
    <div className="wb-content coloring-wb">
      {/* =====================================================================
          THANH CHUYỂN ĐỔI 2 CHẾ ĐỘ ĐỘC LẬP TRONG MỸ THUẬT: TÔ TRANH | TRỘN MÀU
         ===================================================================== */}
      <div className="art-studio-mode-switcher">
        <button
          type="button"
          className={`art-mode-tab-btn ${artMode === "coloring" ? "active" : ""}`}
          onClick={() => {
            setArtMode("coloring");
            if (soundEnabled) playCardPlaceSound(0);
          }}
        >
          <span className="art-mode-emoji">🖼️</span>
          <span>Tô Tranh Kawaii</span>
        </button>

        <button
          type="button"
          className={`art-mode-tab-btn mix-mode ${
            artMode === "mixing" ? "active" : ""
          }`}
          onClick={() => {
            setArtMode("mixing");
            if (soundEnabled) playCardPlaceSound(2);
          }}
        >
          <span className="art-mode-emoji">🧪</span>
          <span>Trộn Màu Sáng Tạo</span>
          <small className="art-mode-new-badge">Mới ✨</small>
        </button>
      </div>

      {/* =====================================================================
          CHẾ ĐỘ ĐỘC LẬP 2: PHÒNG THÍ NGHIỆM TRỘN MÀU SÁNG TẠO PASTEL
         ===================================================================== */}
      {artMode === "mixing" && (
        <ColorMixingStudio soundEnabled={soundEnabled} onComplete={onComplete} />
      )}

      {/* =====================================================================
          MÀN HÌNH 1: THƯ VIỆN TRANH TÔ MÀU MỚI (SANRIO, CAPYBARA, VƯỜN HOA)
         ===================================================================== */}
      {artMode === "coloring" && step === "gallery" && (
        <div className="coloring-gallery-screen">
          <div className="coloring-gallery-topbar">
            <div className="coloring-category-tabs">
              {GROUP_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`coloring-cat-tab ${activeGroup === tab.id ? "active" : ""}`}
                  onClick={() => setActiveGroup(tab.id)}
                >
                  <span>{tab.label}</span>
                  <small>{tab.count}</small>
                </button>
              ))}
            </div>

            <div className="coloring-gallery-actions">
              <button
                type="button"
                className="chunky-btn chunky-pink btn-sm"
                onClick={handlePickRandomPicture}
              >
                <Shuffle size={14} /> Chọn ngẫu nhiên
              </button>
              <button
                type="button"
                className="chunky-btn chunky-green btn-sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={14} /> Mở tranh từ máy
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleUploadCustomImage}
              />
            </div>
          </div>

          <div className="picture-thumb-grid new-kawaii-thumb-grid">
            {filteredPics.map((pic) => (
              <button
                key={pic.id}
                type="button"
                className="picture-thumb-card kawaii-coloring-card"
                onClick={() => {
                  setCustomImageUrl(null);
                  setSelectedPic(pic);
                  if (pic.suggestedHexes.length > 0) {
                    setSelectedColor(pic.suggestedHexes[0]);
                  }
                  setShowSideBySideRef(Boolean(pic.refUrl));
                  setStep("paint");
                }}
              >
                <div className="kawaii-thumb-split-preview">
                  {pic.refUrl && (
                    <div className="kawaii-thumb-ref-half" title="Mẫu màu gợi ý">
                      <img src={pic.refUrl} alt={`Mẫu ${pic.name}`} loading="lazy" />
                      <span className="thumb-half-tag tag-ref">Mẫu màu</span>
                    </div>
                  )}
                  <div className="kawaii-thumb-line-half" title="Tranh nét để tô">
                    <img src={pic.url} alt={pic.name} loading="lazy" />
                    <span className="thumb-half-tag tag-line">Tranh tô</span>
                  </div>
                </div>
                <strong className="kawaii-thumb-title">{pic.name}</strong>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          MÀN HÌNH 2: XƯỞNG TÔ MÀU KAWAII (MẪU MÀU + TRANH LỚN + BẢNG 20 MÀU)
         ===================================================================== */}
      {artMode === "coloring" && step === "paint" && (
        <div
          className={`coloring-workspace kawaii-paint-studio ${
            activeRefUrl && showSideBySideRef ? "with-side-ref" : "single-large-canvas"
          }`}
        >
          {/* CỘT TRÁI (TÙY CHỌN): KHUNG MẪU MÀU GỢI Ý & HÚT MÀU TRỰC TIẾP */}
          {activeRefUrl && showSideBySideRef && (
            <div className="kawaii-ref-panel">
              <div className="kawaii-ref-panel-header">
                <span>🎨 Mẫu Màu Gợi Ý</span>
                <small>
                  <Pipette size={11} /> Chạm vào mẫu để lấy màu!
                </small>
              </div>
              <div className="kawaii-ref-canvas-wrap">
                <canvas
                  ref={refCanvasRef}
                  className="kawaii-ref-interactive-canvas"
                  onClick={handleSampleColorFromRef}
                  title="Chạm vào bất kỳ màu nào trên tranh mẫu để chọn màu đó!"
                />
              </div>
            </div>
          )}

          {/* CỘT GIỮA: KHUNG TRANH TÔ MÀU CHÍNH PHÓNG TO */}
          <div
            className={`statue-canvas-box zoomed-canvas-box kawaii-main-canvas-box ${
              ceramic3d ? "ceramic-3d-gloss" : ""
            }`}
          >
            <div className="kawaii-canvas-top-floating-bar">
              <strong className="kawaii-active-pic-title">
                {customImageUrl ? "Tranh tải từ máy" : selectedPic.name}
              </strong>

              <div className="kawaii-canvas-top-btns">
                {activeRefUrl && (
                  <button
                    type="button"
                    className="floating-gloss-toggle"
                    style={{ position: "static" }}
                    onClick={() => setShowSideBySideRef((v) => !v)}
                  >
                    {showSideBySideRef ? <EyeOff size={12} /> : <Eye size={12} />}{" "}
                    {showSideBySideRef ? "Ẩn mẫu (Phóng to)" : "Hiện mẫu màu"}
                  </button>
                )}

                <button
                  type="button"
                  className="floating-gloss-toggle"
                  style={{ position: "static" }}
                  onClick={() => setCeramic3d((v) => !v)}
                >
                  <Sparkles size={12} /> {ceramic3d ? "Nổi 3D" : "Phẳng 2D"}
                </button>
              </div>
            </div>

            <div className="kawaii-canvas-stage-inner">
              <canvas
                ref={canvasRef}
                className="flood-fill-canvas kawaii-full-canvas"
                onClick={handleCanvasClick}
              />
            </div>
          </div>

          {/* CỘT PHẢI: KHAY MÀU GỢI Ý + BẢNG 20 MÀU + NÚT ĐIỀU KHIỂN */}
          <div className="color-palette-tray kawaii-palette-sidebar">
            {/* Dải màu gợi ý theo đúng bức tranh đang tô */}
            {!customImageUrl && selectedPic.suggestedHexes.length > 0 && (
              <div className="suggested-colors-box">
                <span className="palette-sec-label">✨ Màu trong mẫu:</span>
                <div className="suggested-colors-row">
                  {selectedPic.suggestedHexes.map((hex) => (
                    <button
                      key={`sug-${hex}`}
                      type="button"
                      className={`color-blob-btn blob-sm ${
                        selectedColor.toUpperCase() === hex.toUpperCase() ? "selected" : ""
                      }`}
                      style={{ backgroundColor: hex }}
                      onClick={() => setSelectedColor(hex)}
                      title="Màu gợi ý theo mẫu"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Bảng 20 màu đầy đủ */}
            <div className="full-palette-box">
              <div className="palette-active-indicator">
                <span
                  className="active-color-preview-dot"
                  style={{ backgroundColor: selectedColor }}
                />
                <span>
                  {KAWAII_COLOR_PALETTE.find(
                    (c) => c.hex.toUpperCase() === selectedColor.toUpperCase(),
                  )?.name || "Màu lấy từ mẫu"}
                </span>
              </div>

              <div className="palette-grid kawaii-20-palette-grid">
                {KAWAII_COLOR_PALETTE.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    className={`color-blob-btn ${
                      selectedColor.toUpperCase() === c.hex.toUpperCase() ? "selected" : ""
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                    onClick={() => setSelectedColor(c.hex)}
                  />
                ))}
              </div>
            </div>

            {/* Các nút thao tác gọn gàng */}
            <div className="coloring-footer-btns kawaii-studio-actions">
              <div className="studio-action-pair">
                <button
                  type="button"
                  className="chunky-btn chunky-yellow btn-sm"
                  onClick={handleUndo}
                  disabled={undoCount === 0}
                  title="Quay lại bước vừa tô"
                >
                  <Undo2 size={13} /> Hoàn tác ({undoCount})
                </button>
                <button
                  type="button"
                  className="chunky-btn chunky-orange btn-sm"
                  onClick={() => setReloadTick((t) => t + 1)}
                  title="Xóa hết màu để tô lại từ đầu"
                >
                  <RotateCcw size={13} /> Tô lại
                </button>
              </div>

              <div className="studio-action-pair">
                <button
                  type="button"
                  className="chunky-btn chunky-pink btn-sm"
                  onClick={() => setStep("gallery")}
                >
                  <ArrowLeft size={13} /> Đổi tranh
                </button>
                <button
                  type="button"
                  className="chunky-btn chunky-blue btn-sm"
                  onClick={handleExportJpg}
                >
                  <Download size={13} /> Lưu ảnh
                </button>
              </div>

              <button
                type="button"
                className="chunky-btn chunky-gold btn-sm kawaii-finish-star-btn"
                onClick={() =>
                  onComplete({
                    attempts: 1,
                    answers: [
                      `Hoàn thành tô màu ${selectedPic.name} (${fillCount} lần chấm màu)`,
                    ],
                  })
                }
              >
                <Star size={14} fill="currentColor" /> Hoàn Thành & Nhận Sao!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
