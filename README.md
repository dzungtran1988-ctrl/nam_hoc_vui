# 🍄 Nấm Học Vui

Ứng dụng React + TypeScript + Vite chạy trên máy, dựa trên đặc tả v1.2 và đủ 9 ảnh trong gói `Nam_Hoc_Vui_Bo_Khoi_Dau_v1.2 (1).zip`. Mỗi môn có một bài mẫu hoàn chỉnh.

## Mở ứng dụng

Yêu cầu Node.js 22.18+ hoặc 24 LTS. Máy triển khai đã có Node 24.14.1.

Trong PowerShell:

```powershell
cd "D:\Nấm học\nam-hoc-vui"
npm.cmd install
npm.cmd run dev
```

Trong terminal thông thường, các lệnh tương đương là `npm install` và `npm run dev`.

Mở **http://127.0.0.1:5173/**. Đây là địa chỉ localhost trên máy. Giữ terminal đang chạy; nhấn `Ctrl+C` khi muốn tắt server. Có thể bấm đúp **MO_NAM_HOC_VUI.cmd** để chạy và mở trình duyệt.

Luôn dùng cùng địa chỉ, cổng và trình duyệt để thấy tiến độ cũ. `localhost:5173` và `127.0.0.1:5173` có vùng localStorage riêng; dữ liệu giữa hai địa chỉ không tự đồng bộ. Không bật chế độ ẩn danh nếu muốn giữ sao lâu dài.

## Bản MVP đã có

- Trang chủ, 4 thẻ môn học, thư viện một bài mỗi môn, vườn sao.
- **Đọc cùng Hello Kitty:** hai dòng thơ HTML đúng dấu, chữ 48px trên laptop 1366px, tô sáng từng từ có thể bật/dừng/đọc lại. Không tự đọc hộ, không tự chuyển bài. “Con đọc xong” mở câu hỏi hiểu nghĩa; sai được gợi ý và thử lại.
- **My Melody đố toán:** 4 + 3; chờ 3 giây trước khi bật đáp án 6 / 7 / 8; đúng 4 và 3 quả táo SVG. Khi cần gợi ý, hiện số đếm 1–7. Chọn 7 rồi chủ động nhận sao.
- **Cinnamoroll:** hai dòng lời, 4 nút vỗ tay, nhịp thị giác và tiếng nhịp tạo trên máy, hát theo giai điệu riêng. Hiện rõ “Chưa có nhạc mẫu”; không dùng giọng nói TTS để giả bài hát.
- **Kuromi:** Hello / My name is Nam; apple / book / cat; nghe từ bằng giọng cục bộ nếu có, nói theo và chọn từ ứng với hình quả táo.
- **Sao:** mỗi bài 3 sao trong lần hoàn thành đầu của mỗi ngày theo giờ máy; dùng gợi ý hoặc trả lời sai không bị trừ sao. Ôn lại vẫn lưu lịch sử, không cộng thêm sao trong cùng ngày.
- **Góc phụ huynh:** trả lời phép cộng dành cho người lớn, xem tổng sao, ngày học, số lượt, đáp án/lần thử; bật/tắt âm thanh; xuất/nhập JSON có xem trước; xóa tiến độ có bước xác nhận. Cổng này chỉ tránh bấm nhầm, không phải bảo mật tài khoản.
- Font Nunito hỗ trợ tiếng Việt được phục vụ từ máy, không gọi Google Fonts khi học.

## Giọng đọc và quyền riêng tư

App không gọi API cloud, không bật micro hoặc webcam, không tự thu giọng của trẻ. Chỉ dùng giọng `speechSynthesis` được trình duyệt đánh dấu `localService`. Tiếng Việt cần giọng `vi-VN`; tiếng Anh cần giọng `en-*` cục bộ.

Nếu máy thiếu giọng Việt, app báo rõ. Người lớn có thể đọc cùng con hoặc mở **Bản đọc của gia đình → Chọn bản đọc từ máy** trong bài đọc. File chỉ được mở bằng URL cục bộ trong lượt học hiện tại, không tải lên máy chủ và không lưu file vào localStorage.

Sau khi đã cài dependencies, bài học, ảnh, font và lưu tiến độ không cần Internet. Vẫn cần server localhost đang chạy. Đây chưa phải PWA hoặc ứng dụng desktop cài đặt.

## Build và kiểm thử

```powershell
npm.cmd run build
npm.cmd test
npm.cmd run preview
```

`npm run build` chạy TypeScript rồi tạo thư mục `dist`. `npm run preview` mở bản build tại http://127.0.0.1:4173/; cổng khác có dữ liệu riêng, có thể dùng xuất/nhập JSON để chuyển tiến độ.

`npm test` kiểm tra: sao không lặp trong ngày; sao theo ngày địa phương; export/import; dữ liệu nhập sai hoặc sao trùng; dữ liệu lưu bị hỏng được sao lưu; lỗi bộ nhớ/quota không làm mất trạng thái đang học.

Xem **[docs/NGHIEM_THU.md](docs/NGHIEM_THU.md)** để biết kiểm thử trình duyệt và các giới hạn còn lại.

## Cấu trúc

```text
src/
  App.tsx                  Điều hướng, Home, thư viện, vườn sao, phần thưởng
  components/              Bốn hoạt động học + ParentPanel
  data/                    reading/math/music/english.json, subjects.ts
  hooks/                   useSpeech, useProgress
  lib/                     Kiểm tra dữ liệu, sao, âm thanh thưởng
  styles.css               Responsive, pastel, chữ Việt, reduced motion
public/assets/             9 ảnh gốc, giữ nguyên file
tests/progress.test.ts     Kiểm thử dữ liệu và sao
```

Nội dung bài là JSON trong `src/data`, được đóng gói lúc build. Đổi câu thơ/lời hát/từ vựng tại đây; đổi giới thiệu, tên hoặc ảnh của môn ở `subjects.ts`. Khi thay bài toán phải đồng thời sửa câu hỏi, phép tính, nhóm đồ vật, đáp án và giải thích. MVP hiện được kiểm duyệt cho 4 + 3; chưa có trình tạo phép toán tổng quát hay chức năng tạo/sửa bài bằng UI.

## Đánh giá khả năng triển khai và thiết kế

| Hạng mục | Đánh giá thực tế |
| --- | --- |
| MVP bốn môn, phản hồi, lưu sao | Khả thi hoàn toàn bằng local React, đã triển khai |
| UI đẹp từ ảnh hiện có | Phù hợp nhất là trang chủ giàu hình ảnh + bảng HTML sạch, màu dịu, nút lớn |
| Nhân vật | Giữ Nấm trai tóc đen/kính/áo đỏ và đúng bạn mỗi môn; ảnh không phải nền trong suốt nên dùng khung chân dung bằng CSS |
| Chữ karaoke chính xác | HTML thật, tô sáng gợi ý theo thời gian; không phải nhận dạng hoặc đánh giá đọc đúng |
| Đọc mẫu tiếng Việt | Phụ thuộc giọng cục bộ; bản ghi âm gia đình là phương án thay thế rõ ràng |
| Nhạc hát chuẩn | Chưa có file giai điệu/vocal trong bộ tài liệu; MVP làm nhịp và tự hát |
| Tiến độ phụ huynh | Lượt tự hoàn thành và đáp án trong app, không kết luận năng lực của trẻ |
| Mở rộng sau MVP | Thêm ngân hàng bài, thu âm chuẩn, ảnh tách nền, tác giả nội dung, PWA/desktop |

Ảnh gốc có chữ được vẽ sẵn chỉ làm minh họa. Nội dung dùng để học và chấm được hiển thị bằng DOM/SVG riêng. Giữ nguyên file ảnh nguồn; không dựng lại nhân vật. Khi xuất bản/thương mại hóa, cần xem lại quyền sử dụng nhân vật thương hiệu.
