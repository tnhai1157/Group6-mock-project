import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Article } from "../../../../../../interfaces";
import { deleteFavorite, postFavorite } from "../apis";

export default function ArticleItem({ feed }: { feed: Article }) {
  const token = window.localStorage.getItem("jwtToken");
  const [likeCount, setLikeCount] = useState<number>(feed?.favoritesCount);
  const [likeState, setLikeState] = useState<boolean>(feed?.favorited);

  const handleLike = (slug: string) => {
    if (token) {
      if (likeState) {
        deleteFavorite(token, slug).then((res) => {
          setLikeCount(res.data.article?.favoritesCount);
          setLikeState(false);
        });
      } else {
        postFavorite(token, slug).then((res) => {
          setLikeCount(res.data.article?.favoritesCount);
          setLikeState(true);
        });
      }
    }
  };
  return (
    <div className="article-preview">
      <div className="article-meta">
        <img
          src={
            feed?.author?.image
              ? feed.author.image
              : "https://static.productionready.io/images/smiley-cyrus.jpg"
          }
          alt=""
        />
        <div className="info">
          <NavLink to={"/profile/" + feed?.author?.username}>
            <h5>{feed?.author?.username}</h5>
          </NavLink>
          <span className="date">{feed?.updatedAt}</span>
        </div>
        <button
          className={
            likeState
              ? "btn btn-primary btn-sm pull-xs-right"
              : "btn btn-outline-primary btn-sm pull-xs-right"
          }
          onClick={() => handleLike(feed?.slug)}
        >
          <i className="ion-heart"></i> {likeCount}
        </button>
      </div>
      <div className="preview-link">
        <h1>{feed?.title}</h1>
        <p>{feed?.description}</p>
        <NavLink to={"/article/" + feed?.slug} className="preview-link">
          Read more...
        </NavLink>
        <ul className="tag-list">
          {feed.tagList?.map((tag, i) => (
            <li
              key={i}
              className="tag-default tag-pill tag-outline ng-binding ng-scope"
              ng-repeat="tag in $ctrl.article.tagList"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
