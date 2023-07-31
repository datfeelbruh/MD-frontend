import { toast } from "react-toastify";
import { STORAGE, TOKEN_NAME } from ".";

export function displayAxiosError(error) {
  console.error(error);

  let customError = error?.response?.data?.message;
  let message = error.message;
  if (customError !== undefined) message = customError;
  toast.error(message);
}

export function getToken() {
  return STORAGE.getItem(TOKEN_NAME);
}