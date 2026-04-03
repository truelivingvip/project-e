import React, { useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import { useEffect } from 'react'
import { Col, Container, Row, Breadcrumb, Card, Button, Table } from 'react-bootstrap'
import { MdDeleteOutline } from "react-icons/md";


// import { Col, Container, Row } from 'react-bootstrap';


const Categorywiseproducts = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:8090/api/products/category/${categoryName}`)
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch((error) => {
                console.log("Error-fetching Data");
            });
    }, []);
    const handleDelete = (id) => {
        console.log(id)
        axios
            .delete(`http://localhost:8090/api/cats/${id}`)
            .then((res) => {
                console.log("Successfully deleted");
                window.location.reload()
            })
            .catch((error) => {
                console.log("Error");
            });
    }
    return (
        <div>
            <section>
                <Container>
                    <Row>
                        <Col>
                            <h1>{categoryName}</h1>
                        </Col>
                    </Row>

                    <Row>

                        {
                            products ?
                                products.map((product, index) => {
                                    return (
                                        <Col key={index}>
                                            <Card style={{ width: '18rem' }} >
                                                <Card.Img variant="top" src={`http://localhost:8090/uploads/${product.image}`} />
                                                <Button onClick={() => handleDelete(product.id)} variant="delete" className="delete-btn"><MdDeleteOutline color="pink" className="delete-icon" /></Button>
                                                <Card.Body>
                                                    <Card.Title>{product.name}</Card.Title>
                                                    {/* <Button variant="primary">Shop Now</Button> */}
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                }
                                )
                                : "Data not found"
                        }


                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default Categorywiseproducts 
