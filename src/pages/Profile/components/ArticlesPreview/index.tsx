import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { favoritedArticles, myArticles } from "../../apis";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import ArticlePreview from "../../../Home/components/ArticlePreview";
import { Article } from "../../../../interfaces";
import { RootState } from "../../../..";
import { LIMIT } from "../../../../constant";
import { Row } from "react-bootstrap";
import Paginate from "../../../../components/Paginate";

export default function ArticlesPreview() {
  const [articles, setArticles] = useState<Article[]>([]);
  const token = window.localStorage.getItem("jwtToken");
  const user = useSelector((state: RootState) => state.user.data);
  const { url } = useRouteMatch();
  const [nameApiToLoad, setNameApiToLoad] = useState("My");

  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setOffset(currentPage - 1);
  }, [currentPage]);

  const handleClickYourFeed = () => {
    console.log("hi");
    setNameApiToLoad("My");
  };

  const handleClickGlobalFeed = () => {
    setNameApiToLoad("Favorited");
  };

  useEffect(() => {
    handleClickYourFeed();
  }, []);

  useEffect(() => {
    switch (nameApiToLoad) {
      case "My":
        myArticles(user?.username, token, offset).then((res) => {
          setArticles(res.data.articles);
          setCount(res.data.articlesCount);
        });
        break;

      case "Favorited":
        favoritedArticles(user?.username, token, offset).then((res) => {
          setArticles(res.data.articles);
          setCount(res.data.articlesCount);
        });
        break;

      default:
        break;
    }
  }, [nameApiToLoad, offset, token, user?.username]);

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
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-10 offset-md-1">
          <div className="articles-toggle">
            <ul className="nav nav-pills outline-active">
              {
                <li className="nav-item">
                  <NavLink
                    className={
                      nameApiToLoad === "My" ? "nav-link active" : "nav-link"
                    }
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
                  className={
                    nameApiToLoad === "Favorited"
                      ? "nav-link active"
                      : "nav-link"
                  }
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
      </div>
    </div>
  );
}
