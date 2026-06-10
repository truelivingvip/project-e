import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row, Breadcrumb, Card, Button, Table } from 'react-bootstrap'


const Invoice = () => {
    const { id } = useParams()
    const [order, setOrder] = useState();
    const { user: currentUser } = useSelector((state) => state.auth)
    let navigate = useNavigate();

    console.log(currentUser)
    useEffect(() => {
        currentUser ?
            console.log(currentUser)
            :
            navigate('/login');
    }, [currentUser]);

    useEffect(() => {
        axios
            .get(`http://localhost:8090/api/orders/${id}`)
            .then((res) => {
                console.log(res.data);
                setOrder(res.data);
            })
            .catch((error) => {
                console.log("Error-fetching Data");
            });
    }, []);

    return (
        <div className="py-5 bg-light min-vh-100">
            <Container>
                {order ? (
                    <Card className="shadow border-0">
                        <Card.Body className="p-5">

                            {/* Header */}
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h2 className="fw-bold text-primary">Invoice</h2>
                                    <p className="text-muted mb-0">
                                        Order ID: #{order.id}
                                    </p>
                                </div>

                                <div className="text-end">
                                    <h4 className="fw-bold">
                                        ₹{order.totalAmount}
                                    </h4>
                                    <span className="badge bg-success">
                                        Paid
                                    </span>
                                </div>
                            </div>

                            <hr />

                            {/* Customer Info */}
                            <Row className="mb-4">
                                <Col md={6}>
                                    <h5 className="fw-bold">Customer Details</h5>
                                    <p className="mb-1">
                                        {currentUser?.firstName}
                                    </p>
                                    <p className="text-muted">
                                        {currentUser?.email}
                                    </p>
                                </Col>

                                <Col md={6} className="text-md-end">
                                    <h5 className="fw-bold">Order Summary</h5>
                                    <p>Total Items: {order.items?.length}</p>
                                </Col>
                            </Row>

                            {/* Products Table */}
                            <Table striped bordered hover responsive>
                                <thead className="table-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {order.items?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.productId?.name}</td>
                                            <td>₹{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>
                                                ₹{item.price * item.quantity}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            {/* Grand Total */}
                            <div className="text-end mt-4">
                                <h3 className="fw-bold text-success">
                                    Grand Total: ₹{order.totalAmount}
                                </h3>
                            </div>

                            {/* Print Button */}
                            <div className="text-center mt-4">
                                <Button
                                    variant="primary"
                                    onClick={() => window.print()}
                                >
                                    Print Invoice
                                </Button>
                            </div>

                        </Card.Body>
                    </Card>
                ) : (
                    <div className="text-center mt-5">
                        <h4>Loading Invoice...</h4>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Invoice
