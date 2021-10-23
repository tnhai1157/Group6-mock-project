import axios from "axios";
import { DataArticles } from "../../../interfaces";

export const URL = "http://localhost:3000";

export const yourArticles = (token: any) =>
  axios.get<DataArticles>(`${URL}/api/articles/feed`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const globalArticles = (token: any) =>
  axios.get<DataArticles>(`${URL}/api/articles`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const globalArticlesNoToken = () =>
  axios.get<DataArticles>(`${URL}/api/articles`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
