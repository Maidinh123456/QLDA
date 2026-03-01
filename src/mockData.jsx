// USERS
export const users = [
  { id: 1, username: "Hieu", role: "director", password: "123" },
  { id: 2, username: "Thang", role: "manager", password: "123" },
  { id: 3, username: "Trieu", role: "staff", password: "123" },
  { id: 4, username: "Dinh", role: "participant", password: "123" },
  { id: 5, username: "Phat", role: "marketing", password: "123" },
  { id: 6, username: "KhachHang", role: "customer", password: "123" }
];
// STAFF LIST (nhân viên)
export const staffMembers = [
  { id: 1, name: "Võ Hải Triệu" },
  { id: 2, name: "Nguyễn Văn Hải" },
  { id: 3, name: "Trần Thị Linh" },
  { id: 4, name: "Phạm Minh An" }
];
// ── HELPER: tạo hàng ghế ───────────────────────────────────────────────────
// status: "available" | "taken" | "vip"
function makeRow(row, total, takenIndexes = [], vipIndexes = []) {
  return Array.from({ length: total }, (_, i) => {
    const seatNum = i + 1;
    const id = `${row}${seatNum}`;
    let status = "available";
    if (takenIndexes.includes(seatNum)) status = "taken";
    if (vipIndexes.includes(seatNum))   status = "vip";
    return { id, row, number: seatNum, status };
  });
}

// ── SEAT MAPS ──────────────────────────────────────────────────────────────
// Event 2 – Gala Sinh viên (300 chỗ, ~150 đã bán) → 6 hàng x 10 ghế
const seatsEvent2 = [
  ...makeRow("A", 10, [1,2,3,4,5,6,7,8],     [9,10]),
  ...makeRow("B", 10, [1,3,5,7,9],            []),
  ...makeRow("C", 10, [2,4,6,8,10],           []),
  ...makeRow("D", 10, [1,2,4],                []),
  ...makeRow("E", 10, [3,7],                  []),
  ...makeRow("F", 10, [],                     []),
];

// Event 3 – Workshop Khởi nghiệp (60 chỗ, gần đầy) → 4 hàng x 8 ghế
const seatsEvent3 = [
  ...makeRow("A", 8, [1,2,3,4,5,6,7,8], []),
  ...makeRow("B", 8, [1,2,3,4,5,6,7],   []),
  ...makeRow("C", 8, [1,2,3,4,5],       []),
  ...makeRow("D", 8, [1,2],             []),
];

// Event 4 – Triển lãm Công nghệ (500 chỗ, sold out) → 5 hàng x 10 ghế
const seatsEvent4 = [
  ...makeRow("A", 10, [1,2,3,4,5,6,7,8,9,10], []),
  ...makeRow("B", 10, [1,2,3,4,5,6,7,8,9,10], []),
  ...makeRow("C", 10, [1,2,3,4,5,6,7,8,9,10], []),
  ...makeRow("D", 10, [1,2,3,4,5,6,7,8,9,10], []),
  ...makeRow("E", 10, [1,2,3,4,5,6,7,8,9,10], []),
];

// Event 5 – Ngày hội Tuyển dụng (hoàn thành) → 5 hàng x 10 ghế, đầy hết
const seatsEvent5 = [
  ...makeRow("A", 10, [1,2,3,4,5,6,7,8,9,10], []),
  ...makeRow("B", 10, [1,2,3,4,5,6,7,8,9,10], []),
  ...makeRow("C", 10, [1,2,3,4,5,6,7,8,9,10], []),
  ...makeRow("D", 10, [1,2,3,4,5,6,7,8,9,10], []),
  ...makeRow("E", 10, [1,2,3,4,5,6,7,8,9,10], []),
];

// EVENTS
// price = 0  → sự kiện miễn phí (bỏ qua bước chọn ghế, không qua trang payment)
// price > 0  → sự kiện có phí   (bắt buộc chọn ghế, chuyển sang payment)
export const events = [
  {
    id: 1,
    name: "Hội thảo AI 2025",
    client: "Đại học Công nghệ",
    date: "20/05/2025 - 14:00",
    location: "Hà Nội",
    speaker: "TS. Nguyễn Văn A",
    budget: 50000000,
    price: 0,                      // ✅ Miễn phí
    status: "Chờ phê duyệt",
    approved: false,
    progress: 10,
    participants: 120,
    ticketsSold: 0,
    marketingStatus: "Chưa triển khai",
    seats: [],
  },
  {
    id: 2,
    name: "Gala Sinh viên",
    client: "Đại học Kinh tế",
    date: "10/06/2025 - 17:00",
    location: "TP.HCM",
    speaker: "MC Nguyễn Văn B",
    budget: 80000000,
    price: 150000,                 // 💰 150,000 VNĐ/vé
    status: "Đang chuẩn bị",
    approved: true,
    progress: 40,
    participants: 300,
    ticketsSold: 150,
    marketingStatus: "Đang triển khai",
    seats: seatsEvent2,
  },
  {
    id: 3,
    name: "Workshop Khởi nghiệp",
    client: "Startup Hub",
    date: "25/06/2025 - 10:00",
    location: "Đà Nẵng",
    speaker: "CEO Nguyễn Minh D",
    budget: 30000000,
    price: 200000,                 // 💰 200,000 VNĐ/vé
    status: "Đang chuẩn bị",
    approved: true,
    progress: 60,
    participants: 60,
    ticketsSold: 52,
    marketingStatus: "Hoàn thành",
    seats: seatsEvent3,
  },
  {
    id: 4,
    name: "Triển lãm Công nghệ",
    client: "Tech Group",
    date: "15/07/2025 - 08:00",
    location: "Hà Nội",
    speaker: "Nguyễn Manh T – Chuyên gia AI & Chuyển đổi số",
    budget: 120000000,
    price: 0,                      // ✅ Miễn phí
    status: "Đang diễn ra",
    approved: true,
    progress: 90,
    participants: 500,
    ticketsSold: 500,
    marketingStatus: "Hoàn thành",
    seats: seatsEvent4,
  },
  {
    id: 5,
    name: "Ngày hội Tuyển dụng",
    client: "FPT Software",
    date: "01/08/2025 - 13:00",
    location: "TP.HCM",
    speaker: "HR Manager",
    budget: 60000000,
    price: 100000,                 // 💰 100,000 VNĐ/vé
    status: "Hoàn thành",
    approved: true,
    progress: 100,
    participants: 150,
    ticketsSold: 150,
    marketingStatus: "Hoàn thành",
    seats: seatsEvent5,
  },
];

// TASKS (đồng bộ staff name)
export const tasks = [
  { id: 1, eventId: 1, staff: "Trieu", task: "Chuẩn bị âm thanh", done: false },
  { id: 2, eventId: 1, staff: "Trieu", task: "Kiểm tra ánh sáng", done: true },
  { id: 3, eventId: 2, staff: "Trieu", task: "Sắp xếp sân khấu", done: true },
  { id: 4, eventId: 2, staff: "Trieu", task: "Tổng duyệt chương trình", done: false },
  { id: 5, eventId: 3, staff: "Trieu", task: "Chuẩn bị bàn ghế", done: false },
  { id: 6, eventId: 4, staff: "Trieu", task: "Kiểm tra màn hình LED", done: false },

  // Hải
  { id: 7, eventId: 1, staff: "Hải", task: "Kiểm tra micro", done: false },
  { id: 8, eventId: 2, staff: "Hải", task: "Trang trí sân khấu", done: true },
  { id: 9, eventId: 3, staff: "Hải", task: "Chuẩn bị nước uống", done: false },
  { id: 10, eventId: 4, staff: "Hải", task: "Hỗ trợ check-in", done: false },

  // Linh
  { id: 11, eventId: 1, staff: "Linh", task: "Chuẩn bị tài liệu", done: true },
  { id: 12, eventId: 2, staff: "Linh", task: "Hướng dẫn khách mời", done: false },
  { id: 13, eventId: 3, staff: "Linh", task: "Sắp xếp bàn đăng ký", done: false },
  { id: 14, eventId: 4, staff: "Linh", task: "Phát thẻ tham dự", done: false },

  // An
  { id: 15, eventId: 1, staff: "An", task: "Quay video sự kiện", done: false },
  { id: 16, eventId: 2, staff: "An", task: "Chụp ảnh sự kiện", done: true },
  { id: 17, eventId: 3, staff: "An", task: "Kiểm tra wifi", done: false },
  { id: 18, eventId: 4, staff: "An", task: "Hỗ trợ kỹ thuật", done: false }
];

// SCRIPTS
export const scripts = [
  { id: 1, eventId: 1, content: "08:30 - Khai mạc, giới thiệu chương trình", approved: false },
  { id: 2, eventId: 1, content: "09:00 - Keynote: Xu hướng AI 2025", approved: false },
  { id: 3, eventId: 2, content: "18:00 - Đón khách, check-in, phát thẻ", approved: true },
  { id: 4, eventId: 2, content: "19:00 - Tiết mục văn nghệ mở màn", approved: true },
  { id: 5, eventId: 3, content: "08:00 - Workshop: Đặt vấn đề & mục tiêu", approved: false }
];


// PARTICIPANTS
export const participants = [
  { id: 1, eventId: 1, name: "Nguyễn Mai Đình", checkedIn: true },
  { id: 2, eventId: 1, name: "Trần Thị B", checkedIn: false },
  { id: 3, eventId: 1, name: "Lê Quốc C", checkedIn: true },
  { id: 4, eventId: 2, name: "Phạm Thị D", checkedIn: true },
  { id: 5, eventId: 2, name: "Hoàng Văn E", checkedIn: false },
  { id: 6, eventId: 2, name: "Đỗ Minh F", checkedIn: false },
  { id: 7, eventId: 3, name: "Ngô Hồng G", checkedIn: false },
  { id: 8, eventId: 3, name: "Vũ Thị H", checkedIn: true },
  { id: 9, eventId: 4, name: "Phan Quốc I", checkedIn: false },
  { id: 10, eventId: 4, name: "Trương Thị K", checkedIn: false },
  { id: 11, eventId: 5, name: "Dương Văn L", checkedIn: false }
];

// TICKETS
// ✅ SỬA PHẦN NÀY
export const tickets = [
  {
    id: 1,
    participantId: 4,
    eventId: 2,        // Gala Sinh viên — "Đang chuẩn bị" → ✅ CÓ THỂ hủy/chuyển
    seats: [{ seat: "C5", price: 150000 }, { seat: "C7", price: 150000 }],
    paid: false,
  },
  {
    id: 2,
    participantId: 4,
    eventId: 5,        // Ngày hội Tuyển dụng — "Hoàn thành" → ❌ KHÔNG THỂ hủy/chuyển
    seats: [{ seat: "B3", price: 100000 }],
    paid: true,
  },
];

// MARKETING CONTENT
export const marketingContent = [
  { id: 1, eventId: 2, title: "Poster Gala Sinh viên", status: "Đã đăng" },
];

// REPORTS (đổi sang eventId)
export const reports = [
  { id: 1, eventId: 2, event: "Gala Sinh viên", result: "Thành công", revenue: "200 triệu", summary: "Tỷ lệ tham dự 85%, phản hồi tốt." },
  { id: 2, eventId: 1, event: "Hội thảo AI 2025", result: "Đạt kỳ vọng", revenue: "120 triệu", summary: "Nội dung chuyên sâu, cần cải thiện âm thanh khu vực B." },
  { id: 3, eventId: 4, event: "Triển lãm Công nghệ", result: "Chưa đạt", revenue: "90 triệu", summary: "Một số gian hàng thiếu vật tư, cần checklist rõ ràng hơn." }
];

// SURVEYS
export const surveys = [
  { id: 1, eventId: 5, feedback: "Rất hài lòng" },
];

// EQUIPMENT
export const equipment = [
  { id: 1, eventId: 1, name: "Máy chiếu", status: "Sẵn sàng" },
  { id: 2, eventId: 1, name: "Âm thanh", status: "Đang sử dụng" },
  { id: 3, eventId: 1, name: "Đèn sân khấu", status: "Hỏng" },
  { id: 4, eventId: 2, name: "Micro không dây", status: "Đang sử dụng" },
  { id: 5, eventId: 2, name: "Màn hình LED", status: "Sẵn sàng" },
  { id: 6, eventId: 3, name: "Bảng viết", status: "Sẵn sàng" },
  { id: 7, eventId: 4, name: "Hệ thống âm thanh", status: "Đang sử dụng" },
  { id: 8, eventId: 5, name: "Kiosk check-in", status: "Hỏng" }
];

// NOTIFICATIONS
export const notifications = [
  { id: 1, userId: 4, message: "Nhắc nhở: Sự kiện sắp diễn ra" },
];