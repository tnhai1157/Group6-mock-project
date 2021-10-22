import axios from "axios";

export const URL = "http://localhost:3000";

export const myArticles = (author: any) =>
  axios.get(`${URL}/api/articles/?author=${author}`, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  });

export const favoritedArticles = (author: any) =>
  axios.get(`${URL}/api/articles/?favorited=${author}`, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  });
