import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../../..";
import {
  deleteComment,
  getComments,
  getCommentsNoToken,
  postComment,
} from "../../apis/comment";
import FormComment from "./FormComment";

export default function Comment({ slug }: { slug: String }) {
  const token = window.localStorage.getItem("jwtToken");
  const [comments, setComments] = useState<any>();
  const user = useSelector((state: RootState) => state?.user?.data);
  useEffect(() => {
    if (token) {
      getComments(slug, token).then((res) => {
        setComments(res.data.comments);
      });
    } else {
      getCommentsNoToken(slug).then((res) => {
        setComments(res.data.comments);
      });
    }
  }, []);
  const getComment = (comment: String) => {
    postComment(comment, slug, token).then((res: any) => {
      getComments(slug, token).then((res) => {
        setComments(res.data.comments);
      });
    });
  };
  const handleDelete = (id: String) => {
    deleteComment(id, slug, token).then((res: any) => {
      getComments(slug, token).then((res) => {
        setComments(res.data.comments);
      });
    });
  };

  return (
    <div className="article-page">
      <div className="row">
        <div className="col-xs-12 col-md-8 offset-md-2">
          {token ? <FormComment getComment={getComment} /> : <div></div>}
          {comments?.map((comment: any) => (
            <div className="card" key={comment?.id}>
              <div className="card-block">
                <p className="card-text">{comment?.body}</p>
              </div>
              <div className="card-footer">
                <img
                  src={
                    comment?.author?.image
                      ? comment.author.image
                      : "https://static.productionready.io/images/smiley-cyrus.jpg"
                  }
                  className="comment-author-img"
                  alt=""
                />
                &nbsp;
                <NavLink
                  className="nav-link comment-author"
                  to={"/profile/" + comment?.author?.username}
                  activeClassName="selected"
                >
                  {comment?.author?.username}
                </NavLink>
                <span className="date-posted">{comment?.updatedAt}</span>
                {user?.username == comment?.author?.username ? (
                  <span className="mod-options">
                    <i
                      className="ion-trash-a"
                      onClick={() => handleDelete(comment?.id)}
                    ></i>
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
