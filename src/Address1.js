import React from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useSelector} from 'react-redux';
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
    onSubmit: async (values) => {
      console.log("Form Data:", values);
      try{
        const response = await axios.post(`http://localhost:8090/api/addresses/user/${currentUser.id}`, values)
        console.log("Success:",response.data)
        alert("Address saved successfully!");
      } catch (error) {
        console.error("Axios Error:", error.response ?
      error.response.data:error.message);
        alert("Backend Not Connected")
      }
    },
  });
  return (
    <div className="container">
      <h2>Delivery Address</h2>

      <form onSubmit={formik.handleSubmit}>
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name && (
          <p>{formik.errors.name}</p>
        )}

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          {...formik.getFieldProps("phone")}
        />
        {formik.touched.phone && formik.errors.phone && (
          <p>{formik.errors.phone}</p>
        )}

        {/* Pincode */}
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          {...formik.getFieldProps("pincode")}
        />
        {formik.touched.pincode && formik.errors.pincode && (
          <p>{formik.errors.pincode}</p>
        )}

        {/* State */}
        <input
          type="text"
          name="state"
          placeholder="State"
          {...formik.getFieldProps("state")}
        />
        {formik.touched.state && formik.errors.state && (
          <p>{formik.errors.state}</p>
        )}

        {/* City */}
        <input
          type="text"
          name="city"
          placeholder="City"
          {...formik.getFieldProps("city")}
        />
        {formik.touched.city && formik.errors.city && (
          <p>{formik.errors.city}</p>
        )}

        {/* Address */}
        <textarea
          name="addressLine_1"
          placeholder="addressLine_1"
          {...formik.getFieldProps("addressLine_1")}
        />
        {formik.touched.addressLine_1 && formik.errors.addressLine_1 && (
          <p>{formik.errors.addressLine_1}</p>
        )}

        <textarea
          name="addressLine_2"
          placeholder="addressLine_2"
          {...formik.getFieldProps("addressLine_2")}
        />
        {formik.touched.addressLine_2 && formik.errors.addressLine_2 && (
          <p>{formik.errors.addressLine_2}</p>
        )}

        {/* Landmark */}
        <input
          type="text"
          name="landmark"
          placeholder="Landmark (optional)"
          {...formik.getFieldProps("landmark")}
        />

        {/* Address Type */}
        <select name="addressType" {...formik.getFieldProps("addressType")}>
          <option value="">Select Type</option>
          <option value="home">Home</option>
          <option value="work">Work</option>
        </select>
        {formik.touched.addressType && formik.errors.addressType && (
          <p>{formik.errors.addressType}</p>
        )}

        <button type="submit">Save Address</button>
      </form>
    </div>
  )
}

export default Address1
