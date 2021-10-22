import React from "react";
import ArticlesPreview from "./components/ArticlesPreview";
import ProfileInformation from "./components/ProfileInformation";

export default function Profile() {
  return (
    <div>
      <ProfileInformation />
      <ArticlesPreview />
    </div>
  );
}
