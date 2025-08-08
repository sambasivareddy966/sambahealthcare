import React, { useState } from "react";

const initialPatients = [
  { id: 1, name: "John Smith", age: 45, gender: "Male", lastVisit: "2025-07-10" },
  { id: 2, name: "Emily Davis", age: 32, gender: "Female", lastVisit: "2025-07-12" },
  { id: 3, name: "Michael Brown", age: 28, gender: "Male", lastVisit: "2025-07-15" },
  { id: 4, name: "Sarah Wilson", age: 38, gender: "Female", lastVisit: "2025-07-18" },
];

const AdminPatients = () => {
  const [patients, setPatients] = useState(initialPatients);
  const [form, setForm] = useState({ name: "", age: "", gender: "Male", lastVisit: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.gender || !form.lastVisit) return;
    setPatients([
      ...patients,
      { id: Date.now(), ...form, age: Number(form.age) },
    ]);
    setForm({ name: "", age: "", gender: "Male", lastVisit: "" });
  };

  const handleEdit = (id: number) => {
    const p = patients.find((p) => p.id === id);
    if (p) {
      setForm({ name: p.name, age: String(p.age), gender: p.gender, lastVisit: p.lastVisit });
      setEditingId(id);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setPatients(
      patients.map((p) =>
        p.id === editingId ? { ...p, ...form, age: Number(form.age) } : p
      )
    );
    setForm({ name: "", age: "", gender: "Male", lastVisit: "" });
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setPatients(patients.filter((p) => p.id !== id));
    if (editingId === id) {
      setForm({ name: "", age: "", gender: "Male", lastVisit: "" });
      setEditingId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Patients</h1>
      <form className="bg-white rounded shadow p-4 mb-6 flex flex-col md:flex-row gap-4 items-end" onSubmit={editingId ? handleUpdate : handleAdd}>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Patient's Name" required />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Age</label>
          <input name="age" type="number" value={form.age} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange} className="border rounded px-3 py-2">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Last Visit</label>
          <input name="lastVisit" type="date" value={form.lastVisit} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{editingId ? "Update" : "Add"}</button>
        {editingId && (
          <button type="button" className="ml-2 text-gray-600 underline" onClick={() => { setForm({ name: "", age: "", gender: "Male", lastVisit: "" }); setEditingId(null); }}>Cancel</button>
        )}
      </form>
      <div className="bg-white rounded shadow p-4">
        {patients.length === 0 ? (
          <p className="text-gray-600">No patients.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Age</th>
                <th className="py-2">Gender</th>
                <th className="py-2">Last Visit</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="py-2">{p.name}</td>
                  <td className="py-2">{p.age}</td>
                  <td className="py-2">{p.gender}</td>
                  <td className="py-2">{p.lastVisit}</td>
                  <td className="py-2 space-x-2">
                    <button className="text-blue-600 underline" onClick={() => handleEdit(p.id)}>Edit</button>
                    <button className="text-red-600 underline" onClick={() => handleDelete(p.id)}>Delete</button>
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

export default AdminPatients;
