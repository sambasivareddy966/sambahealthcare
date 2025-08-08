import React from "react";

const analyticsData = [
  { label: "Total Appointments", value: 120 },
  { label: "Active Doctors", value: 15 },
  { label: "Active Patients", value: 200 },
  { label: "Prescriptions Issued", value: 340 },
  { label: "Pharmacy Orders", value: 80 },
];

const AdminAnalytics = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      <div className="bg-white rounded shadow p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {analyticsData.map((item, idx) => (
          <div key={idx} className="border rounded p-4 flex flex-col items-center">
            <span className="text-lg font-semibold mb-2">{item.label}</span>
            <span className="text-3xl font-bold text-blue-600">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnalytics;
