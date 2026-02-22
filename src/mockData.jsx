// USERS
export const users = [
  { id: 1, name: "Hieu", role: "director", password: "123" },
  { id: 2, name: "Thang", role: "manager", password: "123" },
  { id: 3, name: "Trieu", role: "staff", password: "123" },
  { id: 4, name: "Dinh", role: "participant", password: "123" },
  { id: 5, name: "Phat", role: "marketing", password: "123" },
  { id: 6, name: "KhachHang", role: "customer", password: "123" }
];

// EVENTS
export const events = [
  {
    id: 1,
    name: "Hội thảo AI 2025",
    client: "Đại học Công nghệ",
    date: "20/05/2025",
    location: "Hà Nội",
    speaker: "TS. Nguyễn Văn A",
    budget: 50000000,
    status: "Đang chuẩn bị",
    approved: false,
    progress: 60,
    participants: 120,
    ticketsSold: 80,
    marketingStatus: "Đang chạy quảng bá"
  },
  {
    id: 2,
    name: "Gala Sinh viên",
    client: "Đại học Kinh tế",
    date: "10/06/2025",
    location: "TP.HCM",
    speaker: "MC Trấn Thành",
    budget: 80000000,
    status: "Đang triển khai",
    approved: true,
    progress: 80,
    participants: 300,
    ticketsSold: 250,
    marketingStatus: "Đã hoàn tất"
  },
  {
    id: 3,
    name: "Workshop Khởi nghiệp",
    client: "Startup Hub",
    date: "25/06/2025",
    location: "Đà Nẵng",
    speaker: "CEO Nguyễn Minh",
    budget: 30000000,
    status: "Chờ phê duyệt",
    approved: false,
    progress: 20,
    participants: 60,
    ticketsSold: 30,
    marketingStatus: "Chưa triển khai"
  },
  {
    id: 4,
    name: "Triển lãm Công nghệ",
    client: "Tech Group",
    date: "15/07/2025",
    location: "Hà Nội",
    speaker: "Nhiều diễn giả",
    budget: 120000000,
    status: "Đang chuẩn bị",
    approved: true,
    progress: 40,
    participants: 500,
    ticketsSold: 200,
    marketingStatus: "Đang quảng bá"
  },
  {
    id: 5,
    name: "Ngày hội Tuyển dụng",
    client: "FPT Software",
    date: "01/08/2025",
    location: "TP.HCM",
    speaker: "HR Manager",
    budget: 60000000,
    status: "Chưa bắt đầu",
    approved: true,
    progress: 10,
    participants: 150,
    ticketsSold: 70,
    marketingStatus: "Đang chạy ads"
  }
];

// TASKS (đồng bộ staff name)
export const tasks = [
  { id: 1, eventId: 1, staff: "Trieu", task: "Chuẩn bị âm thanh", done: false },
  { id: 2, eventId: 1, staff: "Trieu", task: "Kiểm tra ánh sáng", done: true },
  { id: 3, eventId: 2, staff: "Trieu", task: "Sắp xếp sân khấu", done: true },
  { id: 4, eventId: 2, staff: "Trieu", task: "Tổng duyệt chương trình", done: false },
  { id: 5, eventId: 3, staff: "Trieu", task: "Chuẩn bị bàn ghế", done: false },
  { id: 6, eventId: 4, staff: "Trieu", task: "Kiểm tra màn hình LED", done: false }
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
  { id: 1, eventId: 1, name: "Nguyễn Văn A", checkedIn: true },
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

// TICKETS (đổi sang eventId cho chuẩn)
export const tickets = [
  { id: 1, participantId: 1, eventId: 1, paid: true },
  { id: 2, participantId: 2, eventId: 1, paid: false }
];

// MARKETING CONTENT
export const marketingContent = [
  { id: 1, eventId: 1, title: "Poster AI 2025", status: "Đã đăng" }
];

// REPORTS (đổi sang eventId)
export const reports = [
  { id: 1, eventId: 2, event: "Gala Sinh viên", result: "Thành công", revenue: "200 triệu", summary: "Tỷ lệ tham dự 85%, phản hồi tốt." },
  { id: 2, eventId: 1, event: "Hội thảo AI 2025", result: "Đạt kỳ vọng", revenue: "120 triệu", summary: "Nội dung chuyên sâu, cần cải thiện âm thanh khu vực B." },
  { id: 3, eventId: 4, event: "Triển lãm Công nghệ", result: "Chưa đạt", revenue: "90 triệu", summary: "Một số gian hàng thiếu vật tư, cần checklist rõ ràng hơn." }
];

// SURVEYS
export const surveys = [
  { id: 1, eventId: 1, feedback: "Rất hài lòng" }
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
  { id: 1, userId: 4, message: "Nhắc nhở: Sự kiện bắt đầu sau 1 ngày" }
];
