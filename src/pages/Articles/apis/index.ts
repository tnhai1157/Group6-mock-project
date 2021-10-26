import { Article, DataArticle } from "./../../../interfaces/index";
import axios from "axios";

const URL = "http://localhost:3000";

export const getArticle = (slug: any, token: any) =>
  axios.get<any>(`${URL}/api/articles/${slug}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const getArticleNoToken = (slug: String) =>
  axios.get<DataArticle>(`${URL}/api/articles/${slug}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const deleteArticle = (slug: String, token: string | null) =>
  axios.delete<DataArticle>(`${URL}/api/articles/${slug}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const postFollowing = (token: any, username: any) =>
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

export const deleteFollowing = (token: any, username: any) =>
  axios.delete(`${URL}/api/profiles/${username}/follow`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
