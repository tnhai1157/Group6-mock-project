import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { yourArticles, globalArticles } from "./apis/index";
import ArticlePreview from "./components/ArticlePreview";
import Tags from "./components/Tags";
import { getArticleByTag, getTags } from "./components/Tags/apis";

export default function Home({ userToken }: { userToken: boolean }) {
  const [feeds, setFeeds] = useState();
  const [tags, setTags] = useState();
  const [tagName, setTagName] = useState("");
  const token = window.localStorage.getItem("jwtToken");

  const handleClickYourFeed = () => {
    setTagName("");
    yourArticles(token).then((res: any) => {
      setFeeds(res.data.articles);
      // console.log(res.data.articles);
    });
  };

  const handleClickGlobalFeed = () => {
    globalArticles(token).then((res: any) => {
      setFeeds(res.data.articles);
      // console.log(res.data.articles);
    });
    setTagName("");
  };
  const getArticlesByTag = (tag: string) => {
    getArticleByTag(tag, token).then((res: any) => {
      setFeeds(res.data.articles);
      setTagName(tag);
      // console.log(res.data.articles);
    });
  };

  useEffect(() => {
    getTags().then((res: any) => {
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
