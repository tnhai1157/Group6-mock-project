import axios from "axios";
import { Data } from "../interfaces";

export const URL = "http://localhost:3000";

export const userByToken = (token: string | null) =>
  axios.get<Data>(`${URL}/api/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  } as any);
