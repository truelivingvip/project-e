import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row, Breadcrumb, Card, Button, Table } from 'react-bootstrap'


const Invoice = () => {
    const { orderId } = useParams()
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
            .get(`http://localhost:8090/api/orders/${orderId}`)
            .then((res) => {
                console.log(res.data);
                setOrder(res.data);
            })
            .catch((error) => {
                console.log("Error-fetching Data");
            });
    }, []);

    return (
        <div>
            <h2>Invoice</h2>
            {order ? (
                <Card
                    className="border-0 shadow-lg p-4 rounded-4"
                    style={{
                        background: "#fff"
                    }}
                >
                    <Row className="align-items-center">

                        {/* Image Section */}
                        

                        {/* Product Info */}
                        <Col md={7}>

                            <span className="badge bg-success fs-6 mb-3">
                                {order.id}
                            </span>

                            <h1 className="fw-bold mb-3">
                                {order.totalamount}
                            </h1>



                            {/* <div className="mb-3">
                                <h2 className="text-danger fw-bold">
                                    ₹{product.price}
                                </h2>




                            </div>

                            <p className="text-success fw-semibold">
                                ✔ In Stock
                            </p>

                            <p
                                className="text-secondary"
                                style={{
                                    fontSize: "17px",
                                    lineHeight: "1.8"
                                }}
                            >
                                {product.description}
                            </p>

                            <div className="bg-light p-3 rounded mb-4">
                                🚚 Free Delivery in 3-5 Days
                            </div>

                            <div className="d-flex gap-3">
                                <Button
                                    variant="warning"
                                    size="lg"
                                    className="fw-bold px-4"
                                >
                                    🛒 Add To Cart
                                </Button>

                                <Button
                                    variant="danger"
                                    size="lg"
                                    className="fw-bold px-4"
                                >
                                    ⚡ Buy Now
                                </Button>
                            </div> */}

                        </Col>

                    </Row>
                </Card>
            ) : (
                <div className="text-center mt-5">
                    <h4>Loading Product...</h4>
                </div>
            )}



        </div>
    )
}

export default Invoice
