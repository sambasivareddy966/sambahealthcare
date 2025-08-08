import React from "react";

const prescriptions = [
  {
    id: 1,
    medication: "Lisinopril 10mg",
    doctor: "Dr. Sarah Johnson",
    date: "2024-07-10",
    instructions: "Take one tablet daily."
  },
  {
    id: 2,
    medication: "Metformin 500mg",
    doctor: "Dr. Michael Chen",
    date: "2024-07-05",
    instructions: "Take one tablet twice daily with meals."
  },
  {
    id: 3,
    medication: "Atorvastatin 20mg",
    doctor: "Dr. Emily Lee",
    date: "2024-06-28",
    instructions: "Take one tablet at bedtime."
  },
];

const Prescriptions = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Prescriptions</h1>
      <div className="bg-white rounded shadow p-4">
        {prescriptions.length === 0 ? (
          <p className="text-gray-600">No prescriptions found.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Medication</th>
                <th className="py-2">Doctor</th>
                <th className="py-2">Date</th>
                <th className="py-2">Instructions</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="py-2">{p.medication}</td>
                  <td className="py-2">{p.doctor}</td>
                  <td className="py-2">{p.date}</td>
                  <td className="py-2">{p.instructions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Prescriptions;
