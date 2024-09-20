import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
  });
  return (
    <div className="postPage">
      <div className="upperPart">
        <div className="title">{postObject.title}</div>
        <div className="postText">{postObject.postText}</div>
        <div className="footer">{postObject.Username}</div>
      </div>
      <div className="lowerPart">Comment section</div>
    </div>
  );
}

export default Post;
