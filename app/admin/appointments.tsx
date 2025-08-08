import React, { useState } from "react";

const initialAppointments = [
  { id: 1, patient: "John Smith", doctor: "Dr. Sarah Johnson", date: "2025-07-29", time: "09:00", status: "completed" },
  { id: 2, patient: "Emily Davis", doctor: "Dr. Michael Chen", date: "2025-07-29", time: "10:30", status: "scheduled" },
  { id: 3, patient: "Michael Brown", doctor: "Dr. Emily Lee", date: "2025-07-30", time: "14:00", status: "scheduled" },
];

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [form, setForm] = useState({ patient: "", doctor: "", date: "", time: "", status: "scheduled" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patient || !form.doctor || !form.date || !form.time) return;
    setAppointments([
      ...appointments,
      { id: Date.now(), ...form },
    ]);
    setForm({ patient: "", doctor: "", date: "", time: "", status: "scheduled" });
  };

  const handleEdit = (id: number) => {
    const appt = appointments.find((a) => a.id === id);
    if (appt) {
      setForm({ patient: appt.patient, doctor: appt.doctor, date: appt.date, time: appt.time, status: appt.status });
      setEditingId(id);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointments(
      appointments.map((a) =>
        a.id === editingId ? { ...a, ...form } : a
      )
    );
    setForm({ patient: "", doctor: "", date: "", time: "", status: "scheduled" });
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setAppointments(appointments.filter((a) => a.id !== id));
    if (editingId === id) {
      setForm({ patient: "", doctor: "", date: "", time: "", status: "scheduled" });
      setEditingId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Appointments</h1>
      <form className="bg-white rounded shadow p-4 mb-6 flex flex-col md:flex-row gap-4 items-end" onSubmit={editingId ? handleUpdate : handleAdd}>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Patient</label>
          <input name="patient" value={form.patient} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Patient's Name" required />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Doctor</label>
          <input name="doctor" value={form.doctor} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Doctor's Name" required />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Date</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Time</label>
          <input name="time" type="time" value={form.time} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="border rounded px-3 py-2">
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{editingId ? "Update" : "Add"}</button>
        {editingId && (
          <button type="button" className="ml-2 text-gray-600 underline" onClick={() => { setForm({ patient: "", doctor: "", date: "", time: "", status: "scheduled" }); setEditingId(null); }}>Cancel</button>
        )}
      </form>
      <div className="bg-white rounded shadow p-4">
        {appointments.length === 0 ? (
          <p className="text-gray-600">No appointments.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Patient</th>
                <th className="py-2">Doctor</th>
                <th className="py-2">Date</th>
                <th className="py-2">Time</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="py-2">{a.patient}</td>
                  <td className="py-2">{a.doctor}</td>
                  <td className="py-2">{a.date}</td>
                  <td className="py-2">{a.time}</td>
                  <td className="py-2 capitalize">{a.status}</td>
                  <td className="py-2 space-x-2">
                    <button className="text-blue-600 underline" onClick={() => handleEdit(a.id)}>Edit</button>
                    <button className="text-red-600 underline" onClick={() => handleDelete(a.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminAppointments;
