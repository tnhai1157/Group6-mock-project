import axios from "axios";

export const URL = "http://localhost:3000";

export const postFavorite = (slug: string, token: any) =>
  axios.post(`${URL}/api/articles/${slug}/favorite`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
