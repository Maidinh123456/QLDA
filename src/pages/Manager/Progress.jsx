import { useState, useMemo } from "react";
import MainLayout from "../../layouts/MainLayout";
import { events, tasks } from "../../mockData";
import styles from "./Progress.module.css";

export default function Progress() {
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || "");

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => t.eventId === Number(selectedEventId));
  }, [selectedEventId]);

  const total   = filteredTasks.length;
  const done    = filteredTasks.filter(t => t.done).length;
  const pending = total - done;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const selectedEvent = events.find(e => e.id === Number(selectedEventId));

  const getColor = () => {
    if (percent === 100) return { from:"#10b981", to:"#059669", text:"#059669", bg:"#ecfdf5", border:"#a7f3d0" };
    if (percent >= 60)  return { from:"#6366f1", to:"#8b5cf6", text:"#6366f1", bg:"#eef2ff", border:"#c7d2fe" };
    if (percent >= 30)  return { from:"#f59e0b", to:"#f97316", text:"#d97706", bg:"#fef3c7", border:"#fde68a" };
    return               { from:"#ef4444", to:"#f43f5e",  text:"#dc2626", bg:"#fef2f2", border:"#fecaca" };
  };
  const c = getColor();

  return (
    <MainLayout role="manager">
      <div className={styles.container}>

        {/* ── HEADER ── */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>📊</div>
          <div>
            <h2 className={styles.title}>Theo dõi tiến độ triển khai</h2>
            <p className={styles.subtitle}>Giám sát nhiệm vụ và đảm bảo công việc đúng kế hoạch</p>
          </div>
        </div>

        {/* ── CHỌN SỰ KIỆN ── */}
        <div className={styles.selectBox}>
          <label className={styles.selectLabel}>🗂 Chọn sự kiện</label>
          <div className={styles.selectWrap}>
            <select
              value={selectedEventId}
              onChange={e => setSelectedEventId(e.target.value)}
              className={styles.select}
            >
              {events.map(ev => (
                <option key={ev.id} value={ev.id}>{ev.name}</option>
              ))}
            </select>
            <span className={styles.selectArrow}>▾</span>
          </div>
        </div>

        {/* ── SUMMARY CARD ── */}
        {selectedEvent && (
          <div className={styles.summaryCard}>
            <div className={styles.summaryTop}>
              <div className={styles.summaryInfo}>
                <div className={styles.summaryBadges}>
                  <span className={styles.badge} style={{ color:c.text, background:c.bg, borderColor:c.border }}>
                    {percent === 100 ? "✅ Hoàn thành" : percent >= 60 ? "🔵 Đang tiến hành" : percent >= 30 ? "🟡 Cần chú ý" : "🔴 Chậm tiến độ"}
                  </span>
                  <span className={styles.badgeGray}>📅 {selectedEvent.date}</span>
                  {selectedEvent.location && <span className={styles.badgeGray}>📍 {selectedEvent.location}</span>}
                </div>
                <h3 className={styles.summaryName}>{selectedEvent.name}</h3>
              </div>
              <div className={styles.percentRing} style={{ "--pct":percent, "--from":c.from, "--to":c.to }}>
                <span className={styles.percentNum} style={{ color:c.text }}>{percent}%</span>
              </div>
            </div>

            <div className={styles.barTrack}>
              <div className={styles.barFill}
                style={{ width:`${percent}%`, background:`linear-gradient(90deg,${c.from},${c.to})` }} />
            </div>

            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <span className={styles.statNum}>{total}</span>
                <span className={styles.statLabel}>Tổng nhiệm vụ</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum} style={{ color:"#059669" }}>{done}</span>
                <span className={styles.statLabel}>Hoàn thành</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum} style={{ color:"#d97706" }}>{pending}</span>
                <span className={styles.statLabel}>Đang thực hiện</span>
              </div>
            </div>
          </div>
        )}

        {/* ── TASK LIST ── */}
        <div className={styles.listHeader}>
          <span className={styles.listTitle}>Danh sách nhiệm vụ</span>
          <span className={styles.listCount}>{filteredTasks.length} nhiệm vụ</span>
        </div>

        <div className={styles.taskList}>
          {filteredTasks.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>📋</div>
              <div className={styles.emptyText}>Không có nhiệm vụ cho sự kiện này</div>
            </div>
          ) : (
            filteredTasks.map((task, i) => {
  const taskPct = task.done 
    ? 100 
    : 10 + ((task.id * 7) % 11); // 10–20%

  return (
    <div
      key={task.id}
      className={`${styles.taskItem} ${task.done ? styles.taskItemDone : ""}`}
      style={{ animationDelay:`${i * 0.05}s` }}
    >
      <div className={`${styles.statusIcon} ${task.done ? styles.iconDone : styles.iconPending}`}>
        {task.done ? "✓" : "…"}
      </div>

      <div className={styles.taskContent}>
        <div className={styles.taskRow}>
          <span className={task.done ? styles.taskNameDone : styles.taskName}>
            {task.task}
          </span>
          <span className={task.done ? styles.pillDone : styles.pillPending}>
            {task.done ? "✅ Hoàn thành" : "⏳ Đang thực hiện"}
          </span>
        </div>

        <div className={styles.staff}>
          <span className={styles.staffAvatar}>
            {task.staff?.[0]?.toUpperCase() || "?"}
          </span>
          {task.staff}
        </div>

        <div className={styles.taskProgressRow}>
          <div className={styles.taskBarTrack}>
            <div
              className={styles.taskBarFill}
              style={{
                width:`${taskPct}%`,
                background: task.done
                  ? "linear-gradient(90deg,#10b981,#059669)"
                  : "linear-gradient(90deg,#f59e0b,#f97316)"
              }}
            />
          </div>
          <span
            className={styles.taskPct}
            style={{ color: task.done ? "#059669" : "#d97706" }}
          >
            {taskPct}%
          </span>
        </div>
      </div>
    </div>
  );
})
          )}
        </div>

      </div>
    </MainLayout>
  );
}