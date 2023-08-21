import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType } from "@api/base/apiRequest";
import { Error } from "@api/commonTypes/error";

type LoginBody = {
  username: string,
  password: string,
};

type SuccessResponse = {
  accessToken: string,
};

type FailResponse = Error;

export default function useLoginRequest(body: LoginBody, onSuccess?: onSuccessFn<SuccessResponse>, onFail?: onFailFn<FailResponse>) {
  return useApi(
    new ApiRequest("/api/auth/login", ApiRequestType.POST, {}, body),
    onSuccess,
    onFail,
    false
  );
};
