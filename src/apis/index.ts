import axios from "axios";

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

export const userByToken = (payload: any) =>
  axios.get(`${URL}/api/user`, {
    // body: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Credentials": true,
    // },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.token}`,
    },
  } as any);
