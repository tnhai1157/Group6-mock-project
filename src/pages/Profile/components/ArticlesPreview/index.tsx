import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { favoritedArticles, myArticles } from "../../apis";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import ArticlePreview from "../../../Home/components/ArticlePreview";

export default function ArticlesPreview() {
  const [articles, setArticles] = useState();
  const token = window.localStorage.getItem("jwtToken");
  const { url } = useRouteMatch();
  const user = useSelector((state: any) => state.user.data.user);

  const handleClickYourFeed = () => {
    myArticles(user.username).then((res: any) => {
      setArticles(res.data.articles);
    });
  };

  const handleClickGlobalFeed = () => {
    favoritedArticles(user.username).then((res: any) => {
      setArticles(res.data.articles);
    });
  };

  useEffect(() => {
    myArticles(user.username).then((res: any) => {
      setArticles(res.data.articles);
    });
  }, [user.username]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-10 offset-md-1">
          <div className="articles-toggle">
            <ul className="nav nav-pills outline-active">
              {
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={url}
                    activeClassName="selected"
                    onClick={handleClickYourFeed}
                  >
                    My articles
                  </NavLink>
                </li>
              }
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={url}
                  activeClassName="selected"
                  onClick={handleClickGlobalFeed}
                >
                  Favorited articles
                </NavLink>
              </li>
            </ul>
          </div>
          <ArticlePreview feeds={articles} />
        </div>
      </div>
    </div>
  );
}
