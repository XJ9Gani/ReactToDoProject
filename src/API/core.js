import axios from "axios";
import { BASE_API_URL } from "../const";

export const HttpClient = axios.create({
  baseURL: BASE_API_URL,
});
