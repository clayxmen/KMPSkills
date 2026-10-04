# 💎 KMPSkills Assistant — Plugin Dành Cho Android Studio & IntelliJ IDEA

[![Version](https://img.shields.io/badge/Plugin_Version-1.0.0-blue.svg)](#hướng-dẫn-cài-đặt-từ-file-zip)
[![Compatibility](https://img.shields.io/badge/Tương_Thích-Android_Studio_2023.1_%E2%80%93_2024.3+-success.svg)](#các-phiên-bản-android-studio-được-hỗ-trợ)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

**KMPSkills Assistant** là plugin native dành riêng cho **Android Studio** và **IntelliJ IDEA**, trang bị trực tiếp vào môi trường lập trình của bạn **27 Siêu Kỹ Năng Kiến Trúc**, công cụ sinh mã **MVI Feature Scaffolder**, **Room KMP Generator**, giao diện tra cứu **Giáo trình 10 cấp độ** và nút bấm **1-Click nạp quy tắc AI**.

---

## 🚀 Hướng Dẫn Cài Đặt Từ File Zip (Install Plugin from Disk)

Bản cài đặt plugin đã được biên dịch sẵn tại:
```text
plugins/android-studio/build/distributions/kmpskills-android-studio-plugin-1.0.0.zip
```

### Các bước cài đặt:
1. Mở **Android Studio** (hoặc IntelliJ IDEA).
2. Vào **Settings** (`Ctrl+Alt+S` trên Windows/Linux, `Cmd+,` trên macOS).
3. Chọn mục **Plugins** ở thanh menu bên trái.
4. Bấm vào biểu tượng bánh răng (**⚙️**) ở góc trên bên phải và chọn **"Install Plugin from Disk..."**.
5. Trỏ tới đường dẫn file zip:
   ```text
   c:\VPS\KMPSkills\plugins\android-studio\build\distributions\kmpskills-android-studio-plugin-1.0.0.zip
   ```
6. Bấm **OK** / **Apply** và chọn **Restart IDE** khi được yêu cầu.

---

## 🌟 Các Tính Năng Cốt Lõi

### 1. 💎 Cửa Sổ Sidebar Tool Window (KMPSkills)
Bấm vào tab **KMPSkills** ở thanh cạnh phải màn hình Android Studio:
- **Nút ⚡ Inject AI Rules**: Sinh tự động `.github/copilot-instructions.md` và `.cursor/rules/` vào project hiện tại chỉ trong 1 giây.
- **Nút 🔍 Doctor**: Kiểm tra phiên bản thư viện trong `libs.versions.toml`.
- **Tab 27 Skills Catalog**:
  - Tìm kiếm nhanh kỹ năng theo tên (ví dụ: gõ "MVI", "Room", "Ktor", "ARC").
  - Bấm vào kỹ năng để xem tóm tắt chỉ dẫn kiến trúc.
  - **Nút 📋 Copy Directive for AI Chat**: Sao chép chỉ dẫn kiến trúc vào bộ nhớ tạm (Clipboard) để dán vào khung chat GitHub Copilot hoặc Gemini.
- **Tab 10-Level Curriculum**:
  - Tra cứu trực tiếp nội dung 10 cấp độ của bộ giáo trình thực chiến ngay trong IDE.

---

### 2. ⚡ Menu Chuột Phải Sinh Mã Tự Động (Context Menu)
Nhấp chuột phải vào bất kỳ thư mục package nào trong cây thư mục dự án (**Project View**):

#### `KMPSkills > New MVI Feature Screen...`
Nhập tên tính năng (ví dụ: `ProductDetail`, `Cart`, `Profile`) để sinh tức thì 5 file Kotlin 2.x chuẩn mực không lỗi:
1. `<Feature>UiState.kt` (Trạng thái bất biến với `@Immutable` và `ImmutableList`)
2. `<Feature>UiIntent.kt` (Hợp đồng ý định người dùng với `sealed interface`)
3. `<Feature>UiEffect.kt` (Sự kiện dùng một lần qua Channel)
4. `<Feature>ViewModel.kt` (ViewModel MVI hoàn chỉnh với Coroutines Flow)
5. `<Feature>Screen.kt` (Giao diện Compose với State Hoisting)

#### `KMPSkills > New Room KMP Entity & DAO...`
Nhập tên bảng (ví dụ: `Bookmark`, `Article`, `Order`) để sinh:
1. `<Entity>Entity.kt` (Room Entity với khóa chính và mốc thời gian)
2. `<Entity>Dao.kt` (Reactive DAO trả về Coroutine `Flow<List<Entity>>`)

---

### 3. 🔍 Bộ Kiểm Toán Sức Khỏe Kiến Trúc (Architecture Doctor)
Truy cập menu trên cùng: **Tools > KMPSkills > Run Architecture Doctor**:
- Tự động kiểm tra `gradle/libs.versions.toml` đối chiếu với chuẩn:
  - Kotlin (`>= 2.0.0`)
  - Android Gradle Plugin (`>= 8.5.0`)
  - Compose Multiplatform (`>= 1.7.0`)
  - Ktor Client (`>= 3.0.0`)
  - Room Multiplatform (`>= 2.7.0`)
  - Koin DI (`>= 4.0.0`)
- Báo cáo tình trạng kích hoạt của Copilot instructions và Cursor rules.

---

## 🛠️ Biên Dịch Lại Từ Mã Nguồn (Build Plugin)

Nếu bạn có chỉnh sửa mã nguồn plugin và muốn đóng gói lại:

```bash
cd plugins/android-studio
./gradlew buildPlugin
```

File cài đặt mới sẽ được xuất ra tại:
`plugins/android-studio/build/distributions/kmpskills-android-studio-plugin-1.0.0.zip`.

---

## 📱 Các Phiên Bản Android Studio Được Hỗ Trợ
- Android Studio Hedgehog (2023.1)
- Android Studio Iguana (2023.2)
- Android Studio Jellyfish (2023.3)
- Android Studio Koala & Koala Feature Drop (2024.1)
- Android Studio Ladybug & Ladybug Feature Drop (2024.2)
- Android Studio Meerkat & IntelliJ IDEA 2024.3+
