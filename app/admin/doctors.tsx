import React, { useState } from "react";

const initialDoctors = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiology", email: "sarah.johnson@hospital.com", phone: "1234567890" },
  { id: 2, name: "Dr. Michael Chen", specialty: "Dermatology", email: "michael.chen@hospital.com", phone: "9876543210" },
  { id: 3, name: "Dr. Emily Lee", specialty: "Pediatrics", email: "emily.lee@hospital.com", phone: "5555555555" },
];

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [form, setForm] = useState({ name: "", specialty: "", email: "", phone: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.specialty || !form.email || !form.phone) return;
    setDoctors([
      ...doctors,
      { id: Date.now(), ...form },
    ]);
    setForm({ name: "", specialty: "", email: "", phone: "" });
  };

  const handleEdit = (id: number) => {
    const d = doctors.find((d) => d.id === id);
    if (d) {
      setForm({ name: d.name, specialty: d.specialty, email: d.email, phone: d.phone });
      setEditingId(id);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setDoctors(
      doctors.map((d) =>
        d.id === editingId ? { ...d, ...form } : d
      )
    );
    setForm({ name: "", specialty: "", email: "", phone: "" });
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setDoctors(doctors.filter((d) => d.id !== id));
    if (editingId === id) {
      setForm({ name: "", specialty: "", email: "", phone: "" });
      setEditingId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Doctors</h1>
      <form className="bg-white rounded shadow p-4 mb-6 flex flex-col md:flex-row gap-4 items-end" onSubmit={editingId ? handleUpdate : handleAdd}>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Doctor's Name" required />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Specialty</label>
          <input name="specialty" value={form.specialty} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Specialty" required />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Email" required />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Phone</label>
          <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Phone" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{editingId ? "Update" : "Add"}</button>
        {editingId && (
          <button type="button" className="ml-2 text-gray-600 underline" onClick={() => { setForm({ name: "", specialty: "", email: "", phone: "" }); setEditingId(null); }}>Cancel</button>
        )}
      </form>
      <div className="bg-white rounded shadow p-4">
        {doctors.length === 0 ? (
          <p className="text-gray-600">No doctors.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Specialty</th>
                <th className="py-2">Email</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d.id} className="border-t">
                  <td className="py-2">{d.name}</td>
                  <td className="py-2">{d.specialty}</td>
                  <td className="py-2">{d.email}</td>
                  <td className="py-2">{d.phone}</td>
                  <td className="py-2 space-x-2">
                    <button className="text-blue-600 underline" onClick={() => handleEdit(d.id)}>Edit</button>
                    <button className="text-red-600 underline" onClick={() => handleDelete(d.id)}>Delete</button>
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

export default AdminDoctors;
