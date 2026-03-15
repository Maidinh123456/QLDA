import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const registrations = JSON.parse(localStorage.getItem("registrations")) || [];

    const foundEvent = events.find(e => e.id === Number(id));
    setEvent(foundEvent);

    const eventParticipants = registrations.filter(
      r => r.eventId === Number(id)
    );
    setParticipants(eventParticipants);
  }, [id]);

  if (!event) return <h3>Không tìm thấy sự kiện</h3>;

  return (
    <div>
      <h2>{event.name}</h2>

      <h3>Thông tin sự kiện</h3>
      <p>Mô tả: {event.description}</p>
      <p>Ngày: {event.date}</p>
      <p>Địa điểm: {event.location}</p>

      <h3>Tiến độ</h3>
      <p>{event.progress}% hoàn thành</p>

      <h3>Danh sách người tham gia</h3>
      <ul>
        {participants.map((p, index) => (
          <li key={index}>{p.username}</li>
        ))}
      </ul>

      <h3>Báo cáo sau sự kiện</h3>
      {event.report ? (
        <>
          <p>Tổng người tham gia: {event.report.totalParticipants}</p>
          <p>Doanh thu: {event.report.revenue} VNĐ</p>
          <p>Tổng kết: {event.report.summary}</p>
        </>
      ) : (
        <p>Chưa có báo cáo</p>
      )}
    </div>
  );
};

export default EventDetail;