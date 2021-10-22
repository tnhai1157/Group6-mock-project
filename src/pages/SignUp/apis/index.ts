import { UserNotFullFieldRequire } from "./../../../interfaces/index";
import axios from "axios";
import { URL } from "../../../apis";
import { Data } from "../../../interfaces";

export const postUserSignUp = (user: UserNotFullFieldRequire) =>
  axios.post<Data>(
    `${URL}/api/users`,
    {
      user: {
        username: user.username,
        email: user.email,
        password: user.password,
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
