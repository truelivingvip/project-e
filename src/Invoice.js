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
                console.log(id);
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
                
                    <Row className="align-items-center">

                        {/* Image Section */}
                        

                        {/* Product Info */}
                        <Col>

                            <h2>{order.id}</h2>
                            <h2>
                                {order.totalAmount}
                            </h2>

                        </Col>

                    </Row>
                
            ) : (
                <div className="text-center mt-5">
                    <h4>Loading Product...</h4>
                </div>
            )}
        </div>
    )
}

export default Invoice
