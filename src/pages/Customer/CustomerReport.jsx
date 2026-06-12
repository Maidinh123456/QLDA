import MainLayout from '../../layouts/MainLayout';
import { events } from '../../mockData';

const currentCustomer = "Đại học Kinh tế";

const CustomerReport = () => {

  const myEvents = events.filter(
    ev => ev.client === currentCustomer
  );

  const completedEvents = myEvents.filter(
    ev => ev.status === "Hoàn thành"
  );

  return (
    <MainLayout role="customer">
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        <h1 style={{ marginBottom: 20 }}>📈 Báo cáo sự kiện</h1>

        {completedEvents.length === 0 ? (
          <p>Chưa có sự kiện hoàn thành</p>
        ) : (
          completedEvents.map(ev => (
            <div key={ev.id} style={{
              background: "#fff",
              padding: 24,
              borderRadius: 16,
              marginBottom: 20,
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}>

              {/* HEADER */}
              <h2 style={{ marginBottom: 10 }}>
                📊 Báo cáo: {ev.name}
              </h2>

              <p style={{ color: "#6b7280", marginBottom: 16 }}>
                Sự kiện đã hoàn thành và được tổng kết như sau:
              </p>

              {/* INFO */}
              <div style={{ marginBottom: 16 }}>
                <p>📅 <b>Ngày tổ chức:</b> {ev.date}</p>
                <p>📍 <b>Địa điểm:</b> {ev.location}</p>
                <p>👥 <b>Số người tham gia:</b> {ev.participants}</p>
              </div>

              <hr />

              {/* RESULT */}
              <div style={{ marginTop: 16 }}>
                <p style={{ fontWeight: 600 }}>📌 Kết quả:</p>
                <p>Sự kiện diễn ra thành công, thu hút đông đảo người tham gia.</p>

                <p style={{ fontWeight: 600, marginTop: 10 }}>⭐ Đánh giá:</p>
                <p>4.5 / 5 (Đánh giá tốt từ người tham dự)</p>

                <p style={{ fontWeight: 600, marginTop: 10 }}>💡 Nhận xét:</p>
                <p>
                  Công tác tổ chức chuyên nghiệp, nội dung hấp dẫn,
                  cần cải thiện thêm về khâu check-in để tối ưu trải nghiệm.
                </p>
              </div>

              {/* STATUS */}
              <div style={{
                marginTop: 16,
                color: "#16a34a",
                fontWeight: 600
              }}>
                ✅ Trạng thái: {ev.status}
              </div>

            </div>
          ))
        )}

      </div>
    </MainLayout>
  );
};

export default CustomerReport;