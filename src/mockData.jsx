// USERS
export const users = [
  { id: 1, name: "Hieu",      role: "director",    password: "123" },
  { id: 2, name: "Thang",     role: "manager",     password: "123" },
  { id: 3, name: "Trieu",     role: "staff",       password: "123" },
  { id: 4, name: "Dinh",      role: "participant", password: "123" },
  { id: 5, name: "Phat",      role: "marketing",   password: "123" },
  { id: 6, name: "KhachHang", role: "customer",    password: "123" },
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

// TASKS
export const tasks = [
  { id: 1, eventId: 2, staff: "Trieu", task: "Chuẩn bị âm thanh", done: false },
  { id: 2, eventId: 2, staff: "Trieu", task: "Kiểm tra ánh sáng",  done: true  },
];

// SCRIPTS
export const scripts = [
  { id: 1, eventId: 2, content: "Kịch bản khai mạc", approved: true },
];

// PARTICIPANTS
export const participants = [
  { id: 1, eventId: 2, name: "Nguyễn Văn A", checkedIn: true  },
  { id: 2, eventId: 2, name: "Trần Thị B",   checkedIn: false },
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
  { id: 2, eventId: 3, title: "Làm giàu từ hai bàn tay trắng", status: "Đã đăng" },
  { id: 3, eventId: 1, title: "Cậu bé 12 tuổi tham gia sự kiện", status: "Đã đăng" },
];

// REPORTS
export const reports = [
  { id: 1, eventId: 5, result: "Thành công", revenue: "200 triệu" },
];

// SURVEYS
export const surveys = [
  { id: 1, eventId: 5, feedback: "Rất hài lòng" },
];

// EQUIPMENT
export const equipment = [
  { id: 1, eventId: 4, name: "Máy chiếu", status: "Sẵn sàng"      },
  { id: 2, eventId: 4, name: "Âm thanh",  status: "Đang sử dụng"  },
];

// NOTIFICATIONS
export const notifications = [
  { id: 1, userId: 4, message: "Nhắc nhở: Sự kiện sắp diễn ra" },
];