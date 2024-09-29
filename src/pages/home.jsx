import React from "react";
import axios from "axios"; // used to make requests to the backend
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // custom pop up windows

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    // get request from backend database
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

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
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
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
              <button
                onClick={() => {
                  likePost(value.id);
                }}
              >
                Like
              </button>
              <label> {value.Likes.length} </label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;