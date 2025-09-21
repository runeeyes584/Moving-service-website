# Server Setup Guide

## Cách chạy server đúng để tránh lỗi navigation

### 1. Sử dụng Live Server (Khuyến nghị)

**Với VS Code:**
1. Cài đặt extension "Live Server"
2. Click chuột phải vào `index.html`
3. Chọn "Open with Live Server"

**Với các editor khác:**
1. Cài đặt Live Server globally: `npm install -g live-server`
2. Mở terminal trong thư mục project
3. Chạy: `live-server`

### 2. Sử dụng Python Server

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

Truy cập: `http://localhost:8000`

### 3. Sử dụng Node.js Server

```bash
npx http-server -p 8000
```

Truy cập: `http://localhost:8000`

### 4. Sử dụng PHP Server

```bash
php -S localhost:8000
```

Truy cập: `http://localhost:8000`

## ⚠️ Lưu ý quan trọng

### KHÔNG sử dụng:
- Mở trực tiếp file HTML trong browser (file://)
- Server không hỗ trợ CORS
- Server không hỗ trợ routing

### ✅ Sử dụng:
- HTTP server với CORS support
- Live Server (tốt nhất)
- Local development server

## Cấu trúc URL đúng

- Trang chủ: `http://localhost:8000/`
- About: `http://localhost:8000/pages/about.html`
- Services: `http://localhost:8000/pages/services.html`
- Get Quote: `http://localhost:8000/pages/get-quote.html`
- Login: `http://localhost:8000/pages/login.html`

## Troubleshooting

### Lỗi "Cannot GET /pages/index.html"
- **Nguyên nhân:** Truy cập sai URL
- **Giải pháp:** Sử dụng `http://localhost:8000/` thay vì `http://localhost:8000/pages/index.html`

### Lỗi CORS
- **Nguyên nhân:** Server không hỗ trợ CORS
- **Giải pháp:** Sử dụng Live Server hoặc server có CORS support

### Lỗi 404
- **Nguyên nhân:** File không tồn tại hoặc đường dẫn sai
- **Giải pháp:** Kiểm tra file có tồn tại không, sửa đường dẫn

## Quick Start

1. Mở VS Code
2. Cài Live Server extension
3. Click chuột phải vào `index.html`
4. Chọn "Open with Live Server"
5. Truy cập: `http://127.0.0.1:5500`

## File .htaccess

File `.htaccess` đã được tạo để hỗ trợ Apache server với:
- URL rewriting
- Error handling
- Security headers
- Caching
- Compression
