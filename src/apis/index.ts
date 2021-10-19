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

// export const getTags = () => axios.get(`${URL}/api/tags`);

export const registration = (payload: any) =>
  axios.post(
    `${URL}/api/users`,
    {
      user: {
        username: payload.username,
        email: payload.email,
        password: payload.password,
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
