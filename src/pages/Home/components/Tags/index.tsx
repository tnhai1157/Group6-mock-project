import React from "react";
import { Link } from "react-router-dom";
import { getArticleByTag } from "./apis";

export default function Tags({ tags }: any) {
  const handleClickTag = (tag: any) => {
    getArticleByTag(tag).then((res: any) => {
      console.log(res.data.articles);
    });
  };
  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>
        <div className="tag-list">
          {tags && tags.length > 0 ? (
            tags.map((tag: any) => (
              <Link
                to=""
                className="tag-pill tag-default"
                onClick={() => handleClickTag(tag)}
              >
                {tag}
              </Link>
            ))
          ) : (
            <p>No tags are here... yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
