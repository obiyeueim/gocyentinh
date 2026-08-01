# Trường THPT Minh Khai — School Website

Website trường học mẫu được xây dựng bằng Next.js App Router, React, TypeScript,
Tailwind CSS và Lucide Icons.

## Chạy cục bộ

```bash
npm ci
npm run dev
```

Mở `http://localhost:3000`.

## Kiểm tra chất lượng

```bash
npm run lint
npm run typecheck
npm run build
npm run build:cloudflare
npm audit --omit=dev
```

## Cấu trúc chính

- `src/app`: 7 route chính, bài viết động, sitemap và robots.
- `src/components`: layout và component tương tác theo từng tính năng.
- `src/data`: dữ liệu JSON mẫu cho tin tức, sự kiện, hồ sơ, lịch và cơ sở vật chất.
- `src/types`: toàn bộ interface/type dùng chung.
- `.open-next`: bundle Cloudflare được tạo khi chạy `npm run build:cloudflare`.

## Dữ liệu demo

Tra cứu tuyển sinh:

- Mã hồ sơ: `MK2026001`
- Điện thoại: `0901234567`

Form và dữ liệu hiện chỉ phục vụ trình diễn giao diện; cần kết nối API, cơ sở dữ
liệu và lưu trữ tệp trước khi dùng cho hồ sơ thật.
