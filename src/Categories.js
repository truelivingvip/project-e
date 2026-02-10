import React from 'react'
import { Col, Container, Row, Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router'
import LeftNav from './LeftNav'
const Categories = () => {
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
                                    <h2>Categories</h2>
                                    <Breadcrumb>
                                        <Breadcrumb.Item><Link to={'/Dashboard'}>Dashboard</Link></Breadcrumb.Item>

                                        <Breadcrumb.Item active>Categories</Breadcrumb.Item>
                                    </Breadcrumb>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h1>Product Category Section</h1>
                                </Col>
                            </Row>
                            <Row>
                                <div className='product'>
                                    <Col>
                                        <Row>
                                            <div className='sofa'>
                                                <Col>
                                                    <h3>Home & Living</h3>
                                                    <h1>SOFA</h1>
                                                </Col>
                                            </div>
                                            <Col>

                                            </Col>
                                        </Row>

                                    </Col>
                                    <Col>

                                    </Col>
                                    <Col>

                                    </Col>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default Categories
