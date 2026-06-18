import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Breadcrumb, Table, Button } from 'react-bootstrap'
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from 'react-router'
import LeftNav from './LeftNav'
import axios from "axios";
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { FaEdit } from "react-icons/fa";
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Orders = () => {
    const [show, setShow] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [order, setOrder] = useState();

    const handleClose = () => setShow(false);
    const handleShow = (order) => {
        setShow(true);
        setOrderId(order.id);
        setOrder(order);

    };
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { user: currentUser } = useSelector((state) => state.auth)
    console.log(currentUser)
    useEffect(() => {
        currentUser && currentUser.roles[0] === "ROLE_ADMIN" ?
            console.log(currentUser)
            :
            navigate('/login');
    }, [currentUser]);
    const [orders, setOrders] = useState();
    useEffect(() => {
        axios
            .get(`http://localhost:8090/api/orders/user/${currentUser.id}`)
            .then((res) => {
                console.log(res.data);
                setOrders(res.data);
            })
            .catch((error) => {
                console.log("Error-fetching Data");
            });
    }, []);

    return (
        <div>
            <section>
                <Container>
                    <Row>
                        <Col md={3}>
                            <LeftNav></LeftNav>
                        </Col>

                        <Col md={8}>
                            <Table striped bordered hover>
                                <thead>

                                </thead>
                                <tbody>

                                    {
                                        orders?.length > 0 ? (
                                            orders.map((order, index) => (
                                                <React.Fragment key={index}>
                                                    <tr key={index}>
                                                        <td><h3>Order ID: </h3>{order.id}</td>
                                                        <td><p>Total:</p>{order.totalAmount}</td>
                                                        <td><p>Status:</p>{order.orderStatus}</td>
                                                        <td>
                                                            <Button
                                                                className="status-btn"
                                                                // onClick={handleShow}
                                                                onClick={() => handleShow(order)}
                                                            >
                                                                <FaEdit className="me-2" />
                                                                Update Status
                                                            </Button>

                                                            <Modal
                                                                show={show}
                                                                onHide={handleClose}
                                                                centered
                                                                size="md"
                                                            >
                                                                <Modal.Header closeButton className="custom-modal-header">
                                                                    <Modal.Title>Update Order Status</Modal.Title>
                                                                </Modal.Header>

                                                                <Modal.Body className="custom-modal-body">

                                                                    <Formik
                                                                        initialValues={{
                                                                            productId: '',
                                                                            status: ''
                                                                        }}
                                                                        onSubmit={(values) => {
                                                                            console.log(values);
                                                                            order.orderStatus=values.status
                                                                            axios.put(`http://localhost:8090/api/orders/${orderId}`, order);
                                                                            window.location.reload();
                                                                        }}
                                                                    >
                                                                        {() => (
                                                                            <Form>

                                                                                <div className="status-container">

                                                                                    <label className="status-card">
                                                                                        <Field
                                                                                            type="radio"
                                                                                            name="status"
                                                                                            value="Success"
                                                                                        />
                                                                                        <span>Success</span>
                                                                                    </label>

                                                                                    <label className="status-card reject">
                                                                                        <Field
                                                                                            type="radio"
                                                                                            name="status"
                                                                                            value="Rejected"
                                                                                        />
                                                                                        <span>Rejected</span>
                                                                                    </label>

                                                                                </div>

                                                                                <div className="text-end mt-4">
                                                                                    <button
                                                                                        type="submit"
                                                                                        className="btn btn-success px-4"
                                                                                    >
                                                                                        Update Status
                                                                                    </button>
                                                                                </div>

                                                                            </Form>
                                                                        )}
                                                                    </Formik>

                                                                </Modal.Body>
                                                            </Modal>
                                                        </td>
                                                    </tr>

                                                    {order.items?.map((item, i) => (
                                                        <tr key={i}>
                                                            <td>
                                                                <img src={`http://localhost:8090/uploads/${item.productId.image}`} alt="product" width="100" />
                                                                <p>{item?.productId.name}</p></td>
                                                            <td><p>Price: {item.price}</p></td>
                                                            <td><p>Quantity: {item.quantity}</p></td>

                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4">No Orders Found</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Col>
                        <Col md={1}>
                        </Col>
                    </Row>
                </Container>
            </section>

        </div>
    )
}

export default Orders
