import axios from "axios";
import { URL } from "../../../apis";

export const postUsersSignIn = (payload: any) =>
  axios.post(
    `${URL}/api/users/login`,
    {
      user: {
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
