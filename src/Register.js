import React from 'react'
import React, { useState } from "react";
import { Col, Container, Row } from 'react-bootstrap'

const Register = () => {
    
    return (
        <div>
            <section>
                <Container>
                    <Row>
                        <Col>
                            <div style={{ width: "300px", margin: "auto" }}>
                                <h2>Register Form</h2>

                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    /><br /><br />

                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    /><br /><br />

                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    /><br /><br />

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    /><br /><br />

                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    /><br /><br />

                                    <button type="submit">Register</button>
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
