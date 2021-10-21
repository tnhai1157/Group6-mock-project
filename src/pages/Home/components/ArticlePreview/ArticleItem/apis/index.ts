import axios from "axios";

const URL = "http://localhost:3000";

export const postFavorite = (token: any, slug: any) =>
  axios.post(
    `${URL}/api/articles/${slug}/favorite`,
    {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const deleteFavorite = (token: any, slug: any) =>
  axios.delete(`${URL}/api/articles/${slug}/favorite`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
