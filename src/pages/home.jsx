import React from "react";
import axios from "axios"; // used to make requests to the backend
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // custom pop up windows
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      // get request from backend database
      axios.get("http://localhost:3001/posts").then((response) => {
        setListOfPosts(response.data);
      });
    }
  }, [authState, navigate]);

  const likePost = (postId) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      toast.error("You need to be logged in to like a post");
      return;
    }

    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: accessToken } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                setLikedPosts([...likedPosts, postId]);
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                setLikedPosts(likedPosts.filter((id) => id !== postId));
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
      });
  };

  return (
    <div>
      <ToastContainer />
      {listOfPosts.map((value, key) => {
        return (
          <div className="post" key={key}>
            <div className="title"> {value.title} </div>
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              {value.Username}
              <div>
                <button
                  className="likeButton"
                  onClick={() => {
                    likePost(value.id);
                  }}
                >
                  <FontAwesomeIcon icon={faThumbsUp} /> Like
                </button>
                <label
                  className={`likeCounter ${
                    likedPosts.includes(value.id) ? "liked" : ""
                  }`}
                >
                  {value.Likes.length}
                </label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
