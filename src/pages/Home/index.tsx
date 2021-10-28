import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Article } from "../../interfaces";
import {
  yourArticles,
  globalArticles,
  globalArticlesNoToken,
} from "./apis/index";
import ArticlePreview from "./components/ArticlePreview";
import Tags from "./components/Tags";
import {
  getArticleByTag,
  getTags,
  getArticleByTagNoToken,
} from "./components/Tags/apis";
import Paginate from "../../components/Paginate";
import { LIMIT } from "../../constant";

export default function Home({ userToken }: { userToken: boolean }) {
  const [feeds, setFeeds] = useState<Article[]>([]);
  //Pagination
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // loading
  const [loading, setLoading] = useState(true);
  //
  const [tags, setTags] = useState<String[]>([]);
  const [tagName, setTagName] = useState<String>("");

  const token = window.localStorage.getItem("jwtToken");
  const [nameApiToLoad, setNameApiToLoad] = useState("Global");

  useEffect(() => {
    setOffset((currentPage - 1) * LIMIT);
  }, [currentPage]);

  const handleClickYourFeed = () => {
    if (nameApiToLoad !== "Your") {
      setLoading(true);
      setNameApiToLoad("Your");
      setTagName("");
      setCurrentPage(1);
    }
  };

  const handleClickGlobalFeed = () => {
    if (nameApiToLoad !== "Global") {
      setLoading(true);
      setNameApiToLoad("Global");
      setTagName("");
      setCurrentPage(1);
    }
  };

  const getArticlesByTag = (tag: String) => {
    if (tag !== tagName) {
      setLoading(true);
      setTagName(tag);
      setNameApiToLoad("Tags");
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    switch (nameApiToLoad) {
      case "Your":
        yourArticles(token, offset).then((res) => {
          setFeeds(res.data.articles);
          setCount(res.data.articlesCount);
          setLoading(false);
        });
        break;

      case "Global":
        if (token) {
          globalArticles(token, offset).then((res) => {
            setFeeds(res.data.articles);
            setCount(res.data.articlesCount);
            setLoading(false);
          });
        } else {
          globalArticlesNoToken(offset).then((res) => {
            setFeeds(res.data.articles);
            setCount(res.data.articlesCount);
            setLoading(false);
          });
        }
        break;

      case "Tags":
        if (token) {
          getArticleByTag(tagName, token, offset).then((res) => {
            setFeeds(res.data.articles);
            setCount(res.data.articlesCount);
            setTagName(tagName);
            setLoading(false);
          });
        } else {
          getArticleByTagNoToken(tagName, offset).then((res) => {
            setFeeds(res.data.articles);
            setCount(res.data.articlesCount);
            setTagName(tagName);
            setLoading(false);
          });
        }
        break;

      default:
        break;
    }
  }, [nameApiToLoad, offset, token, tagName]);

  useEffect(() => {
    getTags().then((res) => {
      setTags(res.data.tags);
    });
    handleClickGlobalFeed();
  }, []);

  const onSelectedPage = (pageNum: number) => {
    setCurrentPage(pageNum);
    setLoading(true);
  };

  const onPrev = () => {
    setCurrentPage(currentPage - 1);
    setLoading(true);
  };

  const onNext = () => {
    setCurrentPage(currentPage + 1);
    setLoading(true);
  };

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
          <div className="col-md-9 col-xs-12">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {token ? (
                  <li className="nav-item">
                    <NavLink
                      className={
                        nameApiToLoad === "Your"
                          ? "nav-link active"
                          : "nav-link"
                      }
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
                    className={
                      nameApiToLoad === "Global"
                        ? "nav-link active"
                        : "nav-link"
                    }
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
                      className={
                        nameApiToLoad === "Tags"
                          ? "nav-link active"
                          : "nav-link"
                      }
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
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <ArticlePreview feeds={feeds} />
                {count > LIMIT && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <Paginate
                      pageNumber={Math.ceil(count / LIMIT)}
                      currentPage={currentPage}
                      onSelectPage={onSelectedPage}
                      handlePrev={onPrev}
                      handleNext={onNext}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <Tags tags={tags} getArticlesByTag={getArticlesByTag} />
        </div>
      </div>
    </div>
  );
}
