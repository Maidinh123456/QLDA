import { useState } from "react";
import styles from "./AssignTask.module.css";

/* ===== DỮ LIỆU MẪU ===== */
const sampleTasks = [
  {
    id: 1,
    name: "Chuẩn bị sân khấu",
    staff: "Nguyễn Văn A",
    deadline: "2026-03-10"
  },
  {
    id: 2,
    name: "Thiết kế poster",
    staff: "Lê Thị C",
    deadline: "2026-03-05"
  }
];

export default function AssignTask() {

  const [task, setTask] = useState({
    name: "",
    staff: "",
    deadline: ""
  });

  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : sampleTasks;
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.name || !task.staff || !task.deadline) return;

    const newTask = {
      ...task,
      id: Date.now()
    };

    const updated = [...tasks, newTask];

    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));

    setTask({
      name: "",
      staff: "",
      deadline: ""
    });
  };

  const handleDelete = (id) => {
    const filtered = tasks.filter(t => t.id !== id);
    setTasks(filtered);
    localStorage.setItem("tasks", JSON.stringify(filtered));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Phân công nhiệm vụ</h2>

      <div className={styles.layout}>

        {/* ===== FORM ===== */}
        <form onSubmit={handleSubmit} className={styles.formCard}>

          <div className={styles.formGroup}>
            <label className={styles.label}>Tên nhiệm vụ</label>
            <input
              className={styles.input}
              name="name"
              value={task.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Chọn nhân viên</label>
            <select
              className={styles.select}
              name="staff"
              value={task.staff}
              onChange={handleChange}
            >
              <option value="">Chọn nhân viên</option>
              <option value="Nguyễn Văn A">Nguyễn Văn A</option>
              <option value="Trần Văn B">Trần Văn B</option>
              <option value="Lê Thị C">Lê Thị C</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Hạn hoàn thành</label>
            <input
              type="date"
              className={styles.input}
              name="deadline"
              value={task.deadline}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles.button}>
            Giao nhiệm vụ
          </button>

        </form>

        {/* ===== DANH SÁCH ===== */}
        <div className={styles.listCard}>
          <div className={styles.listHeader}>
            Danh sách nhiệm vụ ({tasks.length})
          </div>

          {tasks.map(t => (
            <div key={t.id} className={styles.taskItem}>
              <div className={styles.taskTop}>
                <div className={styles.taskName}>{t.name}</div>
                <div className={styles.deadline}>{t.deadline}</div>
              </div>

              <div className={styles.staff}>
                👤 {t.staff}
              </div>

              <button
                onClick={() => handleDelete(t.id)}
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