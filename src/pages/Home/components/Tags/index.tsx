import React from "react";
import { Link } from "react-router-dom";

export default function Tags({
  tags,
  getArticlesByTag,
}: {
  tags: String[];
  getArticlesByTag: (tag: String) => void;
}) {
  const handleClickTag = (tag: String) => {
    getArticlesByTag(tag);
  };
  return (
    <div className="col-md-3 col-xs-12">
      <div className="sidebar">
        <p>Popular Tags</p>
        <div className="tag-list">
          {tags && tags.length > 0 ? (
            tags.map((tag, i) => (
              <span key={i}>
                <Link
                  to=""
                  className="tag-pill tag-default"
                  onClick={() => handleClickTag(tag)}
                >
                  {tag}
                </Link>
              </span>
            ))
          ) : (
            <p>No tags are here... yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
