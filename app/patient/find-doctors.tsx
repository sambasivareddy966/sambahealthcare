import React from "react";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    location: "Room 205, Main Hospital",
    contact: "sarah.johnson@hospital.com"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatology",
    location: "Room 102, Main Hospital",
    contact: "michael.chen@hospital.com"
  },
  {
    id: 3,
    name: "Dr. Emily Lee",
    specialty: "Pediatrics",
    location: "Room 301, Children's Wing",
    contact: "emily.lee@hospital.com"
  },
];

const FindDoctors = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Find Doctors</h1>
      <div className="bg-white rounded shadow p-4">
        {doctors.length === 0 ? (
          <p className="text-gray-600">No doctors found.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Specialty</th>
                <th className="py-2">Location</th>
                <th className="py-2">Contact</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d.id} className="border-t">
                  <td className="py-2">{d.name}</td>
                  <td className="py-2">{d.specialty}</td>
                  <td className="py-2">{d.location}</td>
                  <td className="py-2">{d.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FindDoctors;
