import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import { Formik, Form, Field } from 'formik';
//  import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   lastName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),

});

const Address1 = () => {
  
  
  return (
    <div>
     <h1>Address</h1>
     <Formik
       initialValues={{
         Name: '',
         addresLine_1: '',
         addresLine_2: '',
         city:'',
         district:'',
         state:'',
         pin:'',
         mobile:'',
         email: '',
       }}
       validationSchema={SignupSchema}
       onSubmit={values => {
         // same shape as initial values
         console.log(values);
       }}
     >
       {({ errors, touched }) => (
         <Form>
            <label>Name</label>
           <Field name="Name" />
           {errors.Name && touched.Name ? (
             <div>{errors.Name}</div>
           ) : null}
           <label>Address Line 1</label>
           <Field name="addresLine_1" />
           {errors.addresLine_1 && touched.addresLine_1 ? (
             <div>{errors.addresLine_1}</div>
           ) : null}
           <label>Address Line 2</label>
           <Field name="addresLine_2" />
           {errors.addresLine_2 && touched.addresLine_2 ? (
             <div>{errors.addresLine_2}</div>
           ) : null}
            <label>E-Mail</label>
           <Field name="email" type="email" />
           {errors.email && touched.email ? <div>{errors.email}</div> : null}
           <button type="submit">Submit</button>
         </Form>
       )}
     </Formik>
   </div>

  );
};

export default Address1;
