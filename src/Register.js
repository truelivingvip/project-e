import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Col, Row, Button } from "react-bootstrap";

import { register } from "./slices/auth";
import { clearMessage } from "./slices/message";
import { useDispatch, useSelector } from "react-redux";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  username: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10 Digit Mobile No. ")
    .required("Mobile No. is Mandetory!"),
});

const Register = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
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
  const handleRegister = (formValue) => {
    console.log(formValue);
    const { firstName, lastName, username, email, password } = formValue;
    setSuccessful(false);
    dispatch(register({ firstName, lastName, username, email, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };
  return (
    <div className="text-center">
      <h3>___Register___</h3>
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
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          username: "",
        }}
        validationSchema={SignupSchema}
        // onSubmit={values => {
        // same shape as initial values
        // console.log(values);
        // }}
        onSubmit={handleRegister}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="registerform">
              <Row>
                <Col md={4}>
                  <label>First Name : </label>
                </Col>
                <Col md={8}>
                  <Field name="firstName" />
                  {errors.firstName && touched.firstName ? (
                    <div>{errors.firstName}</div>
                  ) : null}
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <label>Last Name : </label>
                </Col>
                <Col md={8}>
                  <Field name="lastName" />
                  {errors.lastName && touched.lastName ? (
                    <div>{errors.lastName}</div>
                  ) : null}
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <label>Email : </label>
                </Col>
                <Col md={8}>
                  <Field name="email" type="email" />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <label>Password</label>
                </Col>
                <Col md={8}>
                  <Field name="password" type="password" />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <label>Mobile : </label>
                </Col>
                <Col md={8}>
                  <Field name="username" type="number" />
                  {errors.username && touched.username ? (
                    <div>{errors.username}</div>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button className="button" type="submit" align-items center>
                    Sign up
                  </Button>
                  <p>
                    if already register <a href="Login">login</a>
                  </p>
                </Col>
              </Row>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
