import styles from "./Progress.module.css";
import MainLayout from "../../layouts/MainLayout";

export default function Progress() {
  const tasks = [
    { name: "Chuẩn bị sân khấu", progress: 80 },
    { name: "In tài liệu", progress: 60 },
    { name: "Gửi email mời", progress: 100 }
  ];

  return (
    <MainLayout>
      <div className={styles.container}>
        <h2 className={styles.title}>Tiến độ triển khai sự kiện</h2>

        {tasks.map((task, index) => (
          <div key={index} className={styles.card}>

            <div className={styles.taskHeader}>
              <span className={styles.taskName}>{task.name}</span>
              <span className={styles.percent}>{task.progress}%</span>
            </div>

            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${task.progress}%` }}
              />
            </div>

          </div>
        ))}
      </div>
    </MainLayout>
  );
}