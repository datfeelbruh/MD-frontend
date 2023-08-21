import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType, Params } from "@api/base/apiRequest";
import { PageParams } from "@api/commonParams/page";
import { Error } from "@api/commonTypes/error";
import { Movie } from "@api/commonTypes/movie";
import { Pages } from "@api/commonTypes/pages";
import { User } from "@api/commonTypes/user";

type UserMovieParams = PageParams;

type ExpandedMovie = {
  rating: number,
  review: string,
} & Movie;

type SuccessResponse = {
  user: User,
  movies: Array<ExpandedMovie>,
} & Pages;

type FailResponse = Error;

export default function useUserMoviesRequest(userId: number, params: UserMovieParams, onSuccess: onSuccessFn<SuccessResponse> = null, onFail: onFailFn<FailResponse> = null) {
  return useApi(new ApiRequest(`/api/movie/user/${userId}`, ApiRequestType.GET, params as unknown as Params), onSuccess, onFail);
}
