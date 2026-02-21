import React from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'
import snap from './snap.png'
const Header = () => {
  return (
    <div>
      <section className='free'>
        <Container>
          <Row>
            <Col>
              <div className='fre'>
                <ul>
                  <li><h6>FREE Delivery</h6></li>
                  <li><h6>7Days Easy Returns</h6></li>
                  <li><h6>Best Prices</h6></li>
                </ul>
              </div>
            </Col>
            <Col>
              <div className='our'>
                <ul>
                  <li><a href='#'>Our Blog</a></li>
                  <li><a href='#'>Help Center</a></li>
                  <li><a href='#'>Sell on Snapdeal</a></li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='snap'>
        <Container>
          <Row>
            <Col>
              <img src={snap} />
            </Col>
            <Col>
              <Form className="bar">
                <Form.Control
                  type="search"
                  placeholder="Search for Brands & Products"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
            </Col>
            <Col>
              <ul>
                <li><a href='#'>Login</a></li>
                <li><a href='#'>My Cart</a></li>
              </ul>
            </Col>
            <Col>

            </Col>
            <Col>

            </Col>
          </Row>
        </Container>
      </section>
    </div >
  )
}

export default Header
