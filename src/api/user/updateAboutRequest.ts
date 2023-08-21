import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType } from "@api/base/apiRequest";
import { Error } from "@api/commonTypes/error";
import { User } from "@api/commonTypes/user";

type AboutBody = {
  about: string,
};

type SuccessResponse = User;
type FailResponse = Error;

export default function useUpdateAboutRequest(userId: number, updatedAbout: AboutBody, onSuccess?: onSuccessFn<SuccessResponse>, onFail?: onFailFn<FailResponse>) {
  return useApi(
    new ApiRequest(`/api/users/${userId}`, ApiRequestType.PUT, {}, updatedAbout),
    onSuccess,
    onFail,
    false,
  );
}
