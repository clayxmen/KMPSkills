# 💎 `kmp-skills` — Công Cụ Universal AI CLI Dành Cho Android Native & Kotlin Multiplatform

[![npm version](https://img.shields.io/npm/v/kmp-skills.svg?style=flat-square)](https://www.npmjs.com/package/kmp-skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/Node-%3E%3D18.0.0-brightgreen.svg?style=flat-square)](https://nodejs.org)
[![Platform Support](https://img.shields.io/badge/Targets-Android_%7C_iOS_%7C_Desktop_%7C_Web_%7C_Server-blueviolet.svg?style=flat-square)](#nền-tảng-hỗ-trợ)

`kmp-skills` là bộ công cụ dòng lệnh (CLI) và giao diện TUI tương tác chuẩn mực doanh nghiệp, trang bị cho **BẤT KỲ** dự án Android Native hoặc Kotlin Multiplatform (KMP/CMP) nào **27 Siêu Kỹ Năng Kiến Trúc, bộ sinh mã nguồn tự động (scaffolding), hệ thống chẩn đoán sức khỏe kiến trúc với tính năng Auto-Fix và trình đọc giáo trình 10 cấp độ chuyên sâu ngay trên terminal**.

Sau khi cài đặt, các trợ lý lập trình AI của bạn (**Cursor, Android Studio, VS Code, Google Antigravity, hoặc Claude Code**) sẽ ngay lập tức thấu hiểu toàn bộ quy ước kiến trúc, ranh giới phân tầng module, cơ chế migration Room DB, mạng Ktor, máy trạng thái MVI và quy chuẩn tối ưu Compose compiler mà không cần hướng dẫn thủ công.

---

## ⚡ Bắt Đầu Nhanh (Trải Nghiệm Tương Tác Trên Console)

Chạy trực tiếp mà không cần cài đặt qua `npx`:

```bash
npx kmp-skills
```

Khi chạy `kmp-skills` không có tham số, terminal sẽ hiển thị **Menu Lập Trình Viên Tương Tác (Interactive Developer Console)**:
- 🚀 **Khởi Tạo Ngữ Cảnh AI (Init)**: Thiết lập bộ luật cho Cursor rules, Copilot instructions, Claude Code và Antigravity.
- 💎 **Sinh Mã Nguồn Kiến Trúc (Generate)**: Tự động scaffold toàn bộ màn hình MVI, Room DAO, Outbox sync và Theme thiết kế.
- 🩺 **Chẩn Đoán Sức Khỏe Kiến Trúc (Doctor)**: Quét phiên bản Gradle, cấu trúc project và tự động sửa lỗi (Auto-Fix) bằng 1 click.
- 📚 **Trình Đọc Giáo Trình Masterclass (Learn)**: Duyệt và đọc toàn bộ 10 học phần KMP thực chiến ngay trong console.
- 🔍 **Tìm Kiếm & Khám Phá Kỹ Năng (Search)**: Tìm kiếm tức thì trong 27 kỹ năng, xem trước nội dung và xuất file.
- 📋 **Xem Danh Mục Kỹ Năng (List)**: Xem 27 kỹ năng được phân bổ theo 10 phân vùng kiến trúc.

### Cài Đặt Toàn Cục (Global NPM)

```bash
npm install -g kmp-skills

# Mở menu điều khiển tương tác bất kỳ lúc nào
kmp-skills

# Quét chẩn đoán và tự động sửa toàn bộ quy tắc AI còn thiếu
kmp-skills doctor --fix

# Sinh nhanh 5 file kiến trúc MVI chuẩn chỉ trong vài giây
kmp-skills g mvi Cart --package com.example.cart --output src/commonMain/kotlin/com/example/cart
```

---

## 🛠️ Hướng Dẫn Sử Dụng Chi Tiết Các Lệnh

### 1. `kmp-skills init`
Khởi tạo hoặc cập nhật các quy tắc AI cho dự án hiện tại với giao diện tương tác:

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
- **Cursor**: `.cursor/rules/*.mdc` (27 file quy tắc độc lập tự động kích hoạt theo định dạng file).
- **Android Studio & VS Code**: `.github/copilot-instructions.md` (nạp ngữ cảnh toàn diện cho GitHub Copilot và Google Gemini Code Assist).
- **Claude Code CLI & Windsurf**: `CLAUDE.md` và `.windsurfrules`.
- **Google Antigravity & AGY**: Đồng bộ trực tiếp 27 kỹ năng vào `~/.gemini/config/skills/kmp-*`.

---

### 2. `kmp-skills generate` (viết tắt: `g`, `gen`)
Tự động sinh mã nguồn kiến trúc chuẩn mực, 100% không cảnh báo (zero-warning):

```bash
# Wizard tương tác chọn loại kiến trúc và đặt tên
kmp-skills generate

# Sinh MVI Feature (gồm UiState, UiIntent, UiEffect, ViewModel, Screen Composable)
kmp-skills g mvi ProductDetail --package com.example.product

# Sinh Room KMP Relational Entity & Flow DAO phản ứng
kmp-skills g room Article --package com.example.database

# Sinh Offline-First Mutation Outbox Sync Engine & Dispatcher
kmp-skills g outbox SyncEngine --package com.example.sync

# Sinh Neobrutalism Design Tokens & Material 3 Dynamic Theme
kmp-skills g theme AppTheme --package com.example.theme
```

---

### 3. `kmp-skills doctor` (viết tắt: `doc`)
Chạy bộ chẩn đoán kiến trúc và kiểm tra môi trường AI trong dự án:

```bash
# Kiểm tra chẩn đoán thông thường
kmp-skills doctor

# Kiểm tra và tự động khôi phục / sinh các quy tắc còn thiếu (Auto-Fix)
kmp-skills doctor --fix
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
- **Cơ Chế Auto-Fix**: Tự động sửa và sinh lại toàn bộ file ngữ cảnh nếu phát hiện thiếu sót.

---

### 4. `kmp-skills learn` (viết tắt: `curriculum`, `c`)
Duyệt và đọc giáo trình chuyên sâu 10 Cấp Độ Kotlin Multiplatform ngay trên terminal:

```bash
# Mở trình đọc giáo trình tương tác
kmp-skills learn

# Đọc thẳng Học Phần 07 (Máy Trạng Thái MVI)
kmp-skills learn 7

# Xem lộ trình tổng quan toàn bộ 10 cấp độ (Curriculum Roadmap)
kmp-skills learn readme
```

---

### 5. `kmp-skills search` (viết tắt: `find`, `s`)
Tìm kiếm mờ (fuzzy search) trong 27 kỹ năng theo từ khóa công nghệ, phân vùng hoặc khái niệm:

```bash
# Mở ô tìm kiếm tương tác
kmp-skills search

# Tìm các kỹ năng liên quan đến Room Database
kmp-skills search room

# Tìm kỹ năng rà soát rò rỉ bộ nhớ và ARC profiling
kmp-skills search memory
```

---

### 6. `kmp-skills list` (viết tắt: `ls`)
Hiển thị toàn bộ danh mục 27 Siêu Kỹ Năng Kiến Trúc được phân chia theo 10 phân vùng chuyên sâu:

```bash
kmp-skills list
```

---

### 7. `kmp-skills inject <tên-skill>`
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
