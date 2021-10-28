import { DataArticles, DataTags } from "./../../../../../interfaces/index";
import axios from "axios";
import { LIMIT } from "../../../../../constant";

const URL = "http://localhost:3000";

export const getTags = () => axios.get<DataTags>(`${URL}/api/tags`);

export const getArticleByTag = (tag: String, token: String, offset: number) =>
  axios.get<DataArticles>(
    `${URL}/api/articles?limit=${LIMIT}&offset=${offset}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        tag: tag,
      },
    }
  );

export const getArticleByTagNoToken = (tag: String, offset: number) =>
  axios.get<DataArticles>(
    `${URL}/api/articles?limit=${LIMIT}&offset=${offset}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        tag: tag,
      },
    }
  );
