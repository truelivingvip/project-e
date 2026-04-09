import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { FaOpencart } from "react-icons/fa";
import Header from './Header'


const Wishlist = () => {
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


  const { categoryName } = useParams();
  const [wishlists, setwishlists] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8090/api/wishlist/user/${currentUser.id}`)
      .then((res) => {
        console.log(res.data);
        setwishlists(res.data.items || res.data);
      })
      .catch((error) => {
        console.log("Error-fetching Data");
      });
  }, []);

  const handleCart = (product) => {
    console.log(product);
    const data = {
      userId: currentUser.id,
      productId: product.id,

    }
    console.log(data)
    axios.post("http://localhost:8090/api/carts", data).then((response) => {
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
                wishlists ?

                  wishlists.map((item, index) => {
                    
                    return (
                      <Col key={index} className="mb-4">
                        <Card className="custom-card h-100 shadow-sm">
                          <div className='image-wrapper'>
                            <Card.Img variant="top" src={`http://localhost:8090/uploads/${item.productId.image}`} className='card-img-custom' />
                          </div>
                          <Card.Body className='d-flex flex-column'>
                            <Card.Title className='product-title'>{item.productId.name}</Card.Title>
                            <div className='bold'>Rs.{item.productId.price}</div>
                            <Link to={'/Shop'}><button variant="primary" className='mt-auto shop-btn'>Shop Now</button></Link>
                            <button className="cart-btn" onClick={() => handleCart(item)}><FaOpencart size={30} /></button>
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

export default Wishlist
