import React from "react";
import { Link } from "react-router-dom";

export default function Tags({ tags }: any) {
  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>
        <div className="tag-list">
          {tags && tags.length > 0 ? (
            tags.map((tag: any) => (
              <Link to="" className="tag-pill tag-default">
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
