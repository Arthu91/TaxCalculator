import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getGroups, deleteGroup } from "../api/groups";
import GroupForm from "./groupForm";

export default function GroupList() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingGroup, setEditingGroup] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const data = await getGroups();
            const sorted = data.sort((a, b) => a.id - b.id);
            setGroups(sorted);
        } catch (err) {
            console.error("Failed to fetch groups", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this group?")) {
            try {
                await deleteGroup(id);
                fetchGroups();
            } catch (err) {
                console.error("Failed to delete group", err);
            }
        }
    };

    const handleGroupAdded = () => {
        setShowModal(false);
        fetchGroups();
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Button variant="secondary" onClick={() => navigate("/")}>
                    Back
                </Button>
                <h3 className="m-0">Groups</h3>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Add Group
                </Button>
            </div>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Group ID</th>
                            <th>Group Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map((group) => (
                            <tr key={group.id}>
                                <td>{group.id}</td>
                                <td>{group.name}</td>
                                <td>
                                    <Button
                                        size="sm"
                                        variant="info"
                                        className="me-2"
                                        onClick={() => navigate(`/groups/${group.id}`)}
                                    >
                                        View Users
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="warning"
                                        className="me-2"
                                        onClick={() => { setEditingGroup(group); setShowModal(true); }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() => handleDelete(group.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingGroup ? "Edit Group" : "Add Group"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GroupForm onGroupAdded={handleGroupAdded} editingGroup={editingGroup} />
                </Modal.Body>
            </Modal>
        </div>
    );
}
