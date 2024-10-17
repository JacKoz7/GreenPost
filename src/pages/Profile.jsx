import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Profile() {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.Username);
    });

    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, [id]);

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1 className="mainHeader">{username}'s Posts:</h1>
      </div>
      <div className="listOfPosts">
        {listOfPosts.length === 0 ? (
          <div className="noPosts">No posts found for this user.</div>
        ) : (
          listOfPosts.map((post, key) => {
            return (
              <div className="post" key={key}>
                <div className="title">{post.title}</div>
                <div
                  className="body"
                  onClick={() => {
                    navigate(`/post/${post.id}`);
                  }}
                >
                  {post.postText}
                </div>
                <div className="footer">{post.Username}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Profile;