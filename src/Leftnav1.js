import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Leftnav1 = () => {
  return (
    <div>
      <section className='men'>
        <Container>
            <Row>
                <Col>
                    <h3>Mens Clothing</h3>
                    <ul>
                        <li>Men's T-shirts & Polo</li>
                        <li>Shirts for men</li>
                        <li>Jeans for men</li>
                        <li>Trousers for men</li>
                        <li>Sportswear for men</li>
                    </ul>
                </Col>
            </Row>
        </Container>
      </section>
    </div>
  )
}

export default Leftnav1
