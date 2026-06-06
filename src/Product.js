import React, { useState } from 'react'
import { Col, Container, Row, Breadcrumb, Card, Button, Table } from 'react-bootstrap'
// import { Link } from 'react-router'
import axios from 'axios';
import LeftNav from './LeftNav'
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
                        <Col md={3}>
                            <LeftNav></LeftNav>

                        </Col>
                        <Col md={9}>
                            {product ? (
                                <Card className="border-0 shadow-lg p-4">
                                    <Row>
                                        {/* Product Image */}
                                        <Col md={5}>
                                            <img
                                                src={`http://localhost:8090/uploads/${product.image}`}
                                                alt={product.name}
                                                className="img-fluid rounded"
                                                style={{
                                                    height: "400px",
                                                    width: "100%",
                                                    objectFit: "cover"
                                                }}
                                            />
                                        </Col>

                                        {/* Product Details */}
                                        <Col md={7}>
                                            <span className="badge bg-primary mb-2">
                                                {product.category}
                                            </span>

                                            <h2 className="fw-bold">{product.name}</h2>

                                            <h4 className="text-danger mt-3">
                                                ₹{product.price}
                                            </h4>

                                            {/* <div className="mb-3">
                                                ⭐⭐⭐⭐⭐
                                                <small className="text-muted ms-2">
                                                    (120 Reviews)
                                                </small>
                                            </div> */}

                                            <p className="text-secondary">
                                                {product.description}
                                            </p>

                                            <div className="d-flex gap-3 mt-4">
                                                <Button variant="warning" size="lg">
                                                    Add To Cart
                                                </Button>

                                                <Button variant="danger" size="lg">
                                                    Buy Now
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            ) : (
                                <h4 className="text-center text-danger">
                                    Product Not Available
                                </h4>
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>
        </div >
    )
}

export default Product
