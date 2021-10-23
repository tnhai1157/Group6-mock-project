import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Article } from "../../interfaces";
import { yourArticles, globalArticles } from "./apis/index";
import ArticlePreview from "./components/ArticlePreview";
import Tags from "./components/Tags";
import { getArticleByTag, getTags } from "./components/Tags/apis";

export default function Home({ userToken }: { userToken: boolean }) {
  const [feeds, setFeeds] = useState<Article[]>([]);
  const [tags, setTags] = useState<String[]>([]);
  const [tagName, setTagName] = useState<String>("");
  const token = window.localStorage.getItem("jwtToken") as string;

  const handleClickYourFeed = () => {
    setTagName("");
    yourArticles(token).then((res) => {
      setFeeds(res.data.articles);
    });
  };

  const handleClickGlobalFeed = () => {
    globalArticles(token).then((res) => {
      setFeeds(res.data.articles);
    });
    setTagName("");
  };
  const getArticlesByTag = (tag: String) => {
    getArticleByTag(tag, token).then((res) => {
      setFeeds(res.data.articles);
      setTagName(tag);
      // console.log(res.data.articles);
    });
  };

  useEffect(() => {
    getTags().then((res) => {
      setTags(res.data.tags);
    });
    handleClickGlobalFeed();
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
                {tagName ? (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to=""
                      activeClassName="selected"
                    >
                      # {tagName}
                    </NavLink>
                  </li>
                ) : (
                  <li></li>
                )}
              </ul>
            </div>
            <ArticlePreview feeds={feeds} />
          </div>
          <Tags tags={tags} getArticlesByTag={getArticlesByTag} />
        </div>
      </div>
    </div>
  );
}
