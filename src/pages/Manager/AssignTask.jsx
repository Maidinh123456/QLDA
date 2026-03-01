import { useState } from "react";
import styles from "./AssignTask.module.css";
import MainLayout from "../../layouts/MainLayout";
import { events, tasks as defaultTasks, staffMembers } from "../../mockData";

export default function AssignTask() {

  const [form, setForm] = useState({
    eventId: "",
    task: "",
    staff: "",
    deadline: ""
  });

  const [assignments, setAssignments] = useState(() => {
    const stored = localStorage.getItem("assignments");
    return stored ? JSON.parse(stored) : [];
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.eventId || !form.task || !form.staff || !form.deadline)
      return;

    const newAssignment = {
      id: Date.now(),
      ...form
    };

    const updated = [...assignments, newAssignment];

    setAssignments(updated);
    localStorage.setItem("assignments", JSON.stringify(updated));

    setForm({
      eventId: "",
      task: "",
      staff: "",
      deadline: ""
    });
  };

  const handleDelete = (id) => {
    const filtered = assignments.filter(a => a.id !== id);
    setAssignments(filtered);
    localStorage.setItem("assignments", JSON.stringify(filtered));
  };

  const filteredTasks = defaultTasks.filter(
    t => t.eventId === Number(form.eventId)
  );

  const staffList = staffMembers;

  return (
    <MainLayout>
      <div className={styles.container}>
        <h2 className={styles.title}>Phân công nhiệm vụ</h2>

        <div className={styles.layout}>

          <form onSubmit={handleSubmit} className={styles.formCard}>

            <div className={styles.formGroup}>
              <label className={styles.label}>Chọn sự kiện</label>
              <select
                className={styles.select}
                name="eventId"
                value={form.eventId}
                onChange={handleChange}
              >
                <option value="">Chọn sự kiện</option>
                {events.map(ev => (
                  <option key={ev.id} value={ev.id}>
                    {ev.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Chọn nhiệm vụ</label>
              <select
                className={styles.select}
                name="task"
                value={form.task}
                onChange={handleChange}
                disabled={!form.eventId}
              >
                <option value="">Chọn nhiệm vụ</option>
                {filteredTasks.map(t => (
                  <option key={t.id} value={t.task}>
                    {t.task}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Chọn nhân viên</label>
              <select
                className={styles.select}
                name="staff"
                value={form.staff}
                onChange={handleChange}
              >
                <option value="">Chọn nhân viên</option>
                {staffList.map(st => (
                  <option key={st.id} value={st.name}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Hạn hoàn thành</label>
              <input
                type="date"
                className={styles.input}
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className={styles.button}>
              Giao nhiệm vụ
            </button>

          </form>

          <div className={styles.listCard}>
            <div className={styles.listHeader}>
              Danh sách phân công ({assignments.length})
            </div>

            {assignments.map(a => {
              const eventName =
                events.find(ev => ev.id === Number(a.eventId))?.name;

              return (
                <div key={a.id} className={styles.taskItem}>
                  <div className={styles.taskTop}>
                    <div className={styles.taskName}>{a.task}</div>
                    <div className={styles.deadline}>{a.deadline}</div>
                  </div>

                  <div className={styles.staff}>
                    👤 {a.staff}
                  </div>

                  <div>
                    📌 {eventName}
                  </div>

                  <button
                    onClick={() => handleDelete(a.id)}
                    className={styles.deleteBtn}
                  >
                    Xóa
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </MainLayout>
  );
}