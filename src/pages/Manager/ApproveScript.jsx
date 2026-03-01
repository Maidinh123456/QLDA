import { useState } from "react";
import styles from "./ApproveScript.module.css";
import MainLayout from "../../layouts/MainLayout";

export default function ApproveScript() {
  const [scripts, setScripts] = useState([
    { id: 1, title: "Kịch bản khai mạc", status: "Chờ duyệt" },
    { id: 2, title: "Kịch bản chính", status: "Chờ duyệt" }
  ]);

  const handleApprove = (id) => {
    setScripts((prev) =>
      prev.map((script) =>
        script.id === id
          ? { ...script, status: "Đã duyệt" }
          : script
      )
    );
  };

  const handleReject = (id) => {
    setScripts((prev) =>
      prev.map((script) =>
        script.id === id
          ? { ...script, status: "Từ chối" }
          : script
      )
    );
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <h2 className={styles.title}>Phê duyệt kịch bản</h2>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tên kịch bản</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {scripts.map((script) => (
                <tr key={script.id} className={styles.row}>
                  <td>{script.title}</td>

                  <td>
                    <span className={styles.badge}>
                      {script.status}
                    </span>
                  </td>

                  <td>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.approveBtn}
                        onClick={() => handleApprove(script.id)}
                      >
                        Duyệt
                      </button>

                      <button
                        type="button"
                        className={styles.rejectBtn}
                        onClick={() => handleReject(script.id)}
                      >
                        Từ chối
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </MainLayout>
  );
}