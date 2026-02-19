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
    date: "20/05/2025",
    location: "Hà Nội",
    status: "Đang chuẩn bị",
    approved: false,
    progress: 60
  },
  {
    id: 2,
    name: "Gala Sinh viên",
    date: "10/06/2025",
    location: "TP.HCM",
    status: "Đang triển khai",
    approved: true,
    progress: 80
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
