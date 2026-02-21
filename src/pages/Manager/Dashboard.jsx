import React from 'react';
import { events, tasks } from '../../mockData';
import styles from './Dashboard.module.css';

const ManagerDashboard = () => {
  const done = tasks.filter(t => t.done).length;

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Manager Dashboard</h1>

      <div className={styles.stats}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Sự kiện</div>
          <div className={styles.cardValue}>{events.length}</div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Nhiệm vụ</div>
          <div className={styles.cardValue}>{tasks.length}</div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Hoàn thành</div>
          <div className={styles.cardValue}>{done}</div>
        </div>
      </div>

      <div className={styles.eventList}>
        <h3 style={{ marginBottom: "16px" }}>Danh sách sự kiện</h3>

        {events.map(ev => (
          <div key={ev.id} className={styles.eventItem}>
            <strong>{ev.name}</strong> - {ev.date}
          </div>
        ))}
      </div>

    </div>
  );
};

export default ManagerDashboard;