import classes from "./comment-list.module.css";

function CommentList({ comments }) {
  console.log('comments', comments)
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {comments?.map((c) => (
        <li key={c.id}>
          <p>{c.text}</p>
          <div>
            By <address>{c.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
