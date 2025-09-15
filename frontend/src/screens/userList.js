import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, computeUserTax } from "../api/users";
import { getGroups } from "../api/groups";
import { Button, Table, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserForm from "./userForm";


export default function UserList() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchGroups();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res);
  };

  const fetchGroups = async () => {
    const res = await getGroups();
    setGroups(res);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleUserAdded = () => {
    fetchUsers();
    setShowModal(false);
    setEditingUser(null);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleComputeTax = async (id) => {
    const tax = await computeUserTax(id);
    alert(
      `Annual Tax: ${tax.annualTax.toLocaleString()} \nMonthly Tax: ${tax.monthlyTax.toLocaleString()}`
    );
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <h3 className="m-0">Users</h3>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add User
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Group</th>
            <th>Monthly Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.group?.name || "N/A"}</td>
              <td>{u.salary ?? "-"}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(u)}
                >
                  ✏️ Edit
                </Button>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleComputeTax(u.id)}
                >
                  💰 Tax
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(u.id)}
                >
                  ❌ Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm
            onUserAdded={handleUserAdded}
            groups={groups}
            editingUser={editingUser}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
