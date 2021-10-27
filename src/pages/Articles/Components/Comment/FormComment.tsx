import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../..";

export default function FormComment({ getComment }: { getComment: any }) {
  const [comment, setComment] = useState("");
  const user = useSelector((state: RootState) => state?.user?.data);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (comment) {
      getComment(comment);
      setComment("");
    }
  };
  return (
    <div>
      <form className="comment-form form" onSubmit={handleSubmit}>
        <fieldset className="form-group">
          <textarea
            rows={3}
            className="form-control"
            placeholder="Write your comment"
            value={comment}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setComment(event.target.value)
            }
          ></textarea>
        </fieldset>
        <div className="card-footer">
          <img
            src={
              user?.image
                ? user.image
                : "https://static.productionready.io/images/smiley-cyrus.jpg"
            }
            className="comment-author-img"
            alt=""
          />
          <button type="submit" className="btn btn-sm btn-primary">
            Post Comment
          </button>
        </div>
      </form>
      <br />
    </div>
  );
}
