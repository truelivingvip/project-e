// import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import React, { useState } from "react";

const Register = () => {
    const formik = useFormik({
            initialValues: {
                ProductName: '',
                price: '',
                categories: '',
                image: '',
    
            },
            onSubmit: values => {
                alert(JSON.stringify(values, null, 2));
            },
        });
    return (
        <div>
            <section>
                <Container>
                    <Row>
                        <Col>
                            <div style={{ width: "300px", margin: "auto" }}>
                                <h2>Register Form</h2>

                                <form onSubmit={formik.handleSubmit}>
                                    <Row>
                                        <Col>
                                            <label htmlFor="firstName">First Name</label>
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={formik.values.firstName}
                                            />
                                            {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label htmlFor="lastName">Last Name</label>
                                            <input
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={formik.values.lastName}
                                            />
                                            {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label htmlFor="username">User Name</label>
                                            <input
                                                id="username"
                                                name="username"
                                                type="number"
                                                onChange={formik.handleChange}
                                                value={formik.values.lastName}
                                            />
                                            {formik.errors.username ? <div>{formik.errors.username}</div> : null}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label htmlFor="email">Email</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                onChange={formik.handleChange}
                                                value={formik.values.email}
                                            />
                                            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label htmlFor="password">Password</label>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                onChange={formik.handleChange}
                                                value={formik.values.password}
                                            />
                                            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                                        </Col>
                                    </Row>
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default Register
