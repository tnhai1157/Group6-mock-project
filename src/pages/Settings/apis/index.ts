import axios from "axios";
import { URL } from "../../../apis";
import { Data, UserNotFullFieldRequire } from "../../../interfaces";

export const updateUser = (
  user: UserNotFullFieldRequire,
  token: string | null
) =>
  axios.put<Data>(
    `${URL}/api/user`,
    {
      user: {
        image: user.imageURL,
        bio: user.bio,
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
        Authorization: `Bearer ${token}`,
      },
    }
  );
