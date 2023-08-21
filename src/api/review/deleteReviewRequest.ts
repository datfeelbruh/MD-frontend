import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType } from "@api/base/apiRequest";
import { Error } from "@api/commonTypes/error";
import { Pages } from "@api/commonTypes/pages";
import { Review } from "@api/commonTypes/review";

type SuccessResponse = {
  reviews: Array<Review>,
} & Pages;

type FailResponse = Error;

export default function useDeleteReviewRequest(reviewId: number, onSuccess?: onSuccessFn<SuccessResponse>, onFail?: onFailFn<FailResponse>) {
  return useApi(
    new ApiRequest(`/api/reviews/${reviewId}`, ApiRequestType.DELETE),
    onSuccess,
    onFail,
    false
  );
}
