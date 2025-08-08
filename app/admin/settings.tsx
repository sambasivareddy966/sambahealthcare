import React, { useState } from "react";

const initialSettings = {
  hospitalName: "City Hospital",
  email: "admin@cityhospital.com",
  phone: "1234567890",
  notifications: true,
};

const AdminSettings = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [editing, setEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <form className="bg-white rounded shadow p-4 space-y-4" onSubmit={handleSave}>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Hospital Name</label>
          <input
            type="text"
            name="hospitalName"
            className="w-full border rounded px-3 py-2"
            value={settings.hospitalName}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Admin Email</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded px-3 py-2"
            value={settings.email}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            className="w-full border rounded px-3 py-2"
            value={settings.phone}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
            disabled={!editing}
            className="mr-2"
          />
          <label className="text-gray-700 font-medium">Enable Notifications</label>
        </div>
        <div className="pt-2">
          {editing ? (
            <>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">Save</button>
              <button type="button" className="text-gray-600 underline" onClick={() => setEditing(false)}>Cancel</button>
            </>
          ) : (
            <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setEditing(true)}>Edit Settings</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
