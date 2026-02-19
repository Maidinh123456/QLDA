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
  { id: 2, eventId: 1, staff: "Trieu", task: "Kiểm tra ánh sáng", done: true }
];

// SCRIPTS
export const scripts = [
  { id: 1, eventId: 1, content: "Kịch bản khai mạc", approved: false }
];

// PARTICIPANTS
export const participants = [
  { id: 1, eventId: 1, name: "Nguyễn Văn A", checkedIn: true },
  { id: 2, eventId: 1, name: "Trần Thị B", checkedIn: false }
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
  { id: 1, eventId: 2, result: "Thành công", revenue: "200 triệu" }
];

// SURVEYS
export const surveys = [
  { id: 1, eventId: 1, feedback: "Rất hài lòng" }
];

// EQUIPMENT
export const equipment = [
  { id: 1, eventId: 1, name: "Máy chiếu", status: "Sẵn sàng" },
  { id: 2, eventId: 1, name: "Âm thanh", status: "Đang kiểm tra" }
];

// NOTIFICATIONS
export const notifications = [
  { id: 1, userId: 4, message: "Nhắc nhở: Sự kiện bắt đầu sau 1 ngày" }
];
