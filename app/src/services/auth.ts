import api from "./api";
import { AxiosResponse } from "axios";

const fetchAPI = api();
export async function signin(user: string, password: string) {
  const res: AxiosResponse<{ data: { success: boolean, token: string } }, any> = await fetchAPI.post("/auth/signin", {
    user,
    password
  })
  return res.data.data.token
}

export async function signout() {
  await fetchAPI.delete("/auth/signout");
  window.localStorage.removeItem("token");
}

export async function signup(username: string, password: string, email: string) {
  const res: AxiosResponse<{ data: { success: boolean, token: string } }, any> = await fetchAPI.post("/auth/signup", {
    username,
    email,
    password
  })
  return res.data.data.token

}
