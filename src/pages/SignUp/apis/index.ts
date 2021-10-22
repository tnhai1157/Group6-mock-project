import axios from "axios";
import { URL } from "../../../apis";

export const postUserSignUp = (payload: any) =>
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
