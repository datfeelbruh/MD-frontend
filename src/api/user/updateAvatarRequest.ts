import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType } from "@api/base/apiRequest";
import { Error } from "@api/commonTypes/error";
import { User } from "@api/commonTypes/user";

type SuccessResponse = User;
type FailResponse = Error;

export default function useUpdateAvatarRequest(updatedAvatar: FormData, onSuccess?: onSuccessFn<SuccessResponse>, onFail?: onFailFn<FailResponse>) {
  return useApi(
    new ApiRequest("/api/users/avatar", ApiRequestType.POST, {}, updatedAvatar, false, null),
    onSuccess,
    onFail,
    false
  );
}
