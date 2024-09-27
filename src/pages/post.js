import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    //api request to get data from the post
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
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
            CommentBody: newComment,
            Username: response.data.Username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };
  return (
    <div className="postPage">
      <div className="upperPart">
        <div className="title">{postObject.title}</div>
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
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                <label className="username">{comment.Username}</label>{" "}
                {comment.CommentBody}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
