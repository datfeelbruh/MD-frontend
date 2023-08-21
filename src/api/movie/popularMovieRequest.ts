import { generateApiHook } from "@api/base/apiHook";
import ApiRequest, { ApiRequestType } from "@api/base/apiRequest";

type PopularMovie = {
  id: number,
  title: string,
  poster: string,
  reviewCount: number;
};

type SuccessResponse = Array<PopularMovie>;
type FailResponse = Error;

const usePopularTitleRequest = generateApiHook<SuccessResponse, FailResponse>(new ApiRequest("/api/movie/popular", ApiRequestType.GET));
export default usePopularTitleRequest;
