import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../App.css";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, [authState, navigate]); // without [] use effect will run inifinitly

  const onSubmit = (data) => {
    axios
      .post("https://greenpostapp-7e2958a55f01.herokuapp.com/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/");
      });
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title!"),
    postText: Yup.string().required("You must input a post!"),
  });
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label>Title:</label>
          <ErrorMessage name="title" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Post:</label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(Write what's on your mind)"
          />

          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
