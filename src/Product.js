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
    const [products, setProducts] = useState();
    
    useEffect(() => {
        axios
            .get("http://localhost:8090/api/products")
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
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
                        <Col md={7}>
                            <h1>{productId}</h1>
                            {
                                products ?
                                    products.map((product, index) => {
                                        return (
                                            <div key={index}>
                                                <div><img src={`http://localhost:8090/uploads/${product.image}`} className='xyz' /></div>
                                                <div>{product.name}</div>
                                                <div>{product.price}</div>
                                                <div>{product.category}</div>
                                                {/* <td><Link to={'/edit'}><Button variant="edit"><FaEdit /></Button></Link> */}
                                                    {/* <Link><Button onClick={() => handleDelete(product.id)} variant="delete"><MdDeleteOutline /></Button></Link> */}
                                                    {/* <Link to={'/view'}><Button variant="view"><FaRegEye /></Button></Link> */}
                                                {/* </td> */}

                                            </div>
                                        )
                                    }
                                    )
                                    : "Data not found"
                            }
                        </Col>
                    </Row>
                </Container>
            </section>
        </div >
    )
}

export default Product
