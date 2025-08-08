import React, { useState } from "react";

const initialProfile = {
  name: "Dr. Michael Chen",
  email: "michael.chen@hospital.com",
  phone: "9876543210",
  specialty: "Dermatology",
};

const Profile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <form className="bg-white rounded shadow p-4 space-y-4" onSubmit={handleSave}>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input type="text" name="name" className="w-full border rounded px-3 py-2" value={profile.name} onChange={handleChange} disabled={!editing} />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input type="email" name="email" className="w-full border rounded px-3 py-2" value={profile.email} onChange={handleChange} disabled={!editing} />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone</label>
          <input type="tel" name="phone" className="w-full border rounded px-3 py-2" value={profile.phone} onChange={handleChange} disabled={!editing} />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Specialty</label>
          <input type="text" name="specialty" className="w-full border rounded px-3 py-2" value={profile.specialty} onChange={handleChange} disabled={!editing} />
        </div>
        <div className="pt-2">
          {editing ? (
            <>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">Save</button>
              <button type="button" className="text-gray-600 underline" onClick={() => setEditing(false)}>Cancel</button>
            </>
          ) : (
            <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setEditing(true)}>Edit Profile</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
