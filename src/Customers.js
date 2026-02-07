import React from 'react'
import { Col, Container, Row, Breadcrumb, Table } from 'react-bootstrap'
import { Link } from 'react-router'
import LeftNav from './LeftNav'
const Customers = () => {
    const customers = [
        {
            "id": 1,
            "name": "Vipul Kumar",
            "mobile": 7061569926,
            "e-mail": "vipul@gmail.com",
            "status": "Active"
        },
        {
            "id": 2,
            "name": "Yash Kumar",
            "mobile": 9122278602,
            "e-mail": "yash@gmail.com",
            "status": "Active"
        },
        {
            "id": 3,
            "name": "Vidut Kumar",
            "mobile": 7061569926,
            "e-mail": "niteshmechanical629@gmail.com",
            "status": "Active"
        },
        {
            "id": 4,
            "name": "Adarsh Kumar",
            "mobile": 7061569926,
            "e-mail": "niteshmechanical629@gmail.com",
            "status": "Active"
        },
        {
            "id": 4,
            "name": "Adarsh Kumar",
            "mobile": 7061569926,
            "e-mail": "niteshmechanical629@gmail.com",
            "status": "Active"
        },
        {
            "id": 4,
            "name": "Adarsh Kumar",
            "mobile": 7061569926,
            "e-mail": "niteshmechanical629@gmail.com",
            "status": "Active"
        },
        {
            "id": 4,
            "name": "Adarsh Kumar",
            "mobile": 7061569926,
            "e-mail": "niteshmechanical629@gmail.com",
            "status": "Active"
        },
        {
            "id": 4,
            "name": "Adarsh Kumar",
            "mobile": 7061569926,
            "e-mail": "niteshmechanical629@gmail.com",
            "status": "Active"
        },
        {
            "id": 4,
            "name": "Adarsh Kumar",
            "mobile": 7061569926,
            "e-mail": "niteshmechanical629@gmail.com",
            "status": "Active"
        },
        {
            "id": 4,
            "name": "Adarsh Kumar",
            "mobile": 7061569926,
            "e-mail": "niteshmechanical629@gmail.com",
            "status": "Active"
        },
        {
            "id": 4,
            "name": "Adarsh Kumar",
            "mobile": 7061569926,
            "e-mail": "niteshmechanical629@gmail.com",
            "status": "Active"
        },
        {
            "id": 4,
            "name": "Adarsh Kumar",
            "mobile": 7061569926,
            "e-mail": "niteshmechanical629@gmail.com",
            "status": "Active"
        },
        {
            "id": 4,
            "name": "Adarsh Kumar",
            "mobile": 7061569926,
            "e-mail": "niteshmechanical629@gmail.com",
            "status": "Active"
        },
        {
            "id": 4,
            "name": "Adarsh Kumar",
            "mobile": 7061569926,
            "e-mail": "niteshmechanical629@gmail.com",
            "status": "Active"
        }
    ]
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
                                    <h2>Customers</h2>
                                    <Breadcrumb>
                                        <Breadcrumb.Item><Link to={'/Dashboard'}>Dashboard</Link></Breadcrumb.Item>

                                        <Breadcrumb.Item active>Customers</Breadcrumb.Item>
                                    </Breadcrumb>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Mobile</th>
                                                <th>E-mail</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                customers.map((customer, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{customer.id}</td>
                                                            <td>{customer.name}</td>
                                                            <td>{customer.mobile}</td>
                                                            <td>{customer['e-mail']}</td>
                                                            <td>{customer.status}</td>
                                                        </tr>
                                                    )
                                                }
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default Customers
