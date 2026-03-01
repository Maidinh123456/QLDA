import React from 'react';
import { events, tasks } from '../../mockData';
import styles from './Dashboard.module.css';
import MainLayout from "../../layouts/MainLayout";

const ManagerDashboard = () => {
  const done    = tasks.filter(t => t.done).length;
  const pending = tasks.length - done;

  const STATUS = {
    "Đang chuẩn bị": { color:"#d97706", bg:"#fef3c7", border:"#fde68a", dot:"#f59e0b" },
    "Đang diễn ra":  { color:"#059669", bg:"#ecfdf5", border:"#a7f3d0", dot:"#10b981" },
    "Hoàn thành":    { color:"#6366f1", bg:"#eef2ff", border:"#c7d2fe", dot:"#6366f1" },
  };

  const stats = [
    { icon:"🗓", label:"Tổng sự kiện",   value:events.length, from:"#6366f1", to:"#8b5cf6", shadow:"rgba(99,102,241,.28)"  },
    { icon:"📋", label:"Tổng nhiệm vụ",  value:tasks.length,  from:"#f59e0b", to:"#f97316", shadow:"rgba(245,158,11,.28)"  },
    { icon:"✅", label:"Hoàn thành",      value:done,          from:"#10b981", to:"#059669", shadow:"rgba(16,185,129,.28)"  },
    { icon:"⏳", label:"Đang thực hiện", value:pending,       from:"#e879f9", to:"#a855f7", shadow:"rgba(168,85,247,.28)"  },
  ];

  return (
    <MainLayout>
      <div className={styles.container}>

        {/* ── HEADER ── */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>🎯</div>
          <div>
            <h1 className={styles.title}>Manager Dashboard</h1>
            <p className={styles.subtitle}>Tổng quan hệ thống quản lý sự kiện</p>
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div className={styles.stats}>
          {stats.map((s, i) => (
            <div key={i} className={styles.statCard} style={{ animationDelay:`${i*0.07}s` }}>
              <div className={styles.statIconWrap}
                style={{ background:`linear-gradient(135deg,${s.from},${s.to})`, boxShadow:`0 6px 18px ${s.shadow}` }}>
                {s.icon}
              </div>
              <div className={styles.statBody}>
                <div className={styles.statValue} style={{ color:s.from }}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── BODY: 2 columns ── */}
        <div className={styles.body}>

          {/* LEFT — Event list */}
          <div className={styles.col}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>📅 Danh sách sự kiện</span>
              <span className={styles.sectionCount}>{events.length}</span>
            </div>
            <div className={styles.eventList}>
              {events.map((ev, i) => {
                const sc = STATUS[ev.status] || STATUS["Đang chuẩn bị"];
                const evPercent =
                  ev.status === "Hoàn thành"    ? 100 :
                  ev.status === "Đang diễn ra"  ? 90  :
                  ev.status === "Chờ phê duyệt" ? 0   :
                  ((ev.id * 13 + 7) % 5) * 10 + 20;
                return (
                  <div key={ev.id} className={styles.eventItem} style={{ animationDelay:`${i*0.05}s` }}>
                    <div className={styles.eventLeft}>
                      <div className={styles.eventIndex}>{i + 1}</div>
                      <div className={styles.eventInfo}>
                        <div className={styles.eventName}>{ev.name}</div>
                        <div className={styles.eventMeta}>
                          <span>📅 {ev.date}</span>
                          {ev.location && <span>📍 {ev.location}</span>}
                        </div>
                        <div className={styles.miniProgressRow}>
                          <div className={styles.miniTrack}>
                            <div className={styles.miniFill} style={{ width:`${evPercent}%` }} />
                          </div>
                          <span className={styles.miniPct}
                            style={{ color: evPercent===100?"#059669": evPercent>=60?"#6366f1":"#d97706" }}>
                            {evPercent}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={styles.eventStatus}
                      style={{ color:sc.color, background:sc.bg, borderColor:sc.border }}>
                      <span style={{ width:6,height:6,borderRadius:"50%",background:sc.dot,display:"inline-block",flexShrink:0 }} />
                      {ev.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Task summary */}
          <div className={styles.col}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>📋 Nhiệm vụ theo sự kiện</span>
            </div>
            <div className={styles.taskSummaryList}>
              {events.map((ev, i) => {
                const evTasks = tasks.filter(t => t.eventId === ev.id);
                if (!evTasks.length) return null;
                const evDone = evTasks.filter(t => t.done).length;
                const pct = Math.round((evDone / evTasks.length) * 100);
                return (
                  <div key={ev.id} className={styles.taskSummaryItem} style={{ animationDelay:`${i*0.06}s` }}>
                    <div className={styles.tsHeader}>
                      <span className={styles.tsName}>{ev.name}</span>
                      <span className={styles.tsPct}
                        style={{ color: pct===100?"#059669": pct>=60?"#6366f1":"#d97706" }}>
                        {evDone}/{evTasks.length}
                      </span>
                    </div>
                    <div className={styles.tsTrack}>
                      <div className={styles.tsFill}
                        style={{
                          width:`${pct}%`,
                          background: pct===100
                            ? "linear-gradient(90deg,#10b981,#059669)"
                            : pct>=60
                            ? "linear-gradient(90deg,#6366f1,#8b5cf6)"
                            : "linear-gradient(90deg,#f59e0b,#f97316)"
                        }}
                      />
                    </div>
                    <div className={styles.tsFooter}>
                      <span style={{ color:"#059669" }}>✓ {evDone} xong</span>
                      <span style={{ color:"#94a3b8" }}>·</span>
                      <span style={{ color:"#d97706" }}>⏳ {evTasks.length - evDone} còn lại</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default ManagerDashboard;