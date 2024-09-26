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
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          <label>Username:</label>
          <ErrorMessage name="Username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Username"
            placeholder="(Ex. John...)"
          />
          <label>Password:</label>
          <ErrorMessage name="Password" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Password"
            placeholder="Your password"
            type="password"
          />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
