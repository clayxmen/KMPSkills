# Hướng Dẫn Đóng Góp Cho KMPSkills

Cảm ơn bạn đã quan tâm và muốn đóng góp cho dự án **KMPSkills**! Dự án này được xây dựng nhằm cung cấp bản thiết kế kiến trúc chuẩn công nghiệp (Production-Grade Architectural Blueprint) và hệ thống kỹ năng dành cho AI Agent tối tân nhất cho hệ sinh thái Kotlin Multiplatform (KMP) & Compose Multiplatform (CMP).

Để đảm bảo mọi bộ kỹ năng (Skills) và đoạn mã mẫu luôn đạt chuẩn mực của một **Senior Systems Architect** và **Senior Prompt Developer**, mọi đóng góp bắt buộc phải tuân thủ nghiêm ngặt các hướng dẫn dưới đây.

---

## 1. Cơ Chế Triển Khai Kép (Dual Deployment Architecture)

Mỗi bộ kỹ năng trong KMPSkills phục vụ đồng thời hai mục đích cốt lõi:
1. **Nạp Ngữ Cảnh Tự Động Cho AI Agent (Prompt Injection)**: Được các trợ lý lập trình AI (Antigravity, Gemini Code Assist, Claude, Cursor) đọc trực tiếp để tự động hóa quy trình viết code KMP chuẩn xác.
2. **Tài Liệu Tham Chiếu Kiến Trúc Nguồn Mở**: Phục vụ các kỹ sư phần mềm tra cứu, áp dụng tiêu chuẩn kiến trúc cho các dự án thực tế.

### Yêu Cầu Về Nơi Lưu Trữ File
Bất cứ khi nào một bộ kỹ năng mới được thêm vào hoặc chỉnh sửa, nó **BẮT BUỘC** phải được cập nhật ở cả hai đường dẫn:
- **Cấu hình AI Agent Toàn Cục**: `~/.gemini/config/skills/<skill-name>/SKILL.md`
- **Thư mục Dự Án (Showcase)**: `c:\VPS\KMPSkills\skills/<skill-name>/SKILL.md`

---

## 2. Tiêu Chuẩn Kỹ Năng Chuẩn Vàng (Golden Skill Specification)

Mỗi file kỹ năng (`SKILL.md`) phải tuân theo cấu trúc **Bản Mẫu Chuẩn Vàng**. Mọi Pull Request chứa code viết dở, code mô phỏng không chạy được, hoặc thiếu các mục bắt buộc sẽ bị từ chối tự động.

### Cấu Trúc Bắt Buộc

```yaml
---
name: kmp-ten-tinh-nang
description: Tóm tắt súc tích trong 1-3 câu mô tả phạm vi kỹ thuật và mục đích của skill.
---

# Tiêu Đề: Hướng Dẫn Kiến Trúc Chuyên Sâu Cho Kotlin Multiplatform

## Khi Nào Cần Kích Hoạt Kỹ Năng Này
Use this skill whenever:
  1. [Tình huống kích hoạt cụ thể 1]
  2. [Tình huống kích hoạt cụ thể 2]
  3. [Tình huống kích hoạt cụ thể 3]
  4. [Tình huống kích hoạt cụ thể 4]
  5. [Tình huống kích hoạt cụ thể 5]

Do NOT use when:
  1. [Tình huống không nên dùng 1 - chuyển hướng sang skill phù hợp]
  2. [Tình huống không nên dùng 2 - chuyển hướng sang skill phù hợp]
```

### Các Tiêu Chí Chất Lượng Vàng
- **Không Chấp Nhận Code Dở Dang (Zero Stubbed Code)**: Toàn bộ code phải có kiểu dữ liệu đầy đủ, chạy được trên Kotlin 2.x. Nghiêm cấm các bình luận giữ chỗ (`// TODO: triển khai sau`, `// viết code vào đây`, `/* ... */`).
- **Trực Quan Hóa Bằng Sơ Đồ Kiến Trúc**: Mỗi skill bắt buộc phải có ít nhất một **sơ đồ Mermaid** hoàn chỉnh (`graph TD`, `sequenceDiagram`, `classDiagram`, hoặc `flowchart LR`) mô tả luồng dữ liệu hoặc cấu trúc các thành phần.
- **Bảng Nhận Diện & Phòng Tránh Anti-Pattern**: Phải có bảng so sánh song song giữa lỗi sai phổ biến và giải pháp kiến trúc chuẩn:
  ```markdown
  | Lỗi Phổ Biến (Anti-Pattern) | Tại Sao Thất Bại Trong Production | Chuẩn Kiến Trúc Master-Tier |
  | :--- | :--- | :--- |
  | Dùng MutableList trong UiState | Compose compiler không tối ưu recomposition | Sử dụng kotlinx.collections.immutable.ImmutableList |
  ```
- **Xử Lý Triệt Để Đặc Thù Từng Hệ Điều Hành**: Phải nêu rõ giải pháp cho Android (quyền trên Android 14/15, Safe Insets), iOS (vòng lặp bộ nhớ ARC, cầu nối Swift), Desktop (Skiko JVM), và Web (Wasm).

---

## 3. Tiêu Chuẩn Mã Nguồn & Phân Tích Tĩnh (Static Analysis)

Tất cả mã nguồn Kotlin và script Gradle đóng góp vào kho mã nguồn phải vượt qua các cổng kiểm tra nghiêm ngặt:

### Quy Ước Viết Code Kotlin
- **Kotlin 2.x & CMP 1.7+ Hiện Đại**: Sử dụng các tính năng ngôn ngữ mới (`data object`, `@Immutable`, context receivers / context parameters, sealed interfaces).
- **Tính Ổn Định Của Compose (Compose Stability)**: Mọi tham số Composable phải được suy luận là `@Stable` hoặc `@Immutable`. Các tập hợp (Collections) trong trạng thái UI phải dùng `ImmutableList<T>` hoặc `ImmutableSet<T>` từ `kotlinx-collections-immutable`.
- **Cách Ly Hoàn Toàn Tầng Nghiệp Vụ**: Mã nguồn trong `:core:model` và các UseCase không bao giờ được import các thư viện đặc thù nền tảng (`android.*`, `platform.UIKit.*`, `androidx.compose.*`).

### Các Lệnh Kiểm Tra Cần Chạy Trước Khi Tạo PR

```bash
# Kiểm tra định dạng và phong cách code
./gradlew ktlintCheck detekt

# Tự động sửa định dạng theo chuẩn ktlint
./gradlew ktlintFormat

# Chạy toàn bộ unit test trong commonTest
./gradlew check

# Kiểm toán chỉ số Compose Compiler stability metrics
./gradlew assembleRelease -Pplugin:androidx.compose.compiler.plugins.kotlin:reportsDestination=build/compose_metrics
```

---

## 4. Quy Trình Phát Triển & Kiểm Thử

### Bước 1: Tạo Nhánh Mới (Branch)
Tạo nhánh tính năng từ nhánh `main` với tên gọi rõ ràng:
```bash
git checkout -b feature/kmp-ten-tinh-nang-moi
```

### Bước 2: Viết Code & Biên Soạn Kỹ Năng
1. Viết code trong các module cốt lõi tương ứng tại `c:\VPS\KMPSkills\`.
2. Viết kiểm thử tự động trong `commonTest` sử dụng **CashApp Turbine** để kiểm tra các luồng Flow và dùng in-memory fakes.
3. Soạn thảo file `SKILL.md` hoàn chỉnh theo Bản Mẫu Chuẩn Vàng.
4. Triển khai file skill đồng thời vào thư mục toàn cục: `~/.gemini/config/skills/<skill-name>/SKILL.md`.

### Bước 3: Xác Minh Bằng Kiểm Thử Tự Động
Đảm bảo toàn bộ kiểm thử và kiểm tra ảnh chụp giao diện đều vượt qua:
```bash
# Chạy bộ unit test
./gradlew :core:network:testDebugUnitTest
./gradlew :core:database:testDebugUnitTest

# Kiểm tra sai lệch giao diện với Roborazzi (nếu có chỉnh sửa UI)
./gradlew verifyRoborazziDebug
```

---

## 5. Quy Ước Đặt Tên Commit & Tạo Pull Request

Chúng tôi áp dụng chuẩn **Conventional Commits**:

```
<loại>(<phạm vi>): <mô tả ngắn gọn>

[nội dung chi tiết - nếu có]

[thông tin liên kết issues - nếu có]
```

### Các Loại Commit Được Chấp Nhận
- `feat`: Thêm một tính năng kiến trúc mới hoặc bộ kỹ năng mới.
- `fix`: Sửa lỗi trong module hoặc chỉnh sửa lỗi trong tài liệu kỹ năng.
- `refactor`: Tái cấu trúc mã nguồn mà không làm thay đổi hành vi nghiệp vụ.
- `perf`: Tối ưu hóa hiệu năng (ví dụ: giảm recomposition hoặc nén dung lượng binary).
- `docs`: Cập nhật tài liệu, bổ sung bản dịch song ngữ hoặc cập nhật README.
- `test`: Bổ sung hoặc chỉnh sửa unit test, integration test, hoặc screenshot test.

### Ví Dụ Hợp Lệ
- `feat(skills): add kmp-ai-gemini-on-device skill specification`
- `fix(room): resolve iOS bundled SQLite symbol collision in 2.7.0`
- `docs(arch): update offline sync outbox sequence diagram`

---

## 6. Quy Tắc Ứng Xử Cộng Đồng (Code of Conduct)

Khi tham gia vào dự án KMPSkills, bạn đồng ý xây dựng một môi trường văn minh, tôn trọng và hợp tác. Hãy luôn đối xử tử tế với các cộng tác viên, đưa ra các nhận xét mang tính xây dựng trên các Pull Request và cùng nhau giữ vững chuẩn mực kỹ thuật cao nhất.

Nếu có bất kỳ thắc mắc hoặc thảo luận nào, hãy tạo một thảo luận trên GitHub Discussions hoặc liên hệ trực tiếp với nhóm bảo trì cốt lõi.
