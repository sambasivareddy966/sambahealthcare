import React, { useState } from "react";

const initialPharmacy = [
  { id: 1, name: "Paracetamol 500mg", stock: 120, price: 10 },
  { id: 2, name: "Amoxicillin 250mg", stock: 80, price: 25 },
  { id: 3, name: "Ibuprofen 400mg", stock: 60, price: 15 },
];

const AdminPharmacy = () => {
  const [medicines, setMedicines] = useState(initialPharmacy);
  const [form, setForm] = useState({ name: "", stock: "", price: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.stock || !form.price) return;
    setMedicines([
      ...medicines,
      { id: Date.now(), name: form.name, stock: Number(form.stock), price: Number(form.price) },
    ]);
    setForm({ name: "", stock: "", price: "" });
  };

  const handleEdit = (id: number) => {
    const m = medicines.find((m) => m.id === id);
    if (m) {
      setForm({ name: m.name, stock: String(m.stock), price: String(m.price) });
      setEditingId(id);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setMedicines(
      medicines.map((m) =>
        m.id === editingId ? { ...m, ...form, stock: Number(form.stock), price: Number(form.price) } : m
      )
    );
    setForm({ name: "", stock: "", price: "" });
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setMedicines(medicines.filter((m) => m.id !== id));
    if (editingId === id) {
      setForm({ name: "", stock: "", price: "" });
      setEditingId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pharmacy Details</h1>
      <form className="bg-white rounded shadow p-4 mb-6 flex flex-col md:flex-row gap-4 items-end" onSubmit={editingId ? handleUpdate : handleAdd}>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Medicine Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Medicine Name" required />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Stock</label>
          <input name="stock" type="number" value={form.stock} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Price</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{editingId ? "Update" : "Add"}</button>
        {editingId && (
          <button type="button" className="ml-2 text-gray-600 underline" onClick={() => { setForm({ name: "", stock: "", price: "" }); setEditingId(null); }}>Cancel</button>
        )}
      </form>
      <div className="bg-white rounded shadow p-4">
        {medicines.length === 0 ? (
          <p className="text-gray-600">No medicines.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Stock</th>
                <th className="py-2">Price</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((m) => (
                <tr key={m.id} className="border-t">
                  <td className="py-2">{m.name}</td>
                  <td className="py-2">{m.stock}</td>
                  <td className="py-2">{m.price}</td>
                  <td className="py-2 space-x-2">
                    <button className="text-blue-600 underline" onClick={() => handleEdit(m.id)}>Edit</button>
                    <button className="text-red-600 underline" onClick={() => handleDelete(m.id)}>Delete</button>
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

export default AdminPharmacy;
