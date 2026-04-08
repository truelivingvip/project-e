import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useParams } from 'react-router';
import axios from 'axios';

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
    axios
      .get(`http://localhost:8090/api/carts/user/${currentUser.id}`)
      .then((res) => {
        console.log(res.data);
        setcartItems(res.data.items);
      })
      .catch((error) => {
        console.log("Error-fetching Data");
      });
  }, []);
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
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cartItems ?
                      cartItems.map((product, index) => {
                        return (
                          <tr key={index}>
                            <td><img src={`http://localhost:8090/uploads/${product.productId.image}`} /></td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                              {product.quantity}
                            </td>
                            <td>{product.total}</td>
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
              <h3>Grand Total : 795</h3>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Cart
