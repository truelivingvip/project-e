import React from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useEffect } from "react";

const Address1 = () => {
  // const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth)
  console.log(currentUser)
  useEffect(() => {
    currentUser ?
      console.log(currentUser)
      :
      navigate('/login');
  }, [currentUser]);

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
  const data = {
    userId: currentUser.id,
  }
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
    },
    validationSchema: addressSchema,
    onSubmit: (values) => {
      console.log("Form Data:", values);
      try {
        const response = axios.post(`http://localhost:8090/api/addresses/user/${currentUser.id}`, data)
        // console.log("Success:", response.data)
        alert("Address saved successfully!");
      } catch (error) {
        console.error("Axios Error:", error.response ?
          error.response.data : error.message);
        alert("Backend Not Connected")
      }
    },
  });
  return (
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
  )
}

export default Address1
