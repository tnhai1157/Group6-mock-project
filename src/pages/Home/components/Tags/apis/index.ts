import axios from "axios";

const URL = "http://localhost:3000";

export const getTags = () => axios.get(`${URL}/api/tags`);

export const getArticleByTag = (tag: any, token: any) =>
  axios.get(`${URL}/api/articles`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      tag: tag,
    },
  });
