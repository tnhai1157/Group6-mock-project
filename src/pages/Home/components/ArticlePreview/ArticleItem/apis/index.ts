import { DataArticle } from "./../../../../../../interfaces/index";
import axios from "axios";
import { Article } from "../../../../../../interfaces";

const URL = "http://localhost:3000";

export const postFavorite = (token: String, slug: String) =>
  axios.post<DataArticle>(
    `${URL}/api/articles/${slug}/favorite`,
    {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const deleteFavorite = (token: String, slug: String) =>
  axios.delete<DataArticle>(`${URL}/api/articles/${slug}/favorite`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
