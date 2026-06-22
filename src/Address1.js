import React, { useState } from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux'


const Address1 = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth)
  console.log(currentUser)
  useEffect(() => {
    currentUser ?
      console.log(currentUser)
      :
      navigate('/login');
  }, [currentUser]);

  const SignupSchema = Yup.object().shape({
    addressId: Yup.string()
      .required('Required'),

  });

  const addressSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name too short")
      .required("Full name is required"),

    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone is required"),

    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Invalid pincode")
      .required("Pincode is required"),

    state: Yup.string().required("State is required"),

    city: Yup.string().required("City is required"),

    addressLine_1: Yup.string()
      .min(10, "Address too short")
      .required("Address is required"),

    addressLine_2: Yup.string()
      .min(1, "Address too short")
      .required("Address is required"),

    landmark: Yup.string(),

    addressType: Yup.string().required("Select address type"),
  });
  // const data = {
  //   userId: currentUser.id,
  // }

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      pincode: "",
      state: "",
      city: "",
      addressLine_1: "",
      addressLine_2: "",
      landmark: "",
      addressType: "",
      selectedAddresses: []
    },
    validationSchema: addressSchema,
    onSubmit: async (values) => {
      console.log("Form Data:", values);
      try {
        const dataToSend = { ...values, userId: currentUser.id };
        const response = await axios.post("http://localhost:8090/api/addresses", dataToSend);
        // console.log("Success:", response.data)
        alert("Address saved successfully!");
      } catch (error) {
        console.error("Axios Error:", error.response ?
          error.response.data : error.message);
        alert("Backend Not Connected")
      }
    },
  });

  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      axios
        .get(`http://localhost:8090/api/addresses/user/${currentUser.id}`)
        .then((res) => {
          console.log(res.data);
          setAddresses(res.data);
        })
        .catch((error) => {
          console.log("Error-fetching Data");
        });
    }

  }, []);
  const [cartItems, setcartItems] = useState([]);
  useEffect(() => {
    if (currentUser && currentUser.id) {
      axios
        .get(`http://localhost:8090/api/carts/user/${currentUser.id}`)
        .then((res) => {
          console.log(res.data);
          setcartItems(res.data);
        })
        .catch((error) => {
          console.log("Error-fetching Data");
        });
    }

  }, []);

  return (
    <section>
      <Container>
        <Row className='mt-4'>
          <Col md={8}>
            <div className="address-container">
              <h2 className="title">Delivery Address</h2>

              <form onSubmit={formik.handleSubmit} className="form">

                {/* Row 1 */}
                <div className="row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input {...formik.getFieldProps("name")} />
                    {formik.touched.name && formik.errors.name && (
                      <span className="error">{formik.errors.name}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Phone</label>
                    <input {...formik.getFieldProps("phone")} />
                    {formik.touched.phone && formik.errors.phone && (
                      <span className="error">{formik.errors.phone}</span>
                    )}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="row">
                  <div className="form-group">
                    <label>Pincode</label>
                    <input {...formik.getFieldProps("pincode")} />
                    {formik.touched.pincode && formik.errors.pincode && (
                      <span className="error">{formik.errors.pincode}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>State</label>
                    <input {...formik.getFieldProps("state")} />
                    {formik.touched.state && formik.errors.state && (
                      <span className="error">{formik.errors.state}</span>
                    )}
                  </div>
                </div>

                {/* Row 3 */}
                <div className="row">
                  <div className="form-group">
                    <label>City</label>
                    <input {...formik.getFieldProps("city")} />
                    {formik.touched.city && formik.errors.city && (
                      <span className="error">{formik.errors.city}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Address Type</label>
                    <select {...formik.getFieldProps("addressType")}>
                      <option value="">Select</option>
                      <option value="home">Home</option>
                      <option value="work">Work</option>
                    </select>
                    {formik.touched.addressType && formik.errors.addressType && (
                      <span className="error">{formik.errors.addressType}</span>
                    )}
                  </div>
                </div>


                <div className="form-group">
                  <label>Address Line 1</label>
                  <textarea {...formik.getFieldProps("addressLine_1")} />
                  {formik.touched.addressLine_1 && formik.errors.addressLine_1 && (
                    <span className="error">{formik.errors.addressLine_1}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Address Line 2</label>
                  <textarea {...formik.getFieldProps("addressLine_2")} />
                  {formik.touched.addressLine_2 && formik.errors.addressLine_2 && (
                    <span className="error">{formik.errors.addressLine_2}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Landmark (Optional)</label>
                  <input {...formik.getFieldProps("landmark")} />
                </div>

                <button type="submit" className="stn">
                  Save Address
                </button>
              </form>
            </div>
          </Col>

          <Col md={2}>
            <div className="saved-address-section">

              <h4 className="saved-title">
                Saved Addresses
              </h4>

              <Formik
                initialValues={{
                  addressId: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                  // same shape as initial values
                  console.log(values);
                  const data = {
                    addressId: values.addressId,
                    userId: currentUser.id,
                    items: cartItems.items
                  }
                  console.log(data)
                  axios.post("http://localhost:8090/api/orders", data).then((response) => {
                    console.log("Order Confirmed");
                    console.log(response)
                  }
                  )
                  axios
                    .delete(`http://localhost:8090/api/carts/user/${currentUser.id}`)
                    .then((res) => {
                      console.log("Successfully deleted");
                      window.location.reload()
                    })
                    .catch((error) => {
                      console.log("Error");
                    });

                  navigate('/Success');

                }}
              >
                {({ errors, touched }) => (
                  <Form>

                    {addresses && addresses.length ?
                      addresses.map((addr, index) => (
                        <div
                          className="address-card"
                          key={index}
                        >
                          <Field
                            type="radio"
                            name="addressId"
                            value={String(addr.id)}
                          />

                          <h5>{addr.name}</h5>

                          <p>{addr.addressLine_1}</p>

                          <p>{addr.city}</p>

                          <p>{addr.state}</p>
                          <p>{addr.pincode}</p>
                          <p>{addr.addressType}</p>
                        </div>
                      ))
                      :
                      "Address Not Available"
                    }

                    <button
                      type="submit"
                      className="continue-btn"
                    >
                      Continue
                    </button>

                  </Form>
                )}
              </Formik>

            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Address1
