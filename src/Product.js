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
    const {productId} =useParams()
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
                        </Col>
                    </Row>      
                </Container>
            </section>
        </div >
    )
}

export default Product
