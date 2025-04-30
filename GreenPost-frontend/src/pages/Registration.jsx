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
    Username: Yup.string()
      .min(3, "Username musi mieć co najmniej 3 znaki")
      .required("Username jest wymagany"),
    
    Password: Yup.string()
      .min(4, "Hasło musi mieć co najmniej 4 znaki")
      .required("Hasło jest wymagane"),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/auth", data)
      .then(() => {
        toast.success("Konto utworzone pomyślnie!");
      })
      .catch((error) => {
        if (error.response && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Błąd podczas rejestracji");
        }
      });
  };

  return (
    <div className="registration-container">
      <ToastContainer />
      <h2 className="registration-title">Rejestracja</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="registration-form">
          <label className="registration-label">Username:</label>
          <Field
            autoComplete="off"
            className="registration-input"
            name="Username"
            placeholder="Nazwa użytkownika"
          />
          <ErrorMessage
            name="Username"
            component="span"
            className="registration-error"
          />

          <label className="registration-label">Hasło:</label>
          <Field
            autoComplete="off"
            className="registration-input"
            name="Password"
            placeholder="Twoje hasło"
            type="password"
          />
          <ErrorMessage
            name="Password"
            component="span"
            className="registration-error"
          />

          <button type="submit" className="registration-button">
            Zarejestruj
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;