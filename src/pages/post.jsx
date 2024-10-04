import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    //api request to get data from the post
    axios
      .get(`https://greenpostapp-7e2958a55f01.herokuapp.com/posts/byId/${id}`)
      .then((response) => {
        setPostObject(response.data);
      });

    axios
      .get(`https://greenpostapp-7e2958a55f01.herokuapp.com/comments/${id}`)
      .then((response) => {
        setComments(response.data);
      });
  }, [id]);

  const addComment = () => {
    axios
      .post(
        "https://greenpostapp-7e2958a55f01.herokuapp.com/comments",
        {
          CommentBody: newComment,
          PostId: id,
        },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            id: response.data.id, // Ensure the id is set here
            CommentBody: newComment,
            Username: response.data.Username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(
        `https://greenpostapp-7e2958a55f01.herokuapp.com/comments/${id}`,
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  const deletePost = (id) => {
    if (!window.confirm("Are you sure you want to delete post?")) {
      return;
    }
  
    axios
      .delete(`https://greenpostapp-7e2958a55f01.herokuapp.com/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div className="postPage">
      <div className="upperPart">
        <div className="title">
          <div className="titleText">{postObject.title}</div>
          {authState.Username === postObject.Username && (
            <button
              onClick={() => {
                deletePost(postObject.id);
              }}
              className="deletePost"
            >
              Delete Post
            </button>
          )}
        </div>
        <div className="postText">{postObject.postText}</div>
        <div className="footer">{postObject.Username}</div>
      </div>
      <div className="lowerPart">
        <div className="addCommentContainer">
          <h1 className="commentSection">Comment section</h1>
          <input
            type="text"
            placeholder="Add comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment} className="addCommentButton">
            Add Comment
          </button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                <label className="username">{comment.Username}</label>{" "}
                {comment.CommentBody}
                {authState.Username === comment.Username && (
                  <button
                    className="deleteButton"
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
