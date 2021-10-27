import React from "react";
import { useParams } from "react-router";
import ArticlesPreview from "./components/ArticlesPreview";
import ProfileInformation from "./components/ProfileInformation";

export default function Profile() {
  const { slug }: any = useParams();

  return (
    <div>
      <ProfileInformation slug={slug} />
      <ArticlesPreview slug={slug} />
    </div>
  );
}
