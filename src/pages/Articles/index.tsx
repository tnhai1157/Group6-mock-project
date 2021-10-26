import { useEffect, useState } from "react";
import { Route, useHistory, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { userByToken } from "../../apis";
import Editor from "../Editor";
import {
  deleteFavorite,
  postFavorite,
} from "../Home/components/ArticlePreview/ArticleItem/apis";
import { getProfile } from "../Profile/apis";
import {
  deleteArticle,
  deleteFollowing,
  getArticle,
  getArticleNoToken,
  postFollowing,
} from "./apis";
import { AxiosResponse } from "axios";
import Comment from "./Components/Comment";

export default function Articles() {
  const { slug }: any = useParams();
  const token = window.localStorage.getItem("jwtToken") as string;
  const [article, setArticle] = useState<any>();
  const [checkAuthor, setCheckAuthor] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(article?.favoritesCount);
  const [likeState, setLikeState] = useState<boolean>();
  const history = useHistory();
  const [followState, setFollowState] = useState<boolean>();
  useEffect(() => {
    if (token) {
      getArticle(slug, token).then((responseArticle) => {
        setArticle(responseArticle.data.article);
        setLikeState(responseArticle.data.article?.favorited);
        setLikeCount(responseArticle.data.article?.favoritesCount);
        userByToken(token).then((responseUser) => {
          if (
            responseUser.data.user.username ==
            responseArticle.data.article.author.username
          )
            setCheckAuthor(true);
          else setCheckAuthor(false);
        });
        getProfile(token, responseArticle.data.article.author.username).then(
          (res: AxiosResponse<any>) => {
            if (res.data.profile.following) setFollowState(true);
            else setFollowState(false);
          }
        );
      });
    } else {
      getArticleNoToken(slug).then((res: any) => {
        setArticle(res.data.article);
      });
    }
  }, [slug]);

  const handleFavorite = (slug: string) => {
    if (likeState) {
      deleteFavorite(token, slug).then((res: any) => {
        setLikeCount(res.data.article?.favoritesCount);
        setLikeState(false);
      });
    } else {
      postFavorite(token, slug).then((res: any) => {
        setLikeCount(res.data.article?.favoritesCount);
        setLikeState(true);
      });
    }
  };
  const handleFollowing = (username: string) => {
    if (followState) {
      deleteFollowing(token, username).then((res: any) => {
        // setLikeCount(res.data.article?.favoritesCount);
        setFollowState(false);
      });
    } else {
      postFollowing(token, username).then((res: any) => {
        // setLikeCount(res.data.article?.favoritesCount);
        setFollowState(true);
      });
    }
  };
  const handleDelete = () => {
    deleteArticle(slug, token).then((res) => {
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
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleFollowing(article?.author?.username)}
                    >
                      {followState ? (
                        <i></i>
                      ) : (
                        <i className="ion-plus-round"></i>
                      )}
                      &nbsp;{" "}
                      {followState
                        ? `Unfollow ${article?.author?.username}`
                        : `Follow ${article?.author?.username}`}
                      <span className="counter"></span>
                    </button>
                    &nbsp;&nbsp;
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleFavorite(article?.slug)}
                    >
                      {likeState ? <i></i> : <i className="ion-heart"></i>}
                      &nbsp; {likeState ? "Unfavorite Post" : "Favorite Post"}
                      <span className="counter">({likeCount})</span>
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
        <Comment slug={slug} />
      </div>
      {/* <Route path="/editor/:slug">
        <Editor />
      </Route> */}
    </div>
  );
}
