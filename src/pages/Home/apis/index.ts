import axios from "axios";

export const URL = "http://localhost:3000";

export const yourArticles = (token: any) =>
  axios.get(`${URL}/api/articles/feed`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const globalArticles = (token: any) =>
  axios.get(`${URL}/api/articles`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
