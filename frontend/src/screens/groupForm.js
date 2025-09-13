import React, { useState, useEffect } from "react";
import { createGroup, updateGroup } from "../api/groups";

export default function GroupForm({ onGroupAdded, editingGroup }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingGroup) {
      setName(editingGroup.name);
    } else {
      setName("");
    }
  }, [editingGroup]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGroup) {
        const updatedGroup = await updateGroup(editingGroup.id, { name });
        onGroupAdded?.(updatedGroup);
      } else {
        const newGroup = await createGroup({ name });
        onGroupAdded?.(newGroup);
      }
      setName("");
      setError("");
    } catch (err) {
      console.error("Error creating group:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to create group");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Group Name"
        className="form-control mb-2"
      />
      {error && <div className="text-danger mb-2">{error}</div>}
      <button type="submit" className="btn btn-primary">
        {editingGroup ? "Update Group" : "Add Group"}
      </button>
    </form>
  );
}
