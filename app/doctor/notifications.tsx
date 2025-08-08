import React, { useState } from "react";

const initialNotifications = [
  { id: 1, message: "New appointment scheduled with John Smith.", date: "2025-07-28", read: false },
  { id: 2, message: "Lab results available for Emily Davis.", date: "2025-07-27", read: true },
  { id: 3, message: "Prescription refill requested by Michael Brown.", date: "2025-07-26", read: false },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="bg-white rounded shadow p-4">
        {notifications.length === 0 ? (
          <p className="text-gray-600">No notifications.</p>
        ) : (
          <ul>
            {notifications.map((n) => (
              <li key={n.id} className={`py-2 border-b flex items-center justify-between ${n.read ? 'text-gray-400' : 'text-black'}`}>
                <span>{n.message} <span className="text-xs text-gray-500 ml-2">({n.date})</span></span>
                {!n.read && (
                  <button className="text-blue-600 underline ml-4" onClick={() => markAsRead(n.id)}>
                    Mark as read
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
