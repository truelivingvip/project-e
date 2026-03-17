import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const success = () => {
  return (
    <div>
      <section>
        <Container>
            <Row>
                <Col>
                    <h1>Successfully order placed</h1>
                </Col>
            </Row>
        </Container>
      </section>
    </div>
  )
}

export default success
