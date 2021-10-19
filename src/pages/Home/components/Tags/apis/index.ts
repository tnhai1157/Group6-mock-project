import axios from "axios";

export const getTags = () => axios.get(`${URL}/api/tags`);
