#!/usr/bin/env python3
"""
Auto-Ingestion Pipeline cho Kho Ảnh 3D & Metadata Hợp Nhất (Nấm Học Vui)
-----------------------------------------------------------------------
Chức năng:
1. Tự động nhận diện ảnh đơn hoặc bảng nhiều vật thể (Grid / Connected Components).
2. Khử nền trắng/kem từ viền ngoài (Flood-fill) để bảo toàn chi tiết trắng bên trong vật thể (sữa, cơm, mắt, trứng...).
3. Cắt rời từng item, căn giữa vào khung vuông chuẩn 512x512 PNG trong suốt.
4. Xuất tờ Contact Sheet có đánh số thứ tự để đối chiếu trực quan 100% trước khi gắn tên.
5. Xuất đoạn mã TypeScript Metadata mẫu (`RawAssetSeed`) để nối thẳng vào `src/data/sharedAssetCatalog.ts`.

Cách chạy:
  python scripts/auto_ingest_assets.py --input "duong_dan_anh.png" --prefix "newset" --out-dir "public/assets/items/newset" --theme "lifeskills"
"""

import argparse
import os
from collections import deque
from PIL import Image, ImageDraw


def remove_outer_white_bg(crop_rgba: Image.Image, threshold: int = 240) -> Image.Image:
    """Khử nền trắng từ 4 cạnh ngoài vào trong (Flood-fill) giúp giữ nguyên màu trắng bên trong đồ vật."""
    w, h = crop_rgba.size
    px = crop_rgba.load()
    visited = [[False] * w for _ in range(h)]
    q = deque()

    def is_bg_pixel(r: int, g: int, b: int, a: int) -> bool:
        if a < 16:
            return True
        return r >= threshold and g >= threshold and b >= threshold

    for x in range(w):
        for y in (0, h - 1):
            r, g, b, a = px[x, y]
            if is_bg_pixel(r, g, b, a):
                visited[y][x] = True
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if not visited[y][x]:
                r, g, b, a = px[x, y]
                if is_bg_pixel(r, g, b, a):
                    visited[y][x] = True
                    q.append((x, y))

    while q:
        cx, cy = q.popleft()
        px[cx, cy] = (255, 255, 255, 0)
        for nx, ny in ((cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)):
            if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
                r, g, b, a = px[nx, ny]
                if is_bg_pixel(r, g, b, a):
                    visited[ny][nx] = True
                    q.append((nx, ny))

    return crop_rgba


def detect_connected_boxes(img_rgba: Image.Image, min_areaRatio: float = 0.004):
    """Tự động tìm các khung bao (bounding boxes) của từng vật thể rời trên nền trong suốt."""
    w, h = img_rgba.size
    px = img_rgba.load()
    visited = [[False] * w for _ in range(h)]
    boxes = []
    min_pixels = int(w * h * min_areaRatio)

    for y in range(h):
        for x in range(w):
            if not visited[y][x] and px[x, y][3] > 20:
                visited[y][x] = True
                q = deque([(x, y)])
                min_x = max_x = x
                min_y = max_y = y
                count = 0
                while q:
                    cx, cy = q.popleft()
                    count += 1
                    if cx < min_x:
                        min_x = cx
                    if cx > max_x:
                        max_x = cx
                    if cy < min_y:
                        min_y = cy
                    if cy > max_y:
                        max_y = cy
                    for nx, ny in (
                        (cx - 1, cy),
                        (cx + 1, cy),
                        (cx, cy - 1),
                        (cx, cy + 1),
                    ):
                        if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
                            if px[nx, ny][3] > 20:
                                visited[ny][nx] = True
                                q.append((nx, ny))
                if count >= min_pixels:
                    boxes.append((min_x, min_y, max_x + 1, max_y + 1))

    # Sắp xếp từ trên xuống dưới, từ trái sang phải theo hàng
    boxes.sort(key=lambda b: (b[1] // max(1, h // 6), b[0]))
    return boxes


def pack_to_square_canvas(crop_rgba: Image.Image, canvas_size: int = 512) -> Image.Image:
    bbox = crop_rgba.getbbox()
    if not bbox:
        return Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    trimmed = crop_rgba.crop(bbox)
    tw, th = trimmed.size
    max_dim = int(canvas_size * 0.86)
    scale = min(max_dim / max(1, tw), max_dim / max(1, th))
    nw, nh = max(1, int(tw * scale)), max(1, int(th * scale))
    resized = trimmed.resize((nw, nh), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    canvas.paste(resized, ((canvas_size - nw) // 2, (canvas_size - nh) // 2), resized)
    return canvas


def main():
    parser = argparse.ArgumentParser(description="Auto-ingest multi-item sheet or single asset")
    parser.add_argument("--input", required=True, help="Đường dẫn ảnh đầu vào")
    parser.add_argument("--prefix", required=True, help="Tiền tố đặt tên file xuất ra")
    parser.add_argument("--out-dir", required=True, help="Thư mục lưu các file PNG đã tách")
    parser.add_argument("--theme", default="lifeskills", help="themeGroup trong sharedAssetCatalog.ts")
    parser.add_argument("--grid", default="", help="Tùy chọn: lưới cố định dạng RxC (ví dụ: 3x4, 2x2)")
    args = parser.parse_args()

    os.makedirs(args.out_dir, exist_ok=True)
    src = Image.open(args.input).convert("RGBA")
    w, h = src.size

    extracted_images = []

    if args.grid and "x" in args.grid.lower():
        rows, cols = [int(x) for x in args.grid.lower().split("x")]
        cw, ch = w / cols, h / rows
        for r in range(rows):
            for c in range(cols):
                cell = src.crop((int(c * cw), int(r * ch), int((c + 1) * cw), int((r + 1) * ch)))
                clean_cell = remove_outer_white_bg(cell)
                extracted_images.append(pack_to_square_canvas(clean_cell))
    else:
        clean_full = remove_outer_white_bg(src.copy())
        boxes = detect_connected_boxes(clean_full)
        if len(boxes) <= 1:
            extracted_images.append(pack_to_square_canvas(clean_full))
        else:
            for box in boxes:
                crop = clean_full.crop(box)
                extracted_images.append(pack_to_square_canvas(crop))

    saved_paths = []
    for idx, item_img in enumerate(extracted_images, start=1):
        fname = f"{args.prefix}_{idx:02d}.png"
        fpath = os.path.join(args.out_dir, fname)
        item_img.save(fpath, "PNG")
        saved_paths.append((idx, fname, fpath, item_img))

    # Tạo tờ Contact Sheet để kiểm tra trực quan
    cols = min(6, max(1, len(saved_paths)))
    rows = (len(saved_paths) + cols - 1) // cols
    thumb = 180
    sheet = Image.new("RGBA", (cols * thumb, rows * (thumb + 32)), (255, 250, 245, 255))
    draw = ImageDraw.Draw(sheet)

    for i, (idx, fname, _, img_obj) in enumerate(saved_paths):
        r, c = divmod(i, cols)
        x0, y0 = c * thumb, r * (thumb + 32)
        preview = img_obj.resize((thumb - 16, thumb - 16), Image.Resampling.LANCZOS)
        sheet.paste(preview, (x0 + 8, y0 + 4), preview)
        draw.text((x0 + 12, y0 + thumb - 8), f"#{idx:02d}: {fname}", fill=(131, 24, 67, 255))

    contact_path = os.path.join(args.out_dir, f"contact_{args.prefix}.png")
    sheet.save(contact_path, "PNG")

    # Sinh khung TypeScript Metadata mẫu để dán vào sharedAssetCatalog.ts
    stub_path = os.path.join(args.out_dir, f"metadata_stub_{args.prefix}.ts")
    rel_dir = args.out_dir.replace("\\", "/")
    if "public/" in rel_dir:
        rel_dir = "/" + rel_dir.split("public/", 1)[1].strip("/")

    with open(stub_path, "w", encoding="utf-8") as f:
        f.write("// Bản nháp Metadata tự động sinh bởi scripts/auto_ingest_assets.py\n")
        f.write("// Đối chiếu tờ contact sheet tại: " + contact_path + " trước khi điền tên chuẩn.\n\n")
        for idx, fname, _, _ in saved_paths:
            f.write(
                f"""  {{
    id: "{args.prefix}-{idx:02d}",
    imageUrl: "{rel_dir}/{fname}",
    icon: "✨",
    name: "TODO_TEN_TIENG_VIET_{idx:02d}",
    readingWordVi: "TODO_TU_DOC_{idx:02d}",
    englishName: "TODO_ENGLISH_NAME_{idx:02d}",
    englishWord: "TODO_WORD_{idx:02d}",
    pronunciationIpa: "/todo/",
    primaryColor: "pink",
    colorLabelVi: "Hồng pastel",
    colorLabelEn: "Pink",
    activityLabelVi: "Khám phá và sử dụng trong bài học",
    activityVerbEn: "use",
    activityPhraseEn: "Use the item",
    soundEffect: "pop",
    soundLabelVi: "Bụp bụp vui nhộn",
    category: "daily",
    themeGroup: "{args.theme}",
    categoryLabel: "Đồ Vật 3D Mới",
  }},\n"""
            )

    print(f"Đã tách thành công {len(saved_paths)} ảnh vào: {args.out_dir}")
    print(f"Tờ Contact Sheet đối chiếu: {contact_path}")
    print(f"Khung Metadata mẫu: {stub_path}")


if __name__ == "__main__":
    main()
