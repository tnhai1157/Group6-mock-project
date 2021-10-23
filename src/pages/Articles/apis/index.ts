import { DataArticle } from "./../../../interfaces/index";
import axios from "axios";

const URL = "http://localhost:3000";

export const getArticle = (slug: String, token: String | null) =>
  axios.get<DataArticle>(`${URL}/api/articles/${slug}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const deleteArticle = (slug: String, token: string | null) =>
  axios.delete<DataArticle>(`${URL}/api/articles/${slug}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const postFollowing = (
  token: String | null,
  username: String | undefined
) =>
  axios.post(
    `${URL}/api/profiles/${username}/follow`,
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

export const deleteFollowing = (
  token: String | null,
  username: String | undefined
) =>
  axios.delete(`${URL}/api/profiles/${username}/follow`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
