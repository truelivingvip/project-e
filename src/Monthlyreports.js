import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table } from "react-bootstrap";

const Monthlyreports = () => {

    const [report, setReport] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:8090/api/orders/reports/monthly/2026/6")
            .then((res) => {
                setReport(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    if (!report) {
        return <h2 className="text-center mt-5">Loading...</h2>;
    }

    return (
        <Container className="mt-5">

            <h2 className="text-center mb-4">
                Monthly Sales Report
            </h2>

            {/* Summary Cards */}

            <Row className="mb-4">

                <Col md={3}>
                    <Card className="shadow text-center p-3">
                        <h5>Month</h5>
                        <h3>{report.month}</h3>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="shadow text-center p-3">
                        <h5>Year</h5>
                        <h3>{report.year}</h3>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="shadow text-center p-3">
                        <h5>Total Orders</h5>
                        <h3>{report.totalOrders}</h3>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card className="shadow text-center p-3">
                        <h5>Total Sales</h5>
                        <h3>₹{report.totalAmount}</h3>
                    </Card>
                </Col>

            </Row>

            {/* Orders Table */}

            <Table striped bordered hover responsive>

                <thead>
                    <tr>
                        <th>#</th>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Items</th>
                    </tr>
                </thead>

                <tbody>

                    {report.orders.map((order, index) => (

                        <tr key={order.id}>

                            <td>{index + 1}</td>

                            <td>{order.id}</td>

                            <td>
                                {new Date(order.createdAt).toLocaleDateString()}
                            </td>

                            <td>₹{order.totalAmount}</td>

                            <td>{order.paymentStatus}</td>

                            <td>{order.orderStatus}</td>

                            <td>{order.items.length}</td>

                        </tr>

                    ))}

                </tbody>

            </Table>

        </Container>
    );
};

export default Monthlyreports;