import React from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'

const Cart = () => {
  const cart = [
    {
      "image": "https://g.sdlcdn.com/imgs/k/1/5/FABRIPPLE-Polyester-Regular-Fit-Printed-SDL291792790-1-cd425.jpg?w=130&h=152",
      "name": "FABRIPPLE Polyester Regular Fit Printed Full Sleeves Men's Round T-Shirt - Grey ( Pack of 1 )",
      "price": 245,
      "quantity": [1, 2, 3, 4, 5],
      "total": 245
    },
    {
      "image": "https://g.sdlcdn.com/imgs/k/e/t/HMV-Herbals-XXX-Power-Gold-SDL040108641-1-74d9b.jpg?w=130&h=152",
      "name": "Hmv Herbals Xxx Power Gold Capsules For Men Herbal Capsule 30 No.S Pack of 3",
      "price": 550,
      "quantity": [1, 2, 3, 4, 5],
      "total": 550
    },
  ]
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
                    cart.map((cart, index) => {
                      return (
                        <tr key={index}>
                          <td><img src={cart.image} /></td>
                          <td>{cart.name}</td>
                          <td>{cart.price}</td>
                          <td>
                            <select>
                              {cart.quantity.map((qty, i) =>
                                <option key={i} value={qty}>
                                  {qty}
                                </option>
                              )
                              }
                            </select>
                          </td>
                          <td>{cart.total}</td>
                        </tr>
                      )
                    }
                    )
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
