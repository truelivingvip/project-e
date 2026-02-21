import React from 'react'
import { Col,Row,Container } from 'react-bootstrap'
import Header from './Header'
const Home = () => {
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
    </div>
  )
}

export default Home
