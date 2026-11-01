import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/nunito/latin-400.css";
import "@fontsource/nunito/vietnamese-400.css";
import "@fontsource/nunito/latin-600.css";
import "@fontsource/nunito/vietnamese-600.css";
import "@fontsource/nunito/latin-700.css";
import "@fontsource/nunito/vietnamese-700.css";
import "@fontsource/nunito/latin-800.css";
import "@fontsource/nunito/vietnamese-800.css";
import "@fontsource/nunito/latin-900.css";
import "@fontsource/nunito/vietnamese-900.css";
import App from "./App";
import "./styles.css";

/* ── Error Boundary: bắt runtime error, không để app trắng màn hình ── */
class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; errorMsg: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMsg: "" };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMsg: error?.message || "Lỗi không xác định" };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #fce4ec 0%, #e8f5e9 100%)",
            fontFamily: "Nunito, sans-serif",
            padding: 24,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 72, marginBottom: 16 }}>🍄</div>
          <h1 style={{ fontSize: 28, color: "#d32f2f", marginBottom: 12 }}>
            Ôi! Có lỗi rồi!
          </h1>
          <p style={{ fontSize: 18, color: "#555", maxWidth: 400, marginBottom: 24 }}>
            Ứng dụng gặp trục trặc nhỏ. Bấm nút bên dưới để thử lại nhé! 🌟
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, errorMsg: "" });
              window.location.reload();
            }}
            style={{
              padding: "14px 36px",
              fontSize: 20,
              fontWeight: 700,
              border: "none",
              borderRadius: 16,
              background: "linear-gradient(135deg, #66bb6a, #43a047)",
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(76,175,80,0.3)",
            }}
          >
            🔄 Thử lại nào!
          </button>
          {process.env.NODE_ENV !== "production" && (
            <pre
              style={{
                marginTop: 24,
                fontSize: 12,
                color: "#999",
                maxWidth: 500,
                overflow: "auto",
              }}
            >
              {this.state.errorMsg}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>,
);
