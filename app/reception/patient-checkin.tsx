import React, { useState } from "react";

type CheckIn = {
  id: number;
  patient: string;
  date: string;
  time: string;
};

const PatientCheckIn = () => {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [form, setForm] = useState({ patient: "", date: "", time: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patient || !form.date || !form.time) return;
    setCheckIns([
      ...checkIns,
      { id: Date.now(), patient: form.patient, date: form.date, time: form.time },
    ]);
    setForm({ patient: "", date: "", time: "" });
  };

  const handleEdit = (id: number) => {
    const checkIn = checkIns.find((c) => c.id === id);
    if (checkIn) {
      setForm({ patient: checkIn.patient, date: checkIn.date, time: checkIn.time });
      setEditingId(id);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckIns(
      checkIns.map((c) =>
        c.id === editingId ? { ...c, ...form } : c
      )
    );
    setForm({ patient: "", date: "", time: "" });
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setCheckIns(checkIns.filter((c) => c.id !== id));
    if (editingId === id) {
      setForm({ patient: "", date: "", time: "" });
      setEditingId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Check-in</h1>
      <form
        className="bg-white rounded shadow p-4 mb-6 flex flex-col md:flex-row gap-4 items-end"
        onSubmit={editingId ? handleUpdate : handleAdd}
      >
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Patient</label>
          <input
            name="patient"
            value={form.patient}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            placeholder="Patient's Name"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Date</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Time</label>
          <input
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button
            type="button"
            className="ml-2 text-gray-600 underline"
            onClick={() => {
              setForm({ patient: "", date: "", time: "" });
              setEditingId(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <div className="bg-white rounded shadow p-4">
        {checkIns.length === 0 ? (
          <p className="text-gray-600">No check-ins yet.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Patient</th>
                <th className="py-2">Date</th>
                <th className="py-2">Time</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {checkIns.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="py-2">{c.patient}</td>
                  <td className="py-2">{c.date}</td>
                  <td className="py-2">{c.time}</td>
                  <td className="py-2 space-x-2">
                    <button
                      className="text-blue-600 underline"
                      onClick={() => handleEdit(c.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 underline"
                      onClick={() => handleDelete(c.id)}
                    >
                      Delete
                    </button>
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

export default PatientCheckIn;
