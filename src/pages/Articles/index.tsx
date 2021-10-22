import { useEffect, useState } from "react";
import { Route, useHistory, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Editor from "../Editor";
import { deleteArticle, getArticle } from "./apis";

export default function Articles() {
  const { slug }: any = useParams();
  const token = window.localStorage.getItem("jwtToken");
  const [article, setArticle] = useState<any>();
  const [checkAuthor, setCheckAuthor] = useState(true);
  const history = useHistory();

  useEffect(() => {
    getArticle(slug).then((res: any) => {
      setArticle(res.data.article);
    });
  }, [slug]);

  const handleDelete = () => {
    deleteArticle(slug, token).then((res: any) => {
      history.push("");
    });
  };
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article?.title}</h1>
          <div className="article-meta">
            <img
              src={
                article?.author?.image
                  ? article.author.image
                  : "https://static.productionready.io/images/smiley-cyrus.jpg"
              }
              alt=""
            />
            <div className="info">
              <NavLink to={"/profile/" + article?.author?.username}>
                <h5>{article?.author?.username}</h5>
              </NavLink>
              <span className="date">{article?.updatedAt}</span>
            </div>
            {token ? (
              <div>
                {checkAuthor ? (
                  <div>
                    <NavLink to={"/editor/" + article?.slug}>
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="ion-edit"></i>
                        &nbsp; Edit Article
                      </button>
                    </NavLink>
                    &nbsp;&nbsp;
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={handleDelete}
                    >
                      <i className="ion-trash-a"></i>
                      &nbsp; Delete Article
                    </button>
                  </div>
                ) : (
                  <div>
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="ion-plus-round"></i>
                      &nbsp; Follow {article?.author?.username}
                      <span className="counter"></span>
                    </button>
                    &nbsp;&nbsp;
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="ion-heart"></i>
                      &nbsp; Favorite Post{" "}
                      <span className="counter">
                        ({article?.favoritesCount})
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article?.body}</p>
          </div>
        </div>
        <div className="tag-list">
          {article?.tagList?.map((tag: any) => (
            <span
              key={tag}
              ng-repeat="tag in $ctrl.article.tagList"
              className="tag-default tag-pill ng-binding ng-scope"
            >
              {tag}
            </span>
          ))}
        </div>
        <hr />
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  rows={3}
                ></textarea>
              </div>
              <div className="card-footer">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  className="comment-author-img"
                  alt=""
                />
                <button className="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>
            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className="card-footer">
                <a href="" className="comment-author">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                    alt=""
                  />
                </a>
                &nbsp;
                <a href="" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
              </div>
            </div>
            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className="card-footer">
                <a href="" className="comment-author">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                    alt=""
                  />
                </a>
                &nbsp;
                <a href="" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                  <i className="ion-edit"></i>
                  <i className="ion-trash-a"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Route path="/editor/:slug">
        <Editor />
      </Route> */}
    </div>
  );
}
