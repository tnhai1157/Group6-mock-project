import { DataArticle } from "./../../../interfaces/index";
import axios from "axios";

const URL = "http://localhost:3000";

export const getArticle = (slug: String) =>
  axios.get<DataArticle>(`${URL}/api/articles/${slug}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
export const deleteArticle = (slug: string, token: string | null) =>
  axios.delete<DataArticle>(`${URL}/api/articles/${slug}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
