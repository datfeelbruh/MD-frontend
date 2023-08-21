import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType, Params } from "@api/base/apiRequest";
import { PageParams } from "@api/commonParams/page";
import { Error } from "@api/commonTypes/error";
import { Pages } from "@api/commonTypes/pages";
import { Review } from "@api/commonTypes/review";

type ReviewParams = {
  movieId?: number,
  userId?: number,
} & PageParams;

type ReviewArray = {
  reviews: Array<Review>,
};

type SuccessResponse = ReviewArray & Pages;
type FailResponse = Error;

export default function useGetReviewsRequest(params: ReviewParams, onSuccess?: onSuccessFn<SuccessResponse>, onFail?: onFailFn<FailResponse>) {
  return useApi(
    new ApiRequest("/api/reviews", ApiRequestType.GET, params as unknown as Params),
    onSuccess,
    onFail
  );
}

type UserReviewParams = {
  movieId: number,
  userId: number,
};

type SuccessUserResponse = Review;

export function useGetUserReviewRequest(params: UserReviewParams, onSuccess?: onSuccessFn<SuccessUserResponse>, onFail?: onFailFn<FailResponse>) {
  return useApi(
    new ApiRequest("/api/reviews", ApiRequestType.GET, params as unknown as Params),
    onSuccess,
    onFail
  );
}
