import React, { useState, Suspense } from "react";

const navItems = [
  { key: "appointments", label: "Appointments", icon: "📅" },
  { key: "patient-checkin", label: "Patient Check-in", icon: "👥" },
  { key: "doctor-schedules", label: "Doctor Schedules", icon: "🩺" },
  { key: "reports", label: "Reports", icon: "📄" },
];

const sectionComponents: Record<string, React.LazyExoticComponent<any>> = {
  appointments: React.lazy(() => import("../../app/reception/appointments")),
  "patient-checkin": React.lazy(() => import("../../app/reception/patient-checkin")),
  "doctor-schedules": React.lazy(() => import("../../app/reception/doctor-schedules")),
  reports: React.lazy(() => import("../../app/reception/reports")),
};

const ReceptionDashboard = () => {
  const [section, setSection] = useState("appointments");
  const SectionComponent = sectionComponents[section];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r p-6">
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  className={`flex items-center w-full px-3 py-2 rounded text-gray-700 hover:bg-gray-100 transition ${section === item.key ? "bg-gray-100 font-semibold" : ""}`}
                  onClick={() => setSection(item.key)}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Suspense fallback={<div>Loading...</div>}>
          <SectionComponent />
        </Suspense>
      </main>
    </div>
  );
};

export default ReceptionDashboard;
