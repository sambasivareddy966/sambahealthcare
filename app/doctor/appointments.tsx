import React, { useState } from "react";

const initialAppointments = [
  { id: 1, patient: "John Smith", time: "09:00 AM", type: "Consultation", status: "completed" },
  { id: 2, patient: "Emily Davis", time: "10:30 AM", type: "Follow-up", status: "in-progress" },
  { id: 3, patient: "Michael Brown", time: "02:00 PM", type: "Check-up", status: "scheduled" },
  { id: 4, patient: "Sarah Wilson", time: "03:30 PM", type: "Consultation", status: "scheduled" },
];


const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [form, setForm] = useState({ patient: "", time: "", type: "", status: "scheduled" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patient || !form.time || !form.type) return;
    setAppointments([
      ...appointments,
      { id: Date.now(), ...form },
    ]);
    setForm({ patient: "", time: "", type: "", status: "scheduled" });
  };

  const handleEdit = (id: number) => {
    const appt = appointments.find((a) => a.id === id);
    if (appt) {
      setForm({ patient: appt.patient, time: appt.time, type: appt.type, status: appt.status });
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
    setForm({ patient: "", time: "", type: "", status: "scheduled" });
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setAppointments(appointments.filter((a) => a.id !== id));
    if (editingId === id) {
      setForm({ patient: "", time: "", type: "", status: "scheduled" });
      setEditingId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Appointments</h1>
      <form className="bg-white rounded shadow p-4 mb-6 flex flex-col md:flex-row gap-4 items-end" onSubmit={editingId ? handleUpdate : handleAdd}>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Patient</label>
          <input name="patient" value={form.patient} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Patient's Name" required />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Time</label>
          <input name="time" type="time" value={form.time} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Type</label>
          <input name="type" value={form.type} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Type" required />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="border rounded px-3 py-2">
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{editingId ? "Update" : "Add"}</button>
        {editingId && (
          <button type="button" className="ml-2 text-gray-600 underline" onClick={() => { setForm({ patient: "", time: "", type: "", status: "scheduled" }); setEditingId(null); }}>Cancel</button>
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
                <th className="py-2">Time</th>
                <th className="py-2">Type</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="py-2">{a.patient}</td>
                  <td className="py-2">{a.time}</td>
                  <td className="py-2">{a.type}</td>
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

export default DoctorAppointments;
