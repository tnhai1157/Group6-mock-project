import axios from "axios";
import { LIMIT } from "../../../constant";
import { DataArticles, DataUser } from "../../../interfaces";

export const URL = "http://localhost:3000";

export const myArticles = (
  author: string | undefined,
  token: string | null,
  offset: number
) =>
  axios.get<DataArticles>(
    `${URL}/api/articles/?author=${author}&limit=${LIMIT}&offset=${offset}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const favoritedArticles = (
  author: string | undefined,
  token: string | null,
  offset: number
) =>
  axios.get<DataArticles>(
    `${URL}/api/articles/?favorited=${author}&limit=${LIMIT}&offset=${offset}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getProfile = (token: any, username: any) =>
  axios.get<DataUser>(`${URL}/api/profiles/${username}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const getProfileNoToken = (username: string) =>
  axios.get<DataUser>(`${URL}/api/profiles/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
