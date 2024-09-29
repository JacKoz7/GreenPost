import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../App.css";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";

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

  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      toast.success("Account created successfully!");

      // Automatically log in the user after successful registration
      axios.post("http://localhost:3001/auth/login", data).then((loginResponse) => {
        if (loginResponse.data.error) {
          toast.error(loginResponse.data.error);
        } else {
          localStorage.setItem("accessToken", loginResponse.data.token);
          setAuthState({
            Username: loginResponse.data.Username,
            id: loginResponse.data.id,
            status: true,
          });
          navigate("/");
        }
      });
    }).catch((error) => {
      toast.error("An error occurred. Please try again.");
    });
  };

  return (
    <div className="registration-container">
      <ToastContainer />
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