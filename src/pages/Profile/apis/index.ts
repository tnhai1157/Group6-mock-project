import axios from "axios";
import { DataArticles } from "../../../interfaces";

export const URL = "http://localhost:3000";

export const myArticles = (author: string) =>
  axios.get<DataArticles>(`${URL}/api/articles/?author=${author}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const favoritedArticles = (author: string) =>
  axios.get<DataArticles>(`${URL}/api/articles/?favorited=${author}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
