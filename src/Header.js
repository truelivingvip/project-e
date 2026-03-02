import React from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import snap from './snap.png'
import { TfiBasketball } from "react-icons/tfi";
import { TfiHelpAlt } from "react-icons/tfi";
import { RiShoppingBag3Line } from "react-icons/ri";
import { BsCartDash } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdArrowOutward } from "react-icons/md";
import { Link } from 'react-router'

// import 'react-app-polyfill/ie11';
// import * as React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import Category from './Category';

// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const Header = () => {
  return (
    <div>
      <section className='free'>
        <Container>
          <Row>
            <Col>
              <div className='fre'>
                <ul>
                  <li><h6>FREE Delivery</h6></li>
                  <li><h6>7Days Easy Returns</h6></li>
                  <li><h6>Best Prices</h6></li>
                </ul>
              </div>
            </Col>
            <Col>
              <div className='our'>
                <ul>
                  <li><a href='#'><RiShoppingBag3Line /> Sell on Snapdeal</a></li>
                  <li><a href='#'><TfiHelpAlt /> Help Center</a></li>
                  <li><a href='#'><TfiBasketball /> Our Blog</a></li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='snap'>
        <Container>
          <Row>
            <Col>
              <img src={snap} />
            </Col>
            <Col>
              <Form className="bar">
                <Form.Control
                  type="search"
                  placeholder="Search for Brands & Products"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
            </Col>
            <Col>
              <div className='snap1'>
                <ul>
                  <li><a href='#'><BsCartDash /> My Cart</a></li>
                  <li><a href='#'><CgProfile /> Login</a>
                    <Formik
                      initialValues={{ email: "", password: "" }}
                      validationSchema={LoginSchema}
                      onSubmit={(values) => {
                        console.log(values);
                        alert("Login Successful");
                      }}
                    >
                      {({
                        handleSubmit,
                        handleChange,
                        values,
                        errors,
                        touched,
                      }) => (
                        <Form noValidate onSubmit={handleSubmit}>

                          {/* Email */}
                          <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              placeholder="Enter email"
                              value={values.email}
                              onChange={handleChange}
                              isInvalid={touched.email && errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* Password */}
                          <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={values.password}
                              onChange={handleChange}
                              isInvalid={touched.password && errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Button variant="primary" type="submit">
                            Submit
                          </Button>

                        </Form>
                      )}
                    </Formik>
                  </li>
                </ul>
              </div>
            </Col>
            <Col>
              <Button className='app' variant="primary" size="lg" href='https://play.google.com/store/search?q=snapdeal&c=apps&pli=1'><MdArrowOutward />
                Download App
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='cate'>
        <Container fluid>
          <Row>
            <Col>
              <ul>
                <li>
                  <h6><Link to={"/Category/Men's Fashion"}><img src="https://g.sdlcdn.com/imgs/l/c/0/mensnavigationwebhome-92990.jpeg" />Men's Fashion</Link>
                  </h6>
                </li>
                <li>
                  <h6><Link to={"/Category/Women's Fashion"}><img src="https://g.sdlcdn.com/imgs/l/c/1/WoMen_sitenavne-d9da9.jpeg" />
                    Women's Fashion</Link></h6>
                </li>
                <li>
                  <h6><Link to={"/Category/Home & Kitchen"}><img src="https://g.sdlcdn.com/imgs/l/c/1/homesiteiconne-d6c37.jpeg" />
                    Home & Kitchen</Link></h6>
                </li>
                <li>
                  <h6><Link to={"/Category/Kid's Fashion"}><img src="https://g.sdlcdn.com/imgs/l/c/1/kidshomeico-c52fa.jpeg" />
                    Kid's Fashion</Link></h6>
                </li>
                <li>
                  <h6><Link to={"/Category/Beauty & Health"}><img src="https://g.sdlcdn.com/imgs/l/c/1/Beauty_Site_homene-162a5.jpeg" />
                    Beauty & Health</Link></h6>
                </li>
                <li>
                  <h6><Link to={"/Category/Automotives"}><img src="https://g.sdlcdn.com/imgs/l/d/h/Automotive1-56b92.jpg" />
                    Automotives</Link></h6>
                </li>
                <li>
                  <h6><Link to={"/Category/Mobile Accessories"}><img src="https://g.sdlcdn.com/imgs/l/d/h/MobileAccessories1-32874.jpg" />
                    Mobile Accessories</Link></h6>
                </li>
                {/* <li>
                  <h6><img src="https://g.sdlcdn.com/imgs/l/d/h/elctronic1-cbb06.jpg" />
                    Electronics</h6>
                </li>
                <li>
                  <h6><img src="https://g.sdlcdn.com/imgs/l/d/h/sportsandfitnes1-b8667.jpg" />
                    Sports & Fitness</h6>
                </li> */}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
    </div >
  )
}

export default Header
