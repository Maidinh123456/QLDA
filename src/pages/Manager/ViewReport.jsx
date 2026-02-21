import styles from "./ViewReport.module.css";

export default function ViewReport() {
  const total = 520;
  const attended = 480;
  const absent = 40;

  const attendPercent = (attended / total) * 100;
  const absentPercent = (absent / total) * 100;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Báo cáo tổng kết sự kiện</h2>

      <div className={styles.grid}>

        <div className={`${styles.card} ${styles.blue}`}>
          <div className={styles.label}>Tổng đăng ký</div>
          <div className={styles.value}>{total}</div>
        </div>

        <div className={`${styles.card} ${styles.green}`}>
          <div className={styles.label}>
            Tham dự thực tế ({attendPercent.toFixed(1)}%)
          </div>
          <div className={styles.value}>{attended}</div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${attendPercent}%` }}
            />
          </div>
        </div>

        <div className={`${styles.card} ${styles.red}`}>
          <div className={styles.label}>
            Vắng mặt ({absentPercent.toFixed(1)}%)
          </div>
          <div className={styles.value}>{absent}</div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${absentPercent}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}