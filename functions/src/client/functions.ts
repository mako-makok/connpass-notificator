import { config } from "../functions.setting";
import { RegistWord } from "../types/params";
import { post } from "./http";

export const postRegistUser = (registWord: RegistWord) => {
  post(config.functions.url, '/registWord', registWord);
}