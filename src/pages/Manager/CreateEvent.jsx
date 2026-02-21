import { useState } from "react";
import styles from "./CreateEvent.module.css";

/* ===== DỮ LIỆU MẪU ===== */
const sampleEvents = [
  {
    id: 1,
    name: "Hội thảo Công nghệ 2026",
    date: "2026-03-15",
    location: "TP. Hồ Chí Minh",
    capacity: 300,
    description: "Hội thảo về xu hướng công nghệ AI và Blockchain"
  },
  {
    id: 2,
    name: "Lễ khai giảng năm học mới",
    date: "2026-09-05",
    location: "Hà Nội",
    capacity: 800,
    description: "Sự kiện chào đón tân sinh viên"
  }
];

export default function CreateEvent() {

  const [event, setEvent] = useState({
    name: "",
    date: "",
    location: "",
    capacity: "",
    description: ""
  });

  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem("events");
    if (stored) return JSON.parse(stored);
    return sampleEvents; // nếu chưa có dữ liệu thì dùng mẫu
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!event.name || !event.date) return;

    const newEvent = { ...event, id: Date.now() };
    const updated = [...events, newEvent];

    setEvents(updated);
    localStorage.setItem("events", JSON.stringify(updated));

    setEvent({
      name: "",
      date: "",
      location: "",
      capacity: "",
      description: ""
    });
  };

  const handleDelete = (id) => {
    const filtered = events.filter(ev => ev.id !== id);
    setEvents(filtered);
    localStorage.setItem("events", JSON.stringify(filtered));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quản lý sự kiện</h2>

      <div className={styles.layout}>

        {/* ===== FORM ===== */}
        <form onSubmit={handleSubmit} className={styles.formCard}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Tên sự kiện</label>
            <input
              className={styles.input}
              name="name"
              value={event.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Ngày tổ chức</label>
            <input
              type="date"
              className={styles.input}
              name="date"
              value={event.date}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Địa điểm</label>
            <input
              className={styles.input}
              name="location"
              value={event.location}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Số lượng tối đa</label>
            <input
              type="number"
              className={styles.input}
              name="capacity"
              value={event.capacity}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Mô tả</label>
            <textarea
              className={styles.textarea}
              name="description"
              value={event.description}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles.button}>
            Tạo sự kiện
          </button>
        </form>

        {/* ===== DANH SÁCH ===== */}
        <div className={styles.listCard}>
          <div className={styles.listHeader}>
            Danh sách sự kiện ({events.length})
          </div>

          {events.map(ev => (
            <div key={ev.id} className={styles.eventItem}>
              <div className={styles.eventTop}>
                <div className={styles.eventName}>{ev.name}</div>
                <div className={styles.eventDate}>{ev.date}</div>
              </div>

              <div className={styles.eventMeta}>
                📍 {ev.location} | 👥 {ev.capacity} người
              </div>

              <button
                onClick={() => handleDelete(ev.id)}
                className={styles.deleteBtn}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}