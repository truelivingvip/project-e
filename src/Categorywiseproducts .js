import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'

import { useParams } from 'react-router';
import axios from 'axios';
import { useEffect } from 'react'
import { Col, Container, Row, Breadcrumb, Card, Button, Table } from 'react-bootstrap'
// import { MdDeleteOutline } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { FaOpencart } from "react-icons/fa";
import Header from './Header';


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
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { user: currentUser } = useSelector((state) => state.auth)
    console.log(currentUser)
    useEffect(() => {
        currentUser ?
            console.log(currentUser)
            :
            navigate('/login');
    }, [currentUser]);
    const addToWishlist = async (productid) => {
        try {
            const res = await
                fetch("http://localhost:8090/api/wishlist", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({

                    })
                });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };
    const handleCart = (product) => {
        console.log(product);
        const data = {
            userId : currentUser.id,
            items : [
                {
                "productId" : product.id,
                "quantity" : 1,
                "price" : product.price
                }
            ]
        
        }
        console.log(data)
        axios.post("http://localhost:8090/api/carts",data).then((response)=>{
            console.log("Product-Add to Cart Successfully");
            console.log(response)
        }

        )
    }

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
            </section>
            <section className='head'>
                <Container>
                    <Row>
                        <div className='products-container'>
                            {
                                products ?

                                    products.map((product, index) => {
                                        return (
                                            <Col key={index} className="mb-4">
                                                <Card className="custom-card h-100 shadow-sm">
                                                    <div className='image-wrapper'>
                                                        <Card.Img variant="top" src={`http://localhost:8090/uploads/${product.image}`} className='card-img-custom' />
                                                        <div onClick={() => addToWishlist(product.id)} className="wishlist-btn"><GoHeart color="red" size={20} /></div>
                                                    </div>
                                                    <Card.Body className='d-flex flex-column'>
                                                        <Card.Title className='product-title'>{product.name}</Card.Title>
                                                        <div className='bold'>Rs.{product.price}</div>
                                                        <Link to={'/Shop'}><button variant="primary" className='mt-auto shop-btn'>Shop Now</button></Link>
                                                        <button className="cart-btn" onClick={() => handleCart(product)}><FaOpencart size={30} /></button>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                    )
                                    : "Data not found"
                            }
                        </div>

                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default Categorywiseproducts 
