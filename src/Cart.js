import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Col, Container, Row, Table, Button } from 'react-bootstrap'
import { useParams, Link } from 'react-router';
import axios from 'axios';
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineCurrencyRupee } from "react-icons/md";


const Cart = () => {
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
  const [cartItems, setcartItems] = useState([]);
  useEffect(() => {
    if (currentUser && currentUser.id) {
      axios
        .get(`http://localhost:8090/api/carts/user/${currentUser.id}`)
        .then((res) => {
          console.log(res.data);
          setcartItems(res.data.items);
        })
        .catch((error) => {
          console.log("Error-fetching Data");
        });
    }

  }, []);
  const calculateTotal = () => {
    // console.log(products)
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, product) => {
      return total + (product.quantity * product.price);
    }, 0);
  }
  const subTotal = calculateTotal();
  const handleDelete = (productId) => {
    console.log(productId)
    axios
      .delete(`http://localhost:8090/api/carts/user/${currentUser.id}/item/${productId}`)
      .then((res) => {
        console.log("Successfully deleted");
        window.location.reload()
      })
      .catch((error) => {
        console.log("Error");
      });
  }
  const [cart, setCart] = useState([])
  const handleDecrease = (productId, currentQty) => {
    if (currentQty <= 1) return;
    try {
      axios.put(`http://localhost:8090/api/carts/user/${currentUser.id}/item/${productId}`, {
        quantity: currentQty - 1
      }).then((response) => {
        window.location.reload()
      })

      // setcartItems(res.data.items)

    } catch (err) {
      console.log(err);
    }
  }
  const handleIncrease = (productId, currentQty) => {
    try {
      const res = axios.put(`http://localhost:8090/api/carts/user/${currentUser.id}/item/${productId}`, {
        quantity: currentQty + 1
      }).then((response) => {
        window.location.reload()
      })

      console.log("API Updated:", res.data);

      setcartItems(res.data.items)

    } catch (err) {
      console.log(err);
    }
  };
  // const cart = [
  //   {
  //     "image": "https://g.sdlcdn.com/imgs/k/1/5/FABRIPPLE-Polyester-Regular-Fit-Printed-SDL291792790-1-cd425.jpg?w=130&h=152",
  //     "name": "FABRIPPLE Polyester Regular Fit Printed Full Sleeves Men's Round T-Shirt - Grey ( Pack of 1 )",
  //     "price": 245,
  //     "quantity": [1, 2, 3, 4, 5],
  //     "total": 245
  //   },
  //   {
  //     "image": "https://g.sdlcdn.com/imgs/k/e/t/HMV-Herbals-XXX-Power-Gold-SDL040108641-1-74d9b.jpg?w=130&h=152",
  //     "name": "Hmv Herbals Xxx Power Gold Capsules For Men Herbal Capsule 30 No.S Pack of 3",
  //     "price": 550,
  //     "quantity": [1, 2, 3, 4, 5],
  //     "total": 550
  //   },
  // ]
  return (
    <div>
      <section className='tab'>
        <Container>
          <Row>
            <Col>
              <h3>Shopping Cart</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product_Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cartItems ?
                      cartItems.map((product, index) => {
                        return (
                          <tr key={index}>
                            <td><img src={`http://localhost:8090/uploads/${product.productDetails.image}`} className='product-img' /></td>
                            <td>{product.productDetails.name}</td>
                            <td><MdOutlineCurrencyRupee />{product.productDetails.price}</td>
                            <td>
                              <button onClick={() => handleDecrease(product.productId, product.quantity)}>-</button>
                              {product.quantity}
                              <button onClick={() => handleIncrease(product.productId, product.quantity)}>+</button>
                            </td>
                            <td><MdOutlineCurrencyRupee />{product.productDetails.price * product.quantity}</td>
                            <td>
                              <Button onClick={() => handleDelete(product.productId)} variant="delete"><MdDeleteOutline /></Button>
                            </td>
                          </tr>
                        )
                      }
                      )
                      : "Data Not Found"
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='total'>
        <Container>
          <Row>
            <Col>
              <h3>Total Amount = <MdOutlineCurrencyRupee />{subTotal}</h3>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='next'>
        <Container>
          <Row>
            <Col>
              <Link to={'/Address1'}><button>Next</button></Link>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Cart
