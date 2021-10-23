import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { favoritedArticles, myArticles } from "../../apis";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import ArticlePreview from "../../../Home/components/ArticlePreview";
import { RootState } from "../../../..";
import { Article } from "../../../../interfaces";

export default function ArticlesPreview() {
<<<<<<< HEAD
  const [articles, setArticles] = useState<Article[]>([]);
  const user = useSelector((state: RootState) => state.user.data);
  const { url } = useRouteMatch();

  const handleClickYourFeed = () => {
    myArticles(user?.username).then((res) => {
      console.log(res.data.articles);
=======
  const [articles, setArticles] = useState();
  const token = window.localStorage.getItem("jwtToken");
  const user = useSelector((state: any) => state.user.data);
  const { url } = useRouteMatch();

  const handleClickYourFeed = () => {
    myArticles(user?.username, token).then((res: any) => {
>>>>>>> devHaiTN7
      setArticles(res.data.articles);
    });
  };

  const handleClickGlobalFeed = () => {
<<<<<<< HEAD
    favoritedArticles(user?.username).then((res) => {
=======
    favoritedArticles(user?.username, token).then((res: any) => {
>>>>>>> devHaiTN7
      setArticles(res.data.articles);
    });
  };

  useEffect(() => {
<<<<<<< HEAD
    myArticles(user?.username).then((res) => {
=======
    myArticles(user?.username, token).then((res: any) => {
>>>>>>> devHaiTN7
      setArticles(res.data.articles);
    });
  }, [user?.username]);

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
