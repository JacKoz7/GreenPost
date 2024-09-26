import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../App.css";
import * as Yup from "yup";
import axios from "axios";

function Registration() {
  const initialValues = {
    Username: "",
    Password: "",
  };

  const validationSchema = Yup.object().shape({
    Password: Yup.string()
      .min(6)
      .max(15)
      .required("You must input a password!"),
    Username: Yup.string()
      .min(3)
      .max(15)
      .required("You must input a username!"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      console.log("It works!");
    });
  };

  return (
    <div className="registration-container">
      <h2 className="registration-title">Register</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="registration-form">
          <label className="registration-label">Username:</label>
          <ErrorMessage name="Username" component="span" className="registration-error" />
          <Field
            autoComplete="off"
            className="registration-input"
            name="Username"
            placeholder="(Ex. John...)"
          />
          <label className="registration-label">Password:</label>
          <ErrorMessage name="Password" component="span" className="registration-error" />
          <Field
            autoComplete="off"
            className="registration-input"
            name="Password"
            placeholder="Your password"
            type="password"
          />
          <button type="submit" className="registration-button">Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;