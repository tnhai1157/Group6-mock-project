import axios from "axios";
import { Data } from "../interfaces";

export const URL = "http://localhost:3000";

export const feedArticles = (token: any) =>
  axios.get(`${URL}/api/articles/feed`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const listArticles = (token: any) =>
  axios.get(`${URL}/api/articles`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const userByToken = (token: any) =>
  axios.get<Data>(`${URL}/api/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  } as any);
