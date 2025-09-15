import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #74ebd5 0%, #9face6 100%)",
      }}
    >
      <Card
        className="p-4 shadow-lg border-0 rounded-4"
        style={{ width: "24rem", background: "white" }}
      >
        <Card.Body className="text-center">
          <Card.Title className="mb-2 fs-2 fw-bold">Welcome</Card.Title>
          <Card.Text className="text-muted mb-4">
            Choose a section to get started
          </Card.Text>
          <div className="d-grid gap-3">
            <Button
              variant="primary"
              size="lg"
              className="d-flex align-items-center justify-content-center gap-2"
              onClick={() => navigate("/tax")}
            >
              <i className="bi bi-calculator" /> Tax Calculator
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="d-flex align-items-center justify-content-center gap-2"
              onClick={() => navigate("/users")}
            >
              <i className="bi bi-people" /> Manage Users
            </Button>
            <Button
              variant="success"
              size="lg"
              className="d-flex align-items-center justify-content-center gap-2"
              onClick={() => navigate("/groups")}
            >
              <i className="bi bi-diagram-3" /> Manage Groups
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
