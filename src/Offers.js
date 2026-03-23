import React from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'

import { Col, Container, Row, Breadcrumb } from 'react-bootstrap'
// import { Link } from 'react-router'
import LeftNav from './LeftNav'
import { useDispatch, useSelector } from 'react-redux'

const Offers = () => {
    const dispatch = useDispatch();
    let navigate=useNavigate();
    const { user: currentUser } = useSelector((state) => state.auth)
    console.log(currentUser)
    useEffect(()=>{
        currentUser && currentUser.roles[0]==="ROLE_ADMIN"?
        console.log(currentUser)
        :
        navigate('/login');
    },[currentUser]);
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
                                    <h2>Offers</h2>
                                    <Breadcrumb>
                                        <Breadcrumb.Item><Link to={'/Dashboard'}>Dashboard</Link></Breadcrumb.Item>

                                        <Breadcrumb.Item active>Offers</Breadcrumb.Item>
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

export default Offers
