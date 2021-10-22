import axios from "axios";
import { DataArticles } from "../../../interfaces";

export const URL = "http://localhost:3000";

export const yourArticles = (token: string) =>
  axios.get<DataArticles>(`${URL}/api/articles/feed`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const globalArticles = (token: string) =>
  axios.get<DataArticles>(`${URL}/api/articles`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
