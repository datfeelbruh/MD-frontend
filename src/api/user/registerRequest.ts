import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType } from "@api/base/apiRequest";
import { Error } from "@api/commonTypes/error";
import { User } from "@api/commonTypes/user";

type UserBody = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
};

type SuccessResponse = User;
type FailResponse = Error;

export default function useRegisterRequest(newUser: UserBody, onSuccess?: onSuccessFn<SuccessResponse>, onFail?: onFailFn<FailResponse>) {
  return useApi(
    new ApiRequest("/api/users", ApiRequestType.POST, {}, newUser, false),
    onSuccess,
    onFail,
    false,
  );
}
