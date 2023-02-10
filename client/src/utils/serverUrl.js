import { LIVE_BASE_URL, DEV_BASE_URL, NODE_ENV } from "../constant/actionTypes";

const server = (env) => {
  if (env === "production") {
    return LIVE_BASE_URL;
  } else if (env === "development") {
    return DEV_BASE_URL;
  }
};

export const serverUrl = server(NODE_ENV)