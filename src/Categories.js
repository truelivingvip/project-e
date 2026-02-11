import React from 'react'
import { Col, Container, Row, Breadcrumb,Card,Button} from 'react-bootstrap'
import { Link } from 'react-router'
import LeftNav from './LeftNav'
import sofa from './sofa.webp';
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
                                <div className='pro'>
                                    <h1>Product Category Section</h1>
                                </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={sofa}/>
                                        <Card.Body>
                                            <Card.Title>Home & Living</Card.Title>
                                            <Button variant="primary">Buy Now</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default Categories
