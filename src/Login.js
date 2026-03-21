// import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),

            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required")
        }),

        onSubmit: (values) => {
            console.log(formik.errors);
            console.log(formik.values);
            console.log("Login Data:", values);
        }
    });

    return (
        <div style={{ width: "300px", margin: "50px auto" }}>
            <h2>Login Form</h2>

            <form onSubmit={formik.handleSubmit}>

                {/* Email */}
                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <p style={{ color: "red" }}>{formik.errors.email}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label>Password:</label><br />
                    <input
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <p style={{ color: "red" }}>{formik.errors.password}</p>
                    )}
                </div>

                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
export default Login;