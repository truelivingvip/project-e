import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { login } from "./slices/auth";
import { clearMessage } from "./slices/message";
// import './Login.css';
const LoginSchema = Yup.object().shape({
       username: Yup.string()
              .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
              .required('Mobile number is required'),
       password: Yup.string()
              .min(8, 'Password must be at least 8 characters')
              .required('Password is required'),
});


const Login = () => {
       const dispatch = useDispatch();
       const navigate = useNavigate();

       const [loading, setLoading] = useState(false);
       const [successful, setSuccessful] = useState(false);

       const { isLoggedIn } = useSelector((state) => state.auth);
       const { message } = useSelector((state) => state.message);
       useEffect(() => {
              if (message) {
                     const timer = setTimeout(() => {
                            dispatch(clearMessage());
                     }, 3000);

                     return () => clearTimeout(timer);
              }
       }, [message, dispatch]);
       useEffect(() => {
              dispatch(clearMessage());
       }, [dispatch]);

       const handleLogin = (formValue) => {
              const { username, password } = formValue;
              setLoading(true);

              dispatch(login({ username, password }))
                     .unwrap()
                     .then(() => {
                            navigate("/home");
                     })
                     .catch(() => {
                            setLoading(false);
                     });
       };

       if (isLoggedIn) {
              return <Navigate to="/home" />;
       }
       return (
              <div className='text-center'>
                     <section>
                            <Container>
                                   <Row>
                                          <Col>
                                                 <h3>Login</h3>
                                                 {message && (
                                                        <div
                                                               className={`alert ${successful ? "alert-success" : "alert-danger"}`}
                                                               role="alert"
                                                        >
                                                               {message}
                                                        </div>
                                                 )}
                                                 <Formik
                                                        initialValues={{
                                                               username: '',
                                                               password: ''
                                                        }}
                                                        validationSchema={LoginSchema}
                                                        onSubmit={handleLogin}
                                                 >
                                                        {({ errors, touched }) => (
                                                               <Form>
                                                                      <div className='loginform'>
                                                                             <Row>
                                                                                    <Col>
                                                                                           <label>Mobile :-</label>
                                                                                           <Field name="username" placeholder="Enter Mobile" type="text" />
                                                                                           {errors.username && touched.username ? <div>{errors.username}</div> : null}

                                                                                    </Col>
                                                                             </Row>

                                                                             <Row>
                                                                                    <Col>
                                                                                           <label>Password :-</label>
                                                                                           <Field name="password" placeholder="Enter Password" type="password" />
                                                                                           {errors.password && touched.password ? <div>{errors.password}</div> : null}

                                                                                    </Col>
                                                                             </Row>
                                                                             <Row>

                                                                                    <Col>
                                                                                           <p>New user? <a href='Register'> Register</a></p>

                                                                                           <Button className="but" type="submit">Login</Button>
                                                                                    </Col>
                                                                             </Row>
                                                                      </div>


                                                               </Form>
                                                        )}
                                                 </Formik>
                                          </Col>
                                   </Row>
                            </Container>
                     </section>
              </div>
       )
}

export default Login
