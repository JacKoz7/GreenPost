import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../App.css";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Registration() {
  const initialValues = {
    Username: "",
    Password: "",
  };

  const validationSchema = Yup.object().shape({
    Password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .max(15, "Password cannot exceed 15 characters")
      .required("You must input a password!"),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/auth", data)
      .then((response) => {
        toast.success("Account created successfully!");
      })
      .catch((error) => {
        if (error.response && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error(
            "Password must be at least 6 characters long and cannot exceed 15 characters"
          );
        }
      });
  };

  return (
    <div className="registration-container">
      <ToastContainer />
      <h2 className="registration-title">Register</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="registration-form">
          <label className="registration-label">Username:</label>
          <ErrorMessage
            name="Username"
            component="span"
            className="registration-error"
          />
          <Field
            autoComplete="off"
            className="registration-input"
            name="Username"
            placeholder="(Ex. John...)"
          />
          <label className="registration-label">Password:</label>
          <ErrorMessage
            name="Password"
            component="span"
            className="registration-error"
          />
          <Field
            autoComplete="off"
            className="registration-input"
            name="Password"
            placeholder="Your password"
            type="password"
          />
          <button type="submit" className="registration-button">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
