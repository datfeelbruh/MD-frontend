export enum ApiRequestType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
};

export type Params = { [k: string]: string };

export default class ApiRequest<B = void> {
  url: string;
  type: ApiRequestType;
  publicEndpoint: boolean;
  body: B;
  params: Params;
  contentType: string;

  constructor(url: string, type: ApiRequestType, params: Params = {}, body: B = null, publicEndpoint: boolean = false, contentType: string = "application/json") {
    this.url = url;
    this.type = type;
    this.publicEndpoint = publicEndpoint;
    if (type !== ApiRequestType.GET)
      this.body = body;
    this.params = params;
    this.contentType = contentType;
  }

  toURI() {
    let url = new URL(this.url, window.location.origin);
    Object.entries(this.params)?.forEach(e => url.searchParams.append(e?.[0], e?.[1]));
    return url.toString();
  }
}
