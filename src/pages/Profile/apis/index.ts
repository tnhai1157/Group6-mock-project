import axios from "axios";
import { DataArticles } from "../../../interfaces";

export const URL = "http://localhost:3000";

export const myArticles = (author: string, token: string | null) =>
  axios.get<DataArticles>(`${URL}/api/articles/?author=${author}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const favoritedArticles = (author: string, token: string | null) =>
  axios.get<DataArticles>(`${URL}/api/articles/?favorited=${author}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const getProfile = (token: string | null, username: string) =>
  axios.get(`${URL}/api/profiles/${username}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
