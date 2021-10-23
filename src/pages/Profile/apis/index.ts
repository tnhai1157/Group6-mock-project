import axios from "axios";
import { DataArticles } from "../../../interfaces";

export const URL = "http://localhost:3000";

export const myArticles = (author: any, token: any) =>
  axios.get(`${URL}/api/articles/?author=${author}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const favoritedArticles = (author: any, token: any) =>
  axios.get(`${URL}/api/articles/?favorited=${author}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const getProfile = (token: any, username: any) =>
  axios.get(`${URL}/api/profiles/${username}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
