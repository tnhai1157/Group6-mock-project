import React from "react";

export default function TagList({
  tags,
  setTags,
}: {
  tags: String[];
  setTags: any;
}) {
  const deleteTag = (index: any) => {
    setTags((prevState: any) =>
      prevState.filter((tag: String, i: Number) => i !== index)
    );
  };

  return (
    <div className="tag-list">
      {tags?.map((tag: any, index: any) => (
        <span
          ng-repeat="tag in $ctrl.article.tagList"
          className="tag-default tag-pill ng-binding ng-scope"
          key={index}
        >
          <i
            className="ion-close-round"
            ng-click="$ctrl.removeTag(tag)"
            onClick={() => deleteTag(index)}
          ></i>
          {tag}
        </span>
      ))}
    </div>
  );
}
