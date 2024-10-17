import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../App.css";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);  // State to hold the image file

  const initialValues = {
    title: "",
    postText: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, [authState, navigate]); 

  const onSubmit = (data) => {
    const formData = new FormData(); // Create a FormData object
    formData.append("title", data.title);
    formData.append("postText", data.postText);
    if (imageFile) {
      formData.append("image", imageFile);  // Append the image file if exists
    }

    axios
      .post("http://localhost:3001/posts", formData, {
        headers: { 
          accessToken: localStorage.getItem("accessToken"),
          "Content-Type": "multipart/form-data", // Set correct header for form data
        },
      })
      .then((response) => {
        navigate("/");
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("You must input a title!")
      .max(15, "Title cannot be longer than 16 characters"),
    postText: Yup.string()
      .required("You must input a post!")
      .max(255, "Post cannot be longer than 255 characters"),
  });

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ setFieldValue }) => (
          <Form>
            <label>Title:</label>
            <ErrorMessage name="title" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="title"
              placeholder="(Ex. Title...)"
            />
            <label>Post:</label>
            <ErrorMessage name="postText" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="postText"
              placeholder="(Write what's on your mind)"
            />
            <label>Image (optional):</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                setImageFile(event.currentTarget.files[0]);
              }}
            />
            <button type="submit">Create Post</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default CreatePost;
