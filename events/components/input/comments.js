import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState();

  useEffect(() => {
    async function fetchData() {
      if (showComments) {
        try {
          const res = await fetch(`/api/comments/${eventId}`);
          const data = await res.json();
          console.log("data", data);
          setComments(data.comments);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
    }
    fetchData();
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    // send data to API
    const { email, name, text } = commentData;
    const res = await fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify({ email, name, text }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log("data", data);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
