import React, { useState } from 'react'
import { Col, Container, Row, Breadcrumb, Card, Button, Table } from 'react-bootstrap'
// import { Link } from 'react-router'
import axios from 'axios';
import Header from './Header';
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useFormik } from 'formik';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import * as Yup from "yup";

const Product = () => {
    const { productId } = useParams()
    const [product, setProduct] = useState();

    useEffect(() => {
        axios
            .get(`http://localhost:8090/api/products/${productId}`)
            .then((res) => {
                console.log(res.data);
                setProduct(res.data);
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
                        <Col>
                            <Header></Header>
                        </Col>
                    </Row>
                </Container>
                

                <Container className="my-5">
                    {product ? (
                        <Card
                            className="border-0 shadow-lg p-4 rounded-4"
                            style={{
                                background: "#fff"
                            }}
                        >
                            <Row className="align-items-center">

                                {/* Image Section */}
                                <Col md={5}>
                                    <div className="overflow-hidden rounded-4">
                                        <img
                                            src={`http://localhost:8090/uploads/${product.image}`}
                                            alt={product.name}
                                            className="img-fluid rounded-4"
                                            style={{
                                                width: "100%",
                                                height: "500px",
                                                objectFit: "cover"
                                            }}
                                        />
                                    </div>
                                </Col>

                                {/* Product Info */}
                                <Col md={7}>

                                    <span className="badge bg-success fs-6 mb-3">
                                        {product.category}
                                    </span>

                                    <h1 className="fw-bold mb-3">
                                        {product.name}
                                    </h1>

                                    

                                    <div className="mb-3">
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
                                    </div>

                                </Col>

                            </Row>
                        </Card>
                    ) : (
                        <div className="text-center mt-5">
                            <h4>Loading Product...</h4>
                        </div>
                    )}
                </Container>
            </section>
        </div >
    )
}

export default Product
