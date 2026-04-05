import React, { useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import { useEffect } from 'react'
import { Col, Container, Row, Breadcrumb, Card, Button, Table } from 'react-bootstrap'
// import { MdDeleteOutline } from "react-icons/md";
import { GoHeart } from "react-icons/go";
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
    const[wishlist,setWishlist] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const addToWishlist = async(productid) => {
        try{
            const res=await
            fetch("http://localhost:8090/api/wishlist",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    userid: user._id,
                    productid: productid
                })
            });
            const data=await res.json();
            console.log(data);
        } catch (err){
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

                        {
                            products ?
                                products.map((product, index) => {
                                    return (
                                        <Col key={index}>
                                            <Card style={{ width: '18rem' }} className="img-container">
                                                <Card.Img variant="top" src={`http://localhost:8090/uploads/${product.image}`} />
                                                <Button onClick={() => addToWishlist(product._id)} variant="delete" className="delete-btn"><GoHeart color="red" className="delete-icon" /></Button>
                                                <Card.Body>
                                                    <Card.Title>{product.name}</Card.Title>
                                                    <Button variant="primary">Shop Now</Button>
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
