import React from "react";
import { NavLink } from "react-router-dom";
import { postFavorite } from "./api";

export default function ArticlePreview({ feeds }: any) {
  const token = window.localStorage.getItem("jwtToken");
  const handleLike = (slug: string) => {
    console.log(slug);
    // postFavorite(slug, token).then((res: any) => {
    //   console.log(res.data);
    // });
  };
  return (
    <div>
      {feeds && feeds.length > 0 ? (
        feeds.map((feed: any) => (
          <div className="article-preview" key={feed?.slug}>
            <div className="article-meta">
              <a href="profile.html">
                <img
                  src={
                    feed?.author?.image
                      ? feed.author.image
                      : "https://static.productionready.io/images/smiley-cyrus.jpg"
                  }
                />
              </a>
              <div className="info">
                <a href="" className="author">
                  {feed?.author?.username}
                </a>
                <span className="date">{feed?.updatedAt}</span>
              </div>
              <button
                className="btn btn-outline-primary btn-sm pull-xs-right"
                onClick={() => handleLike(feed?.slug)}
              >
                <i className="ion-heart"></i> {feed?.favoritesCount}
              </button>
            </div>
            <NavLink to="" className="preview-link">
              <h1>{feed?.title}</h1>
              <p>{feed?.description}</p>
              <span>Read more...</span>
              <ul className="tag-list">
                {feed.tagList?.map((tag: any) => (
                  <li
                    className="tag-default tag-pill tag-outline ng-binding ng-scope"
                    ng-repeat="tag in $ctrl.article.tagList"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </NavLink>
          </div>
        ))
      ) : (
        <p>No articles are here... yet.</p>
      )}
    </div>
  );
}
