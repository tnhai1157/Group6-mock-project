import axios from "axios";
import { URL } from "../../../apis";

export const postArticle = (article: any, tags: any, token: string | null) =>
  axios.post(
    `${URL}/api/articles`,
    {
      article: {
        title: article?.title,
        description: article?.description,
        body: article?.content,
        tagList: tags,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getArticleBySlug = (slug: any) =>
  axios.get(`${URL}/api/articles/${slug}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const putArticle = (
  article: any,
  tags: any,
  token: string | null,
  slug: any
) =>
  axios.put(
    `${URL}/api/articles/${slug}`,
    {
      article: {
        title: article?.title,
        description: article?.description,
        body: article?.content,
        tagList: tags,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
