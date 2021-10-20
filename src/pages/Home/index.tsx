import React, { useEffect, useState } from "react";
import { Link, NavLink, Switch, Route } from "react-router-dom";
import { feedArticles, listArticles } from "../../apis";
import ArticlePreview from "./components/ArticlePreview";
import { useSelector } from "react-redux";
import Tags from "./components/Tags";
import { getTags } from "./components/Tags/apis";

export default function Home({ userToken }: { userToken: boolean }) {
  const [feeds, setFeeds] = useState();
  const [tags, setTags] = useState();
  const user = useSelector((state: any) => state.user.data.user);

  const token = window.localStorage.getItem("jwtToken");

  const handleClickYourFeed = () => {
    feedArticles(token).then((res: any) => {
      setFeeds(res.data.articles);
    });
  };

  const handleClickGlobalFeed = () => {
    listArticles(token).then((res: any) => {
      setFeeds(res.data.articles);
    });
  };

  useEffect(() => {
    getTags().then((res: any) => setTags(res.data.tags));
  }, []);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {userToken ? (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to=""
                      activeClassName="selected"
                      onClick={handleClickYourFeed}
                    >
                      Your feed
                    </NavLink>
                  </li>
                ) : (
                  <li></li>
                )}
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to=""
                    activeClassName="selected"
                    onClick={handleClickGlobalFeed}
                  >
                    Global Feed
                  </NavLink>
                </li>
              </ul>
            </div>
            <ArticlePreview feeds={feeds} />
          </div>
          <Tags tags={tags} />
        </div>
      </div>
    </div>
  );
}
