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
