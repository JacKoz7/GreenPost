import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios.get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: token,
        },
      }).then((response) => {
        if (response.data.Username === 'admin') {
          setIsAdmin(true);
        }
      });
    }

    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.Username);
    });

    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, [id]);

  const deleteUser = () => {
    const token = localStorage.getItem("accessToken");
    if (window.confirm("Are you sure you want to delete this user?")) {
      // Changed the URL from /auth/ to /users/
      axios.delete(`http://localhost:3001/auth/${id}`, {
        headers: {
          accessToken: token,
        },
      }).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1>{username}'s Posts:</h1>
      </div>
      <div className="listOfPosts">
        {listOfPosts.map((post, key) => {
          return (
            <div className="post" key={key}>
              <div className="title">{post.title}</div>
              <div className="body" onClick={() => navigate(`/post/${post.id}`)}>
                {post.postText}
              </div>
              <div className="footer">{post.Username}</div>
            </div>
          );
        })}
      </div>
      {isAdmin && <button className="deleteUserButton" onClick={deleteUser}>Delete User</button>}
    </div>
  );
}

export default Profile;