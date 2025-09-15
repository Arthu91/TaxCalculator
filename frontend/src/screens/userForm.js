import React, { useState, useEffect } from "react";
import { createUser, updateUser } from "../api/users";

export default function UserForm({ onUserAdded, groups, editingUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [groupId, setGroupId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setSalary(editingUser.salary);
      setGroupId(editingUser.group?.id || "");
    } else {
      setName("");
      setEmail("");
      setSalary("");
      setGroupId("");
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await updateUser(editingUser.id, { name, email, salary, groupId });
      } else {
        await createUser({ name, email, salary, groupId });
      }
      onUserAdded();
    } catch (err) {
      console.error("Error saving user:", err);
      setError("Failed to save user");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="form-control mb-2"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="form-control mb-2"
        required
      />
      <input
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="Salary"
        className="form-control mb-2"
        required
      />
      <select
        value={groupId}
        onChange={(e) => setGroupId(e.target.value)}
        className="form-control mb-2"
        required
      >
        <option value="">Select Group</option>
        {groups.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>
      {error && <div className="text-danger mb-2">{error}</div>}
      <button type="submit" className="btn btn-primary w-100">
        {editingUser ? "Update User" : "Save User"}
      </button>
    </form>
  );
}
