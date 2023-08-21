import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType } from "@api/base/apiRequest";
import { Error } from "@api/commonTypes/error";

type EmailParam = {
  email: string,
};

type SuccessResponse = {
  message: string,
};

type FailResponse = Error;

export default function useGetMailRequest(email: EmailParam, onSuccess?: onSuccessFn<SuccessResponse>, onFail?: onFailFn<FailResponse>) {
  return useApi(
    new ApiRequest("/api/forgotPassword/reset", ApiRequestType.GET, email, null, true),
    onSuccess,
    onFail,
    false
  );
}

type TokenParam = {
  token: string,
};

type PasswordBody = {
  password: string,
};

export function useResetpasswordRequest(token: TokenParam, password: PasswordBody, onSuccess?: onSuccessFn<SuccessResponse>, onFail?: onFailFn<FailResponse>) {
  return useApi(
    new ApiRequest("/api/forgotPassword/reset", ApiRequestType.POST, token, password, true),
    onSuccess,
    onFail,
    false
  );
}
