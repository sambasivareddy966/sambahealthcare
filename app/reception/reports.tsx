import React, { useState } from "react";

type Report = {
  id: number;
  patient: string;
  reportType: string;
  date: string;
};

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [form, setForm] = useState({ patient: "", reportType: "", date: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patient || !form.reportType || !form.date) return;
    setReports([
      ...reports,
      { id: Date.now(), patient: form.patient, reportType: form.reportType, date: form.date },
    ]);
    setForm({ patient: "", reportType: "", date: "" });
  };

  const handleEdit = (id: number) => {
    const report = reports.find((r) => r.id === id);
    if (report) {
      setForm({ patient: report.patient, reportType: report.reportType, date: report.date });
      setEditingId(id);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setReports(
      reports.map((r) =>
        r.id === editingId ? { ...r, ...form } : r
      )
    );
    setForm({ patient: "", reportType: "", date: "" });
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setReports(reports.filter((r) => r.id !== id));
    if (editingId === id) {
      setForm({ patient: "", reportType: "", date: "" });
      setEditingId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
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
          <label className="text-gray-700 font-medium mb-1">Report Type</label>
          <input
            name="reportType"
            value={form.reportType}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            placeholder="Type of Report"
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
              setForm({ patient: "", reportType: "", date: "" });
              setEditingId(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <div className="bg-white rounded shadow p-4">
        {reports.length === 0 ? (
          <p className="text-gray-600">No reports available.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Patient</th>
                <th className="py-2">Report Type</th>
                <th className="py-2">Date</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="py-2">{r.patient}</td>
                  <td className="py-2">{r.reportType}</td>
                  <td className="py-2">{r.date}</td>
                  <td className="py-2 space-x-2">
                    <button
                      className="text-blue-600 underline"
                      onClick={() => handleEdit(r.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 underline"
                      onClick={() => handleDelete(r.id)}
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

export default Reports;
