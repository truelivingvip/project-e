import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Breadcrumb, Table, Button } from 'react-bootstrap'
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from 'react-router'
import LeftNav from './LeftNav'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Orders = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
            .get("http://localhost:8090/api/orders")
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
                                                            <Button variant="primary" onClick={handleShow}>
                                                                Change Status
                                                            </Button>

                                                            <Modal show={show} onHide={handleClose}>
                                                                <Modal.Header closeButton>
                                                                    <Modal.Title>Modal heading</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>

                                                                    <Formik
                                                                        initialValues={{
                                                                            productId: ''
                                                                        }}
                                                                        validationSchema={SignupSchema}
                                                                        onSubmit={values => {
                                                                            // same shape as initial values
                                                                            console.log(values);
                                                                            const data = {
                                                                                addressId: values.addressId,
                                                                                userId: currentUser.id,
                                                                                items: cartItems.items
                                                                            }
                                                                            console.log(data)
                                                                            axios.post("http://localhost:8090/api/orders", data).then((response) => {
                                                                                console.log("Order Confirmed");
                                                                                console.log(response)
                                                                            }
                                                                            )
                                                                            axios
                                                                                .delete(`http://localhost:8090/api/carts/user/${currentUser.id}`)
                                                                                .then((res) => {
                                                                                    console.log("Successfully deleted");
                                                                                    window.location.reload()
                                                                                })
                                                                                .catch((error) => {
                                                                                    console.log("Error");
                                                                                });

                                                                            navigate('/Success');

                                                                        }}
                                                                    >
                                                                        {({ errors, touched }) => (
                                                                            <Form>
                                                                                {addresses && addresses.length ?
                                                                                    addresses.map((addr, index) => {
                                                                                        return (
                                                                                            <div className="address-card"
                                                                                                key={index}

                                                                                                style={{
                                                                                                    border: "1px solid gray",
                                                                                                    padding: "15px",
                                                                                                    width: "250px",
                                                                                                    borderRadius: "10px",
                                                                                                    cursor: "pointer"
                                                                                                }}
                                                                                            >

                                                                                                <Field type="radio" name="addressId" value={addr.id} />
                                                                                                <h5>{addr.name}</h5>
                                                                                                <p>{addr.city}</p>
                                                                                                <p>{addr.state}, {addr.state}</p>
                                                                                                <p>{addr.addressType}</p>
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                    )
                                                                                    : "Address Not Available"
                                                                                }

                                                                                <button type="submit">Continue</button>
                                                                            </Form>
                                                                        )}
                                                                    </Formik>

                                                                </Modal.Body>
                                                                <Modal.Footer>
                                                                    <Button variant="secondary" onClick={handleClose}>
                                                                        Close
                                                                    </Button>
                                                                    <Button variant="primary" onClick={handleClose}>
                                                                        Save Changes
                                                                    </Button>
                                                                </Modal.Footer>
                                                            </Modal>
                                                        </td>
                                                    </tr>

                                                    {order.items?.map((item, i) => (
                                                        <tr key={i}>
                                                            <td>
                                                                <img src={`http://localhost:8090/upload/${item.productId.image}`} alt="product" width="100" />
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
