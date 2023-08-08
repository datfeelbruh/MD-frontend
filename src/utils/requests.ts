import { toast } from "react-toastify";

export async function get(url: string, useAuth: boolean = true): Promise<Response> {
  return request(url, "GET", undefined, useAuth);
}

export async function post(url: string, body: object, useAuth: boolean = true): Promise<Response> {
  return request(url, "POST", body, useAuth)
}

export async function put(url: string, body: object, useAuth: boolean = true): Promise<Response> {
  return request(url, "PUT", body, useAuth);
}

export async function delete_(url: string, useAuth: boolean = true): Promise<Response> {
  return request(url, "DELETE", undefined, useAuth);
}

async function request(url: string, method: string, body: object | undefined, useAuth: boolean): Promise<Response> {
  return fetch(url, {
    method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      ...(useAuth && { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))?.state?.token}` }),
    },
    ... (body !== undefined && { body: JSON.stringify(body) }),
  });
}

export function displayError(error) {
  console.error(error);
  let message = error;
  try {
    message = JSON.parse(error).message;
  } catch { }
  toast.error(message);
}

