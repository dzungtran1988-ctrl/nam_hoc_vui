import { useRef } from "react";
import { X } from "lucide-react";
import type { SubjectId } from "../../types";

export interface LocalVideoItem {
  id: string;
  filename: string;
  title: string;
  sourceDir: "video-nam" | "root";
  sizeMB: number;
  duration?: string;
  thumbUrl?: string;
}

export interface VideoTheaterModalProps {
  localVideos: LocalVideoItem[];
  activeVideoId: string | null;
  onSelectVideo: (id: string | null) => void;
  onClose: () => void;
  onStartLesson: (subject: SubjectId) => void;
}

export function VideoTheaterModal({
  localVideos,
  activeVideoId,
  onSelectVideo,
  onClose,
  onStartLesson,
}: VideoTheaterModalProps) {
  const videoStripRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="video-modal-backdrop" onClick={onClose}>
      <div
        className="video-modal-box yt-kids-theater"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="video-modal-header">
          <div className="yt-header-left">
            {activeVideoId && (
              <button
                type="button"
                className="chunky-btn chunky-orange btn-sm"
                onClick={() => onSelectVideo(null)}
              >
                ⬅ Tất cả clip ({localVideos.length})
              </button>
            )}
            <strong>
              🎬{" "}
              {activeVideoId
                ? localVideos.find((v) => v.id === activeVideoId)?.title ||
                  "Rạp Chiếu Phim Của Nấm"
                : `Rạp Chiếu Phim Hoạt Hình Của Nấm (${localVideos.length} tập)`}
            </strong>
          </div>
          <button
            type="button"
            className="chunky-btn chunky-pink btn-sm"
            onClick={onClose}
          >
            <X size={16} /> Đóng
          </button>
        </div>

        {!activeVideoId ? (
          localVideos.length === 0 ? (
            <div
              style={{
                padding: "28px 24px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                background:
                  "linear-gradient(180deg, #fff9fc 0%, #fff0f6 100%)",
                borderRadius: "24px",
                border: "3px dashed #f472b6",
                margin: "12px",
              }}
            >
              <div style={{ fontSize: "3.2rem", lineHeight: 1 }}>🎬💻✨</div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.35rem",
                  color: "#be185d",
                  fontWeight: 900,
                }}
              >
                Kho Phim Dài Đang Cất Trong Máy Tính Của Ba Mẹ
              </h3>
              <p
                style={{
                  margin: 0,
                  maxWidth: "560px",
                  fontSize: "1.05rem",
                  lineHeight: 1.55,
                  color: "#4b5563",
                  fontWeight: 700,
                }}
              >
                Các bộ phim hoạt hình dài có dung lượng lớn nên chỉ mở khi bật
                máy tính ở nhà. Trong lúc đó, Nấm có thể hát{" "}
                <strong>Karaoke</strong> hoặc xem{" "}
                <strong>8 Bài Hát & Truyện Tiếng Anh</strong> trực tuyến ngay
                bây giờ nhé!
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  justifyContent: "center",
                  marginTop: "6px",
                }}
              >
                <button
                  type="button"
                  className="chunky-btn chunky-pink"
                  onClick={() => {
                    onClose();
                    onStartLesson("music");
                  }}
                >
                  🎤 Vào Phòng Hát Karaoke
                </button>
                <button
                  type="button"
                  className="chunky-btn chunky-blue"
                  onClick={() => {
                    onClose();
                    onStartLesson("english");
                  }}
                >
                  🔤 Xem Nhạc & Truyện Tiếng Anh
                </button>
              </div>
            </div>
          ) : (
            <div className="yt-thumbnail-grid">
              {localVideos.map((vid) => (
                <button
                  key={vid.id}
                  type="button"
                  className="yt-video-card"
                  onClick={() => onSelectVideo(vid.id)}
                >
                  <div className="yt-thumb-wrap">
                    {vid.thumbUrl ? (
                      <img
                        src={vid.thumbUrl}
                        alt={vid.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="yt-thumb-fallback">🎬</div>
                    )}
                    <div className="yt-play-overlay">▶</div>
                    {vid.duration && (
                      <span className="yt-duration-badge">{vid.duration}</span>
                    )}
                  </div>
                  <div className="yt-card-info">
                    <strong>{vid.title}</strong>
                    <span>▶ Bấm để xem phim ({vid.sizeMB} MB)</span>
                  </div>
                </button>
              ))}
            </div>
          )
        ) : (
          <div className="yt-player-stage-2col">
            <div className="yt-main-video-box">
              <video
                key={activeVideoId}
                src={`/api/local-video-stream?id=${encodeURIComponent(
                  activeVideoId,
                )}`}
                controls
                autoPlay
                playsInline
                className="local-video-player yt-expanded-video"
              />
            </div>

            <div className="yt-upnext-sidebar">
              <div className="yt-upnext-header">
                🎞️ Danh sách tập phim ({localVideos.length})
              </div>
              <div className="yt-upnext-list" ref={videoStripRef}>
                {localVideos.map((vid) => {
                  const isPlaying = activeVideoId === vid.id;
                  return (
                    <button
                      key={vid.id}
                      type="button"
                      className={`yt-upnext-item ${isPlaying ? "active" : ""}`}
                      onClick={() => onSelectVideo(vid.id)}
                    >
                      <div className="yt-upnext-thumb">
                        {vid.thumbUrl ? (
                          <img
                            src={vid.thumbUrl}
                            alt={vid.title}
                            loading="lazy"
                          />
                        ) : (
                          <span>🎬</span>
                        )}
                        <span className="yt-mini-play">
                          {isPlaying ? "🔊" : "▶"}
                        </span>
                      </div>
                      <div className="yt-upnext-meta">
                        <strong className="yt-upnext-title">{vid.title}</strong>
                        <small className="yt-upnext-sub">
                          {isPlaying
                            ? "🌟 Đang phát..."
                            : `${vid.duration || "Clip"} · ${vid.sizeMB} MB`}
                        </small>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
