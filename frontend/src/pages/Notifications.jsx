import React from "react";
import { Link } from "react-router-dom";

const Notifications = () => {
  // Placeholder notifications list. In a real app you'd fetch these from an API.
  const notifications = [
    { id: 1, text: "Welcome to The Coding Journey!" },
  ];

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold">Notifications</h2>
      <div className="mt-4">
        {notifications.length === 0 ? (
          <p>No notifications yet. <Link to="/">Go home</Link></p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li key={n.id} className="p-3 border rounded">{n.text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
