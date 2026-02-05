import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import LeftNav from './LeftNav'

const AdminDashboard = () => {
  return (
    <div>
      <section>
        <Container>
            <Row>
                <Col md={3}>
                <LeftNav></LeftNav>
                </Col>
                <Col md={9}>
                <p>Rightside</p>
                </Col>
            </Row>
        </Container>
      </section>
    </div>
  )
}

export default AdminDashboard
