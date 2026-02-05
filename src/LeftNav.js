import React from 'react'
import { Col, Container, Row, Navbar, Nav } from 'react-bootstrap'
import pixel from './pixel-logo.png'
import { Link } from 'react-router'
const LeftNav = () => {
    return (
        <div>
            <section>
                <Container>
                    <Row>
                        <Col>
                            <img src={pixel}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ul>
                                <li><Link to = {'/dashboard'}>Dashboard</Link></li>
                                <li><Link to = {'/reports'}>Reports</Link></li>
                                <li>Products</li>
                                <li>Orders</li>
                                <li>Customers</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default LeftNav
