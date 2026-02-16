import React from 'react'
import { Col, Container, Row, Breadcrumb, Table } from 'react-bootstrap'
import { Link } from 'react-router'
import LeftNav from './LeftNav'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
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
    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.number()
            .required('Number is required')
            .min(1, 'Minimum value is 1')
            .positive('Must be a positive number')
            .integer('Must be an integer'),
        email: Yup.string().email('Invalid email').required('Required'),
    });
    return (
        <div>
            <section>
                <Container>
                    <Row>
                        <Col md={3}>
                            <LeftNav></LeftNav>

                        </Col>
                        <Col md={8}>
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
                        <Col md={1}>
                            <div className='add'>
                                <h3>Customers</h3>
                                <Formik
                                    initialValues={{
                                        firstName: '',
                                        lastName: '',
                                        email: '',
                                    }}
                                    validationSchema={SignupSchema}
                                    onSubmit={values => {
                                        // same shape as initial values
                                        console.log(values);
                                    }}
                                >
                                    {({ errors, touched }) => (
                                        <Form>
                                            <label htmlFor='firstName'>Name</label>
                                            <Field name="firstName" />
                                            {errors.firstName && touched.firstName ? (
                                                <div>{errors.firstName}</div>
                                            ) : null}
                                            <label htmlFor='lastName'>Mobile</label>
                                            <Field name="lastName" />
                                            {errors.lastName && touched.lastName ? (
                                                <div>{errors.lastName}</div>
                                            ) : null}
                                            <label htmlFor='email'>Email</label>
                                            <Field name="email" type="email" />
                                            {errors.email && touched.email ? <div>{errors.email}</div> : null}
                                            <button type="submit">ADD</button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default Customers
