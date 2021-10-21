import axios from "axios";
import { URL } from "../../../apis";

export const updateUser = (payload: any, token: any) =>
  axios.put(
    `${URL}/api/user`,
    {
      user: {
        image: payload.imageURL,
        bio: payload.bio,
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
        Authorization: `Bearer ${token}`,
      },
    }
  );
