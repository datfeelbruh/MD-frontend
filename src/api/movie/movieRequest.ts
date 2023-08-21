import useApi, { onFailFn, onSuccessFn } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType } from "@api/base/apiRequest";
import { Error } from "@api/commonTypes/error";
import { Movie } from "@api/commonTypes/movie";

type SuccessResponse = Movie;

type FailResponse = Error;

export default function useMovieRequest(movieId: number, onSuccess: onSuccessFn<SuccessResponse> = null, onFail: onFailFn<FailResponse> = null) {
  return useApi(new ApiRequest(`/api/movie/${movieId}`, ApiRequestType.GET), onSuccess, onFail);
}
