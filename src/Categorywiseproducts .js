import React, { useState } from 'react'
import { Link, useParams } from 'react-router';
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
    const [wishlist, setWishlist] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const addToWishlist = async (productid) => {
        try {
            const res = await
                fetch("http://localhost:8090/api/wishlist", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userid: user._id,
                        productid: productid
                    })
                });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };
    // const exist = wishlist.find((item)=>item._id===product._id);

    // if(exist){
    //     setWishlist(wishlist.filter((item) =>item._id!==product._id))
    // } else{
    //     setWishlist([...wishlist,product]);
    // }
    // console.log("Wishlist:",wishlist);
    // axios
    //     .post("http://localhost:8090/api/wishlist",{product})
    // .then((res) => {
    //     console.log("Successfully deleted");
    //     window.location.reload()
    // })
    // .catch((error) => {
    //     console.log("Error");
    // });

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
                                                        <div onClick={() => addToWishlist(product._id)} className="wishlist-btn"><GoHeart color="red" size={20} /></div>
                                                    </div>
                                                    <Card.Body className='d-flex flex-column'>
                                                        <Card.Title className='product-title'>{product.name}</Card.Title>
                                                        <Link to={'/Shop'}><button variant="primary" className='mt-auto shop-btn'>Shop Now</button></Link>
                                                        <Link to={'/cart'}><button className="cart-btn"><FaOpencart size={30} /></button></Link>
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
