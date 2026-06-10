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
              <div className="login-container">
                     <div className="login-card">

                            <h3 className="login-title">Login to Snapdeal</h3>

                            {message && (
                                   <div
                                          className={`alert ${successful ? "alert-success" : "alert-danger"
                                                 }`}
                                   >
                                          {message}
                                   </div>
                            )}

                            <Formik
                                   initialValues={{
                                          username: "",
                                          password: "",
                                   }}
                                   validationSchema={LoginSchema}
                                   onSubmit={handleLogin}
                            >
                                   {({ errors, touched }) => (
                                          <Form>

                                                 <label className="login-label">
                                                        Mobile Number
                                                 </label>

                                                 <Field
                                                        name="username"
                                                        type="text"
                                                        placeholder="Enter Mobile Number"
                                                        className="login-input"
                                                 />

                                                 {errors.username && touched.username && (
                                                        <div className="error-text">
                                                               {errors.username}
                                                        </div>
                                                 )}

                                                 <label className="login-label">
                                                        Password
                                                 </label>

                                                 <Field
                                                        name="password"
                                                        type="password"
                                                        placeholder="Enter Password"
                                                        className="login-input"
                                                 />

                                                 {errors.password && touched.password && (
                                                        <div className="error-text">
                                                               {errors.password}
                                                        </div>
                                                 )}

                                                 <Button
                                                        type="submit"
                                                        className="login-btn"
                                                        disabled={loading}
                                                 >
                                                        {loading ? "Logging in..." : "LOGIN"}
                                                 </Button>

                                                 <div className="register-link">
                                                        New User? <a href="/register">Register</a>
                                                 </div>

                                          </Form>
                                   )}
                            </Formik>

                     </div>
              </div>
       )
}

export default Login
