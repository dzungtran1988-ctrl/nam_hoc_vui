import { useRef, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  Download,
  Heart,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  Upload,
  Volume2,
} from "lucide-react";
import {
  getProgressStats,
  localDateKey,
  parseProgress,
  serializeProgress,
} from "../lib/progress";
import type { Progress } from "../lib/progress";

interface ParentPanelProps {
  progress: Progress;
  onImport: (json: string) => void;
  onReset: () => void;
  onSoundChange: (enabled: boolean) => void;
}

const lessonNames: Record<string, string> = {
  "reading-001": "Đến lớp vui · Học đọc",
  "math-001": "Bảy quả táo · Học toán",
  "music-001": "La la la · Học hát",
  "english-001": "Hello, Nấm! · Tiếng Anh",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function ParentPanel({
  progress,
  onImport,
  onReset,
  onSoundChange,
}: ParentPanelProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [gateAnswer, setGateAnswer] = useState("");
  const [gateError, setGateError] = useState("");
  const [notice, setNotice] = useState("");
  const [importError, setImportError] = useState("");
  const [pendingImport, setPendingImport] = useState<{
    progress: Progress;
    fileName: string;
  } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const stats = getProgressStats(progress);

  if (!unlocked)
    return (
      <section className="parent-page">
        <div className="parent-gate parent-card">
          <ShieldCheck size={42} aria-hidden="true" />
          <p className="eyebrow">GÓC PHỤ HUYNH</p>
          <h1>Một khoảng nhỏ cho ba mẹ</h1>
          <p>
            Cùng nhìn lại những điều con đã học và chăm chút trải nghiệm của
            con.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (gateAnswer.trim() === "21") {
                setUnlocked(true);
                setGateError("");
              } else setGateError("Ba mẹ thử tính lại phép cộng này nhé.");
            }}
          >
            <label className="form-field" htmlFor="parent-answer">
              <span>Ba mẹ tính giúp: 12 + 9 = ?</span>
              <input
                id="parent-answer"
                value={gateAnswer}
                onChange={(event) => setGateAnswer(event.target.value)}
                inputMode="numeric"
                autoComplete="off"
                placeholder="Nhập kết quả"
                aria-invalid={Boolean(gateError)}
                aria-describedby={gateError ? "parent-gate-error" : undefined}
              />
            </label>
            {gateError && (
              <p className="feedback" id="parent-gate-error" role="alert">
                {gateError}
              </p>
            )}
            <button className="button button-primary" type="submit">
              Mở góc phụ huynh <ShieldCheck size={18} aria-hidden="true" />
            </button>
          </form>
          <p className="hint-note">
            Thao tác dành cho người lớn, không phải mật khẩu bảo mật.
          </p>
        </div>
      </section>
    );

  const exportData = () => {
    try {
      const blob = new Blob([serializeProgress(progress)], {
        type: "application/json;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `nam-hoc-vui-${localDateKey()}.json`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice(
        "Đã tạo bản xuất JSON. Ba mẹ kiểm tra mục tải xuống để giữ tệp ở nơi an toàn.",
      );
    } catch {
      setImportError("Chưa tạo được bản xuất. Ba mẹ thử lại nhé.");
    }
  };

  const previewImport = async (file: File) => {
    setNotice("");
    setImportError("");
    setPendingImport(null);
    try {
      if (file.size > 5_000_000)
        throw new Error("Tệp vượt quá 5 MB. Vui lòng chọn tệp JSON nhỏ hơn.");
      const parsed = parseProgress(await file.text());
      setPendingImport({ progress: parsed, fileName: file.name });
    } catch (error) {
      setImportError(
        error instanceof Error ? error.message : "Không đọc được tệp đã chọn.",
      );
    } finally {
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  return (
    <section className="parent-page">
      <header className="parent-heading">
        <div>
          <p className="eyebrow">ĐỒNG HÀNH CÙNG CON</p>
          <h1>
            Góc phụ huynh <Heart size={28} aria-hidden="true" />
          </h1>
          <p>Mỗi lần con thử là một bước tiến nhỏ.</p>
        </div>
        <button
          className="button button-ghost"
          onClick={() => {
            setUnlocked(false);
            setGateAnswer("");
            setPendingImport(null);
            setConfirmReset(false);
          }}
        >
          <ShieldCheck size={18} aria-hidden="true" /> Khóa góc phụ huynh
        </button>
      </header>

      <div className="parent-stats">
        <article className="parent-stat">
          <Star aria-hidden="true" />
          <strong>{stats.totalStars}</strong>
          <span>Ngôi sao đã nhận</span>
        </article>
        <article className="parent-stat">
          <BookOpen aria-hidden="true" />
          <strong>{stats.totalSessions}</strong>
          <span>Lượt học hoàn thành</span>
        </article>
        <article className="parent-stat">
          <CalendarDays aria-hidden="true" />
          <strong>{stats.activeDays}</strong>
          <span>Ngày cùng học</span>
        </article>
        <article className="parent-stat">
          <Sparkles aria-hidden="true" />
          <strong>{stats.todayStars}</strong>
          <span>Ngôi sao hôm nay</span>
        </article>
      </div>

      <div className="parent-grid">
        <section className="parent-card">
          <h2>Cài đặt nhẹ nhàng</h2>
          <label className="setting-row">
            <span>
              <Volume2 size={20} aria-hidden="true" /> Âm thanh và giọng mẫu
            </span>
            <input
              type="checkbox"
              checked={progress.soundEnabled}
              onChange={(event) => onSoundChange(event.target.checked)}
            />
          </label>
          <p className="hint-note">
            Giọng đọc chỉ phát khi được bấm. Con luôn có thể học bằng chữ và
            hình, không cần micro hay camera.
          </p>
          <p className="hint-note">
            Mỗi bài tặng 3 sao trong lần hoàn thành đầu tiên mỗi ngày. Con có
            thể học lại bao nhiêu lần tùy thích; các lượt đều được ghi lại.
          </p>
        </section>

        <section className="parent-card">
          <h2>Giữ lại hành trình của con</h2>
          <p>
            Dữ liệu nằm trong trình duyệt trên máy này. Xuất một bản JSON để sao
            lưu hoặc chuyển sang máy khác.
          </p>
          <div className="button-row">
            <button className="button button-secondary" onClick={exportData}>
              <Download size={18} aria-hidden="true" /> Xuất JSON
            </button>
            <button
              className="button button-ghost"
              onClick={() => fileInput.current?.click()}
            >
              <Upload size={18} aria-hidden="true" /> Nhập JSON
            </button>
            <input
              ref={fileInput}
              type="file"
              accept=".json,application/json"
              hidden
              aria-label="Chọn tệp tiến độ JSON"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void previewImport(file);
              }}
            />
          </div>
          {importError && (
            <p className="feedback" role="alert">
              {importError}
            </p>
          )}
          {notice && (
            <p className="feedback" role="status">
              {notice}
            </p>
          )}
          {pendingImport && (
            <div
              className="import-preview feedback"
              role="region"
              aria-label="Xem trước dữ liệu nhập"
            >
              <h3>Xem trước: {pendingImport.fileName}</h3>
              <p>
                {pendingImport.progress.completions.length} lượt học ·{" "}
                {getProgressStats(pendingImport.progress).totalStars} sao · Âm
                thanh {pendingImport.progress.soundEnabled ? "bật" : "tắt"}.
              </p>
              <p>
                Bản nhập sẽ thay thế toàn bộ lịch sử và cài đặt hiện có. Ba mẹ
                nên xuất bản hiện tại trước khi xác nhận.
              </p>
              <div className="button-row">
                <button
                  className="button button-primary"
                  onClick={() => {
                    try {
                      onImport(serializeProgress(pendingImport.progress));
                      setPendingImport(null);
                      setNotice("Đã nhập dữ liệu vào ứng dụng.");
                      setImportError("");
                    } catch (error) {
                      setImportError(
                        error instanceof Error
                          ? error.message
                          : "Chưa nhập được dữ liệu.",
                      );
                    }
                  }}
                >
                  Xác nhận thay thế dữ liệu
                </button>
                <button
                  className="button button-ghost"
                  onClick={() => setPendingImport(null)}
                >
                  Hủy nhập
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      <section className="parent-card">
        <h2>Những lần con đã học</h2>
        <p className="hint-note">
          Các lượt hoàn thành phản ánh hoạt động trong app; đây không phải đánh
          giá năng lực đọc hay phát âm.
        </p>
        {progress.completions.length === 0 ? (
          <div className="parent-empty">
            <BookOpen size={32} aria-hidden="true" />
            <p>Hành trình đang chờ những ngôi sao đầu tiên.</p>
            <span>Cùng con chọn một bài học để bắt đầu nhé.</span>
          </div>
        ) : (
          <div className="parent-table-wrap">
            <table className="parent-table">
              <caption className="sr-only">
                50 lượt học gần nhất, thời gian hiển thị theo máy này
              </caption>
              <thead>
                <tr>
                  <th scope="col">Bài học</th>
                  <th scope="col">Hoàn thành</th>
                  <th scope="col">Lần thử</th>
                  <th scope="col">Đáp án</th>
                  <th scope="col">Sao</th>
                </tr>
              </thead>
              <tbody>
                {progress.completions
                  .slice(-50)
                  .reverse()
                  .map((entry, index) => (
                    <tr key={`${entry.completedAt}-${index}`}>
                      <td>{lessonNames[entry.lessonId] ?? entry.lessonId}</td>
                      <td>{formatDate(entry.completedAt)}</td>
                      <td>{entry.attempts}</td>
                      <td>
                        {entry.answers.length > 0
                          ? entry.answers.join(" → ")
                          : "Tự hoàn thành"}
                      </td>
                      <td>
                        {entry.stars > 0 ? `+${entry.stars} ★` : "Lượt ôn tập"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {progress.completions.length > 50 && (
          <p className="hint-note">
            Đang hiển thị 50 lượt gần nhất. Bản xuất JSON chứa đầy đủ lịch sử.
          </p>
        )}
      </section>

      <section className="parent-card parent-reset">
        <div>
          <h2>Bắt đầu hành trình mới</h2>
          <p>
            Xóa sao và lịch sử học trên trình duyệt này. Cài đặt âm thanh được
            giữ lại.
          </p>
        </div>
        {!confirmReset ? (
          <button
            className="button button-ghost"
            onClick={() => setConfirmReset(true)}
          >
            <Trash2 size={18} aria-hidden="true" /> Xóa tiến độ
          </button>
        ) : (
          <div
            className="feedback"
            role="region"
            aria-label="Xác nhận xóa tiến độ"
          >
            <p>
              <strong>Ba mẹ muốn xóa toàn bộ tiến độ?</strong> Thao tác này
              không thể hoàn tác nếu chưa xuất JSON.
            </p>
            <div className="button-row">
              <button
                className="button button-danger"
                onClick={() => {
                  onReset();
                  setConfirmReset(false);
                  setPendingImport(null);
                  setNotice("Đã xóa sao và lịch sử học trong ứng dụng.");
                }}
              >
                Xác nhận xóa toàn bộ
              </button>
              <button
                className="button button-secondary"
                onClick={() => setConfirmReset(false)}
              >
                Giữ lại tiến độ
              </button>
            </div>
          </div>
        )}
      </section>
    </section>
  );
}
