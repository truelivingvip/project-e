import React from 'react'
import { Col, Container, Row, Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router'
import LeftNav from './LeftNav'
const Sales = () => {
    return (
        <div>
            <section>
                <Container>
                    <Row>
                        <Col md={3}>
                            <LeftNav></LeftNav>

                        </Col>
                        <Col md={9}>
                            <Row>
                                <Col>
                                    <h2>Sales</h2>
                                    <Breadcrumb>
                                        <Breadcrumb.Item><Link to={'/Dashboard'}>Dashboard</Link></Breadcrumb.Item>

                                        <Breadcrumb.Item active>Sales</Breadcrumb.Item>
                                    </Breadcrumb>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default Sales
