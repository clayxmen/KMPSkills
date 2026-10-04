# 💎 `kmp-skills` — Công Cụ Universal AI CLI Dành Cho Android Native & Kotlin Multiplatform

[![npm version](https://img.shields.io/npm/v/kmp-skills.svg?style=flat-square)](https://www.npmjs.com/package/kmp-skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/Node-%3E%3D18.0.0-brightgreen.svg?style=flat-square)](https://nodejs.org)
[![Platform Support](https://img.shields.io/badge/Targets-Android_%7C_iOS_%7C_Desktop_%7C_Web_%7C_Server-blueviolet.svg?style=flat-square)](#nền-tảng-hỗ-trợ)

`kmp-skills` là công cụ dòng lệnh (CLI) độc lập, zero-dependency, cho phép tích hợp tức thì **27 Siêu Kỹ Năng Kiến Trúc và bộ Prompt mẫu chuẩn doanh nghiệp** vào **BẤT KỲ** dự án Android Native hoặc Kotlin Multiplatform (KMP/CMP) nào chỉ trong vài giây.

Sau khi cài đặt, các trợ lý lập trình AI của bạn (**Cursor, Android Studio, VS Code, Google Antigravity, hoặc Claude Code**) sẽ ngay lập tức thấu hiểu toàn bộ quy ước kiến trúc, ranh giới phân tầng module, cơ chế migration Room DB, mạng Ktor, máy trạng thái MVI và quy chuẩn tối ưu Compose compiler mà không cần hướng dẫn thủ công.

---

## ⚡ Bắt Đầu Nhanh (Không Cần Cài Đặt Qua `npx`)

Chỉ cần mở terminal tại thư mục gốc của dự án Android/KMP và chạy:

```bash
npx kmp-skills init
```

Công cụ sẽ tự động quét dự án, nhận diện IDE và các thư viện trong `libs.versions.toml`, sau đó sinh ra toàn bộ file ngữ cảnh phù hợp!

### Cài Đặt Toàn Cục (Tùy Chọn)

```bash
npm install -g kmp-skills

# Chẩn đoán sức khỏe kiến trúc của project
kmp-skills doctor

# Khởi tạo hoặc cập nhật toàn bộ quy tắc AI
kmp-skills init --all
```

---

## 🛠️ Hướng Dẫn Sử Dụng Chi Tiết Các Lệnh

### 1. `kmp-skills init`
Khởi tạo hoặc cập nhật các quy tắc AI cho dự án hiện tại.

```bash
# Chế độ tương tác (chọn IDE và Mô hình LLM mong muốn)
kmp-skills init

# Tự động đồng ý theo khuyến nghị tối ưu
kmp-skills init --yes

# Chọn đích danh IDE và Mô hình AI
kmp-skills init --ides cursor,android-studio --models claude,gemini

# Kích hoạt toàn bộ các nền tảng IDE
kmp-skills init --all
```

**Các file được sinh ra tự động**:
- **Cursor**: `.cursor/rules/*.mdc` (27 file quy tắc độc lập tự động kích hoạt theo định dạng file, ví dụ mở file `*ViewModel.kt` thì Cursor tự nạp quy tắc MVI).
- **Android Studio & VS Code**: `.github/copilot-instructions.md` (nạp ngữ cảnh toàn diện cho GitHub Copilot và Google Gemini Code Assist).
- **Claude Code CLI & Windsurf**: `CLAUDE.md` và `.windsurfrules`.
- **Google Antigravity & AGY**: Đồng bộ trực tiếp 27 kỹ năng vào `~/.gemini/config/skills/kmp-*`.

---

### 2. `kmp-skills doctor`
Chạy bộ chẩn đoán kiến trúc và kiểm tra môi trường AI trong dự án:

```bash
kmp-skills doctor
```

**Các hạng mục được kiểm tra**:
- **Bản Chất Dự Án**: Phân tích xem dự án là KMP, Android Native đơn thuần hay Fullstack (kèm Ktor Server).
- **Kiểm Tra Phiên Bản Trong Gradle Version Catalog (`libs.versions.toml`)**:
  - Kotlin (`>= 2.0.0`)
  - Android Gradle Plugin (`>= 8.5.0`)
  - Compose Multiplatform (`>= 1.7.0`)
  - Ktor Client (`>= 3.0.0`)
  - Room Multiplatform (`>= 2.7.0`)
  - Koin DI (`>= 4.0.0`)
- **Hạ Tầng Kiểm Thử (Testing)**: Kiểm tra cấu hình CashApp Turbine và Mockative.
- **Trạng Thái Quy Tắc AI**: Báo cáo tình trạng hoạt động của Cursor Rules, Copilot Instructions, Claude Rules và Antigravity Skills.

---

### 3. `kmp-skills list`
Hiển thị toàn bộ danh mục 27 Siêu Kỹ Năng Kiến Trúc được phân chia theo 10 phân vùng chuyên sâu:

```bash
kmp-skills list
```

---

### 4. `kmp-skills inject <tên-skill>`
Trích xuất hoặc chèn một kỹ năng cụ thể vào project:

```bash
# In nội dung skill Room database theo định dạng Cursor MDC ra màn hình
kmp-skills inject kmp-offline-room-database --format mdc --stdout

# Xuất skill MVI StateFlow ra một file tài liệu markdown
kmp-skills inject kmp-mvi-stateflow-architecture --output ./docs/MVI_GUIDE.md
```

---

## 🤖 Tối Ưu Hóa Riêng Biệt Cho Từng Dòng LLM

`kmp-skills` tự động điều chỉnh cú pháp và cấu trúc ngữ cảnh phù hợp với từng họ mô hình ngôn ngữ lớn:

| Họ Mô Hình | Chiến Lược Tối Ưu Hóa Prompt |
| :--- | :--- |
| **Anthropic Claude (3.7 / 3.5 Sonnet)** | Đóng gói trong các thẻ XML ngữ nghĩa (`<skill>`, `<architectural_guidelines>`, `<strict_enforcement>`), nghiêm cấm viết code dở dang (`// TODO`) và kiểm soát nghiêm ngặt rò rỉ bộ nhớ Kotlin/Native ARC. |
| **Google Gemini (2.0 Flash / Pro, 1.5 Pro)** | Định dạng Markdown tối ưu cho cửa sổ ngữ cảnh khổng lồ (1M+ tokens), cho phép phân tích toàn bộ repo mà không bỏ sót chi tiết. |
| **DeepSeek (V3 & R1 Reasoning)** | Bổ sung các bước suy luận chuỗi tư duy (Chain-of-Thought), chứng minh tính đúng đắn của đồng bộ hóa (Mutex/Outbox FIFO) và giới hạn độ phức tạp thời gian. |
| **OpenAI (GPT-4o, o1, o3-mini)** | Định dạng thông điệp hệ thống với các cổng kiểm tra 3 bước nghiêm ngặt. |

---

## 💻 Các IDE & Môi Trường Hỗ Trợ

- **Cursor IDE (v0.45+)**: Tương thích hoàn toàn định dạng `.cursor/rules/*.mdc` với tính năng kích hoạt theo đường dẫn file (`**/*ViewModel.kt`, `**/*Dao.kt`, v.v.).
- **Android Studio (Hedgehog đến Ladybug+)**: Nhận diện qua `.github/copilot-instructions.md` hỗ trợ GitHub Copilot & Gemini Code Assist.
- **VS Code**: Nhận diện qua `.github/copilot-instructions.md` hỗ trợ Copilot, Roo Code, và Claude Dev.
- **Google Antigravity & AGY**: Tự động nhận diện qua thư mục toàn cục `~/.gemini/config/skills/kmp-*`.
- **Claude Code CLI & Windsurf**: Nhận diện qua `CLAUDE.md` và `.windsurfrules` kèm các lệnh build/test.

---

## 📄 Bản Quyền (License)

Dự án được phân phối dưới giấy phép [MIT License](../../LICENSE).
