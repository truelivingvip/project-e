import React from 'react'
import { Col, Container, Row, Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router'
import LeftNav from './LeftNav'
import { useDispatch, useSelector } from 'react-redux'

const Settings = () => {
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth)
    console.log(currentUser)
    
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
                                    <h2>Settings</h2>
                                    <Breadcrumb>
                                        <Breadcrumb.Item><Link to={'/Dashboard'}>Dashboard</Link></Breadcrumb.Item>

                                        <Breadcrumb.Item active>Settings</Breadcrumb.Item>
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

export default Settings
