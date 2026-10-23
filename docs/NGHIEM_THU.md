# Nghiệm thu MVP Nấm Học Vui

Ngày kiểm tra: 12–13/10/2026. Môi trường Windows, Node 24.14.1, trình duyệt Chromium trong Codex. Kiểm thử tương tác dùng origin `localhost:5173`, tách khỏi trang bàn giao `127.0.0.1:5173` để không cộng sao thử nghiệm vào phiên học của gia đình.

## Đã kiểm tra

| Hạng mục | Kết quả |
| --- | --- |
| TypeScript + production build | `npm run build` thành công, không lỗi biên dịch |
| Kiểm thử dữ liệu | `npm test`: 6/6 đạt |
| 9 ảnh đầu vào | Đã xem toàn bộ và giữ nguyên file trong public/assets |
| Home ở 1366×768 | 4 thẻ môn hiển thị trọn trong chiều cao đầu; cạnh dưới khoảng 757px; sidebar không cần cuộn |
| Hai dòng thơ | Ở 1366px, mỗi dòng cao khoảng 77px với font 48px; đúng dấu, text HTML |
| Karaoke | Bật gợi ý, chạy hết 14 từ; “Con đọc xong” vẫn hiện, không tự chuyển bước |
| Giọng Việt thiếu | Bấm Nghe mẫu hiện thông báo giọng cục bộ chưa có; vẫn đọc/hoàn thành được |
| Đọc hiểu | Lo lắng → gợi ý; Vui vẻ → phản hồi đúng → Nhận sao |
| Không thưởng lặp | Hoàn thành bài đọc, reload, ôn lại: lượt ôn được lưu nhưng tổng sao không tăng |
| Toán | Đáp án 7 bị khóa lúc vừa vào; sau 3 giây được chọn; 6 → gợi ý; 7 → đúng → Nhận sao |
| Hình toán chính xác | Kiểm tra DOM: 7 quả SVG và số đếm 1–7, chia hai nhóm 4 và 3 |
| Tiếng Anh | Nói theo hiện mẫu câu; nghe apple được gọi; book → gợi ý; apple → đúng → sao |
| Nhịp điệu | Bật/dừng nhịp, hát một mình, chạm 2 nhịp, hoàn thành, nhận sao |
| Lưu bốn môn | Reload: 12 sao từ 4 bài, 5 lượt gồm 1 lần ôn; lịch sử và lần thử đúng |
| Ngày địa phương | Sang 13/10 vẫn giữ tổng sao, sao hôm nay chỉ tính ngày 13 |
| Cổng phụ huynh | Nhập 20 → báo tính lại; nhập 21 → mở thống kê/lịch sử |
| Xuất JSON | File thật được tải xuống, đọc được 5 lượt/12 sao, cài đặt và đáp án đầy đủ |
| Nhập JSON | Chọn file vừa xuất → xem trước 5 lượt/12 sao → xác nhận → dữ liệu được nhập |
| Responsive 390×844 | Home và bài đọc không tràn ngang; 4 thẻ xếp 2 cột; bài đọc tự xuống dòng phù hợp |
| Rời bài đang học | Hiện dialog, “Học tiếp nào” giữ nguyên bài, “Rời bài học” về Home |
| Console | Không thấy lỗi/warning trong các luồng đã kiểm tra |

## Giới hạn được giữ rõ trong sản phẩm

- Không có audio hát thu sẵn: môn Học hát là hoạt động nhịp điệu và tự hát. Chưa có chế độ nghe một bản nhạc hoàn chỉnh.
- Máy kiểm thử thiếu giọng `vi-VN` cục bộ; chưa kiểm chứng chất lượng một giọng Việt thực tế. Nút chọn bản ghi âm gia đình đã có, nhưng chưa kiểm thử bằng file đọc thu sẵn.
- Đã gọi giọng tiếng Anh qua UI; chưa đánh giá chất lượng phát âm/độ lớn âm thanh bằng nghe thủ công.
- Không nhận dạng/chấm giọng đọc, không tự nhận xét trẻ đọc đúng hay sai.
- Tiến độ lưu trong trình duyệt và origin đang dùng; chưa có đồng bộ thiết bị, tài khoản hay PWA.
- Nút xóa có xác nhận trong giao diện; không xóa tiến độ phiên bàn giao khi kiểm thử.
- Nội dung có 4 bài mẫu cố định. Sửa JSON là bước dành cho người phát triển; chưa có UI tạo/sửa bài.

## Cách nghiệm thu nhanh tại nhà

1. Mở `http://127.0.0.1:5173/` khi server đang chạy.
2. Chọn Học đọc, bật tô sáng, đợi hết rồi tự đọc xong. Chọn Vui vẻ và nhận sao.
3. Chọn Học toán, thử 6 rồi 7. Nhận sao.
4. Tải lại trang: tổng sao còn nguyên. Học lại bài trong cùng ngày không cộng lặp.
5. Mở Góc phụ huynh, xem lần thử và sao; xuất JSON để giữ một bản sao.
