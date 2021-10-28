import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { favoritedArticles, myArticles } from "../../apis";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import ArticlePreview from "../../../Home/components/ArticlePreview";
import { RootState } from "../../../..";
import { LIMIT } from "../../../../constant";
import { Row } from "react-bootstrap";
import Paginate from "../../../../components/Paginate";
import { Article } from "../../../../interfaces";

export default function ArticlesPreview({ slug }: { slug: string }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const token = window.localStorage.getItem("jwtToken");
  const user = useSelector((state: RootState) => state.user.data);
  const { url } = useRouteMatch();
  const [selected, setSelected] = useState<string>("My");

  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setOffset((currentPage - 1) * LIMIT);
  }, [currentPage]);

  const handleClickYourFeed = () => {
    setSelected("My");
    setLoading(true);
    setCurrentPage(1);
  };

  const handleClickGlobalFeed = () => {
    setSelected("Favorited");
    setLoading(true);
    setCurrentPage(1);
  };

  useEffect(() => {
    switch (selected) {
      case "My":
        myArticles(slug, token, offset).then((res) => {
          setArticles(res.data.articles);
          setCount(res.data.articlesCount);
          setLoading(false);
        });
        break;

      case "Favorited":
        favoritedArticles(slug, token, offset).then((res) => {
          setArticles(res.data.articles);
          setCount(res.data.articlesCount);
          setLoading(false);
        });
        break;

      default:
        break;
    }
  }, [selected, offset, token, slug]);

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
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-10 offset-md-1">
          <div className="articles-toggle">
            <ul className="nav nav-pills outline-active">
              {
                <li className="nav-item">
                  <NavLink
                    className={
                      selected === "My" ? "nav-link active" : "nav-link"
                    }
                    to={url}
                    activeClassName="selected"
                    onClick={handleClickYourFeed}
                  >
                    {slug === user.username
                      ? "My articles"
                      : `${slug.charAt(0).toUpperCase()}${slug.slice(
                          1
                        )}'s articles`}
                  </NavLink>
                </li>
              }
              <li className="nav-item">
                <NavLink
                  className={
                    selected === "Favorited" ? "nav-link active" : "nav-link"
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
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
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
          )}
        </div>
      </div>
    </div>
  );
}
