/**
 * Chuẩn hóa tọa độ chạm/chuột (clientX, clientY) sang tọa độ cục bộ của phần tử HTML/Canvas,
 * tự động xử lý cả 2 trường hợp:
 * 1. Màn hình điện thoại cầm dọc đang tự xoay ngang bằng CSS (.game-viewport { transform: rotate(90deg) })
 * 2. Canvas dùng object-fit: contain có khoảng trống hai bên (letterbox / pillarbox).
 */

export function isViewportRotated90(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia(
    "screen and (orientation: portrait) and (max-width: 960px)",
  ).matches;
}

/**
 * Trả về tọa độ tương đối (ratioX: 0..1, ratioY: 0..1) bên trong một phần tử HTML bất kỳ.
 */
export function getElementLocalRatio(
  clientX: number,
  clientY: number,
  el: HTMLElement,
): { ratioX: number; ratioY: number; localWidth: number; localHeight: number } {
  const rect = el.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) {
    return { ratioX: 0, ratioY: 0, localWidth: 1, localHeight: 1 };
  }

  if (isViewportRotated90()) {
    // Khi xoay 90° theo chiều kim đồng hồ:
    // Trục +X của giao diện đi từ trên xuống dưới màn hình vật lý (rect.top -> rect.bottom)
    // Trục +Y của giao diện đi từ phải sang trái màn hình vật lý (rect.right -> rect.left)
    const ratioX = (clientY - rect.top) / rect.height;
    const ratioY = (rect.right - clientX) / rect.width;
    return {
      ratioX,
      ratioY,
      localWidth: rect.height,
      localHeight: rect.width,
    };
  }

  return {
    ratioX: (clientX - rect.left) / rect.width,
    ratioY: (clientY - rect.top) / rect.height,
    localWidth: rect.width,
    localHeight: rect.height,
  };
}

/**
 * Trả về tọa độ pixel (x, y) chính xác trên bitmap của <canvas> kể cả khi canvas dùng object-fit: contain
 * và kể cả khi màn hình điện thoại tự xoay 90°.
 */
export function getCanvasPixelCoords(
  clientX: number,
  clientY: number,
  canvas: HTMLCanvasElement,
): { x: number; y: number } | null {
  if (canvas.width <= 0 || canvas.height <= 0) return null;

  const { ratioX, ratioY, localWidth, localHeight } = getElementLocalRatio(
    clientX,
    clientY,
    canvas,
  );

  // Tính vùng hiển thị thực tế của bitmap bên trong hộp CSS khi có object-fit: contain
  const boxAspect = localWidth / localHeight;
  const bitmapAspect = canvas.width / canvas.height;

  let renderW = localWidth;
  let renderH = localHeight;
  let offsetX = 0;
  let offsetY = 0;

  if (boxAspect > bitmapAspect) {
    // Hộp CSS rộng hơn tỷ lệ ảnh -> có khoảng trống trái/phải (pillarbox)
    renderH = localHeight;
    renderW = localHeight * bitmapAspect;
    offsetX = (localWidth - renderW) / 2;
  } else if (boxAspect < bitmapAspect) {
    // Hộp CSS cao hơn tỷ lệ ảnh -> có khoảng trống trên/dưới (letterbox)
    renderW = localWidth;
    renderH = localWidth / bitmapAspect;
    offsetY = (localHeight - renderH) / 2;
  }

  const localPxX = ratioX * localWidth - offsetX;
  const localPxY = ratioY * localHeight - offsetY;

  const x = Math.floor((localPxX / Math.max(1, renderW)) * canvas.width);
  const y = Math.floor((localPxY / Math.max(1, renderH)) * canvas.height);

  if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
    return null;
  }

  return { x, y };
}
