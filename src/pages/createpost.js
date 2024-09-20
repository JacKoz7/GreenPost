import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../App.css";
import * as Yup from "yup";
import axios from "axios";

function CreatePost() {
  const initialValues = {
    title: "",
    postText: "",
    Username: "",
  };
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
        console.log("It works!");
      });
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title!"),
    postText: Yup.string().required("You must input a post!"),
    Username: Yup.string()
      .min(3)
      .max(15)
      .required("You must input a username!"),
  });
  return (
    <div className="createPostPage">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
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
            placeholder="(Ex. Post...)"
          />
          <label>Username:</label>
          <ErrorMessage name="Username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Username"
            placeholder="(Ex. John...)"
          />

          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
