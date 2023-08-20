import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType, Params } from "@api/base/apiRequest";
import { PageParams } from "@api/commonParams/page";
import { Error } from "@api/commonTypes/error";
import { Movie } from "@api/commonTypes/movie";
import { Pages } from "@api/commonTypes/pages";
import { Review } from "@api/commonTypes/review";

type SearchParams = {
  genreName: string,
} & PageParams;

type ExpandedMovie = {
  reviews: Array<Omit<Review, "movieId">>,
} & Movie;

type SuccessResponse = {
  movies: Array<ExpandedMovie>,
} & Pages;

type FailResponse = Error;

export default function useGenreSearchRequest(params: SearchParams, onSuccess: onSuccessFn<SuccessResponse> = null, onFail: onFailFn<FailResponse> = null) {
  return useApi(new ApiRequest("/api/movie/genre", ApiRequestType.GET, params as unknown as Params), onSuccess, onFail);
}
