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
  getArticleByTagNoToken,
  getTags,
} from "./components/Tags/apis";
import { Row } from "react-bootstrap";
import Paginate from "../../components/Paginate";
import { LIMIT } from "../../constant";

export default function Home({ userToken }: { userToken: boolean }) {
  const [feeds, setFeeds] = useState<Article[]>([]);
  //Pagination
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [tags, setTags] = useState<String[]>([]);
  const [tagName, setTagName] = useState<String>("");
  const token = window.localStorage.getItem("jwtToken");
  const [nameApiToLoad, setNameApiToLoad] = useState("Your");

  useEffect(() => {
    setOffset(currentPage - 1);
  }, [currentPage]);

  const handleClickYourFeed = () => {
    setNameApiToLoad("Your");
    setTagName("");
  };

  const handleClickGlobalFeed = () => {
    setNameApiToLoad("Global");
    setTagName("");
  };

  const getArticlesByTag = (tag: String) => {
    setTagName(tag);
    setNameApiToLoad("Tags");
  };

  useEffect(() => {
    switch (nameApiToLoad) {
      case "Your":
        yourArticles(token, offset).then((res) => {
          setFeeds(res.data.articles);
          setCount(res.data.articlesCount);
        });
        break;

      case "Global":
        if (token) {
          globalArticles(token, offset).then((res) => {
            setFeeds(res.data.articles);
            setCount(res.data.articlesCount);
          });
        } else {
          globalArticlesNoToken(offset).then((res) => {
            setFeeds(res.data.articles);
            setCount(res.data.articlesCount);
          });
        }
        break;

      case "Tags":
        if (token) {
          getArticleByTag(tagName, token).then((res) => {
            setFeeds(res.data.articles);
            setCount(res.data.articlesCount);
            setTagName(tagName);
          });
        } else {
          getArticleByTagNoToken(tagName).then((res) => {
            setFeeds(res.data.articles);
            setCount(res.data.articlesCount);
            setTagName(tagName);
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
  };

  const onPrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNext = () => {
    setCurrentPage(currentPage + 1);
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
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {token ? (
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

            {count > LIMIT && (
              <Row style={{ display: "flex", justifyContent: "center" }}>
                <Paginate
                  pageNumber={Math.ceil(count / LIMIT)}
                  currentPage={currentPage}
                  onSelectPage={onSelectedPage}
                  handlePrev={onPrev}
                  handleNext={onNext}
                />
              </Row>
            )}
          </div>
          <Tags tags={tags} getArticlesByTag={getArticlesByTag} />
        </div>
      </div>
    </div>
  );
}
