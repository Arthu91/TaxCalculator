import React, { useState } from "react";
import { calculateTax } from "../api/tax";
import { Card, Form, Button, Spinner, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function TaxCalculator() {
  const [salary, setSalary] = useState("");
  const [taxResult, setTaxResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTaxResult(null);

    try {
      const res = await calculateTax(Number(salary));
      setTaxResult(res);
    } catch (err) {
      console.error(err);
      setError("Failed to calculate tax.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 shadow-sm">
      <Row className="align-items-center mb-3">
        <Col xs="auto">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Col>
        <Col className="text-center">
          <h3 className="m-0">💰 Tax Calculator</h3>
        </Col>
        <Col xs="auto" />
      </Row>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Monthly Salary</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Calculating...
              </>
            ) : (
              "Calculate Tax"
            )}
          </Button>
        </div>
      </Form>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {taxResult && (
        <Card className="mt-4 p-3 bg-light">
          <h5 className="mb-2">Results</h5>
          <p>
            <strong>Annual Tax:</strong>{" "}
            {taxResult.annualTax != null ? taxResult.annualTax.toLocaleString() : "-"}
          </p>
          <p>
            <strong>Monthly Tax:</strong>{" "}
            {taxResult.monthlyTax != null ? taxResult.monthlyTax.toLocaleString() : "-"}
          </p>
        </Card>
      )}
    </Card>
  );
}
