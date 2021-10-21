import axios from "axios";

const URL = "http://localhost:3000";

export const getArticle = (slug: any) =>
  axios.get(`${URL}/api/articles/${slug}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
export const deleteArticle = (slug: string, token: string | null) =>
  axios.delete(`${URL}/api/articles/${slug}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
