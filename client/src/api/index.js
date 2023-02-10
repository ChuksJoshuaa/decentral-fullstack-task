import axios from "axios";
import { serverUrl } from "../utils/serverUrl";

const API = axios.create({ baseURL: serverUrl });

let user = JSON.parse(localStorage.getItem("profile"));
user = user?.data;

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

//AUTH
export const signIn = (FormData) => API.post("/api/v1/user/login", FormData);
export const signUp = (FormData) => API.post("/api/v1/user/register", FormData);

//POST
export const createPost = (newPost) =>
  API.post("/api/v1/posts/create", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/api/v1/posts/update/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/api/v1/posts/${id}`);
