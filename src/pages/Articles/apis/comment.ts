import axios from "axios";

const URL = "http://localhost:3000";

export const getComments = (slug: String, token: String | null) =>
  axios.get<any>(`${URL}/api/articles/${slug}/comments`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const getCommentsNoToken = (slug: String) =>
  axios.get<any>(`${URL}/api/articles/${slug}/comments`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const postComment = (
  content: String,
  slug: String,
  token: String | null
) =>
  axios.post(
    `${URL}/api/articles/${slug}/comments`,
    {
      comment: {
        body: content,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const deleteComment = (id: String, slug: String, token: String | null) =>
  axios.delete(`${URL}/api/articles/${slug}/comments/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
