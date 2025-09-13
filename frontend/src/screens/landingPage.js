// src/components/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ width: "22rem" }}>
        <Card.Body className="text-center">
          <Card.Title className="mb-4">Welcome</Card.Title>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={() => navigate("/tax")}>
              Tax Calculator
            </Button>
            <Button variant="secondary" onClick={() => navigate("/users")}>
              Manage Users
            </Button>
            <Button variant="success" onClick={() => navigate("/groups")}>
              Manage Groups
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
