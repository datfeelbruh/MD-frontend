import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType, Params } from "@api/base/apiRequest";
import { Error } from "@api/commonTypes/error";
import { Movie } from "@api/commonTypes/movie";
import { Pages } from "@api/commonTypes/pages";
import { Review } from "@api/commonTypes/review";

type ExpandedMovie = {
  reviews: Array<Omit<Review, "movieId">>,
} & Movie;

type SuccessResponse = {
  movies: Array<ExpandedMovie>,
} & Pages;

type FailResponse = Error;

export default function useMovieSearchRequest(params: Params, onSuccess: onSuccessFn<SuccessResponse> = null, onFail: onFailFn<FailResponse> = null) {
  return useApi(new ApiRequest("/api/movie", ApiRequestType.GET, params), onSuccess, onFail);
}
