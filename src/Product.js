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
                        <Col md={7}>
                            {
                                product ?
                                <>
                                    <h1>{product.name}</h1>
                                    <h6>{product.category}</h6>
                                    <img src={`http://localhost:8090/uploads/${product.image}`} alt='' className='img-fluid' />
                                    
                                </>
                            :"Prduct Not Available"
                            }
                            
                        </Col>
                    </Row>
                </Container>
            </section>
        </div >
    )
}

export default Product
