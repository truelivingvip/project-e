import React, { useEffect, useState } from "react";
import { Col, Container, Row, Breadcrumb, Card, Table } from "react-bootstrap";
import { Link } from "react-router";
import LeftNav from "./LeftNav";
import { useSelector } from "react-redux";
import axios from "axios";

const Sales = () => {

    const { user: currentUser } = useSelector((state) => state.auth);

    const [report, setReport] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:8090/api/orders/reports/monthly/2026/6")
            .then((res) => {
                console.log(res.data)
                setReport(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <section>
            <Container fluid>

                <Row>

                    <Col md={3}>
                        <LeftNav />
                    </Col>

                    <Col md={8}>

                        {/* Heading */}

                        <Row className="mb-4">
                            <Col>

                                <h2>Sales Dashboard</h2>

                                <Breadcrumb>
                                    <Breadcrumb.Item>
                                        <Link to="/Dashboard">
                                            Dashboard
                                        </Link>
                                    </Breadcrumb.Item>

                                    <Breadcrumb.Item active>
                                        Sales
                                    </Breadcrumb.Item>

                                </Breadcrumb>

                            </Col>
                        </Row>

                        {report && (

                            <>
                                {/* Summary Cards */}

                                <Row className="mb-4">

                                    <Col md={3}>
                                        <Card className="shadow text-center p-3">
                                            <h6>Month</h6>
                                            <h3>{report.month}</h3>
                                        </Card>
                                    </Col>

                                    <Col md={3}>
                                        <Card className="shadow text-center p-3">
                                            <h6>Year</h6>
                                            <h3>{report.year}</h3>
                                        </Card>
                                    </Col>

                                    <Col md={3}>
                                        <Card className="shadow text-center p-3">
                                            <h6>Total Orders</h6>
                                            <h3>{report.totalOrders}</h3>
                                        </Card>
                                    </Col>

                                    <Col md={3}>
                                        <Card className="shadow text-center p-3">
                                            <h6>Total Sales</h6>
                                            <h3>₹{report.totalAmount}</h3>
                                        </Card>
                                    </Col>

                                </Row>

                                {/* Orders */}

                                <Row>

                                    <Col>

                                        <Card className="shadow">

                                            <Card.Header>
                                                Monthly Orders
                                            </Card.Header>

                                            <Card.Body>

                                                <Table bordered hover responsive>

                                                    <thead>

                                                        <tr>
                                                            <th>#</th>
                                                            <th>Order ID</th>
                                                            <th>Date</th>
                                                            <th>Items</th>
                                                            <th>Amount</th>
                                                            <th>Payment</th>
                                                            <th>Status</th>
                                                        </tr>

                                                    </thead>

                                                    <tbody>

                                                        {report.orders.map((order, index) => (

                                                            <tr key={order.id}>

                                                                <td>{index + 1}</td>

                                                                <td>{order.id}</td>

                                                                <td>
                                                                    {new Date(
                                                                        order.createdAt
                                                                    ).toLocaleDateString()}
                                                                </td>

                                                                <td>{order.items.length}</td>

                                                                <td>
                                                                    ₹{order.totalAmount}
                                                                </td>

                                                                <td>
                                                                    {order.paymentStatus}
                                                                </td>

                                                                <td>
                                                                    {order.orderStatus}
                                                                </td>

                                                            </tr>

                                                        ))}

                                                    </tbody>

                                                </Table>

                                            </Card.Body>

                                        </Card>

                                    </Col>

                                </Row>

                            </>
                        )}

                    </Col>

                </Row>

            </Container>
        </section>
    );
};

export default Sales;