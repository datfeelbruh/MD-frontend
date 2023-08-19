import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType } from "@api/base/apiRequest";
import { Error } from "@api/commonTypes/error";
import { Pages } from "@api/commonTypes/pages";
import { Review } from "@api/commonTypes/review";

type ReviewBody = {
  review: string,
  rating: number,
};

type ReviewArray = {
  reviews: Array<Review>,
};

type SuccessResponse = ReviewArray & Pages;
type FailResponse = Error;

export default function useUpdateReviewRequest(reviewId: number, updatedReview: ReviewBody, onSuccess?: onSuccessFn<SuccessResponse>, onFail?: onFailFn<FailResponse>) {
  return useApi(
    new ApiRequest(`/api/reviews/${reviewId}`, ApiRequestType.PUT, {}, updatedReview),
    onSuccess,
    onFail,
    false,
  );
}
