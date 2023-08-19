import { useState } from "preact/hooks";
import ApiRequest from "./apiRequest";

export type onSuccessFn<T> = (res: T) => void;
export type onFailFn<T> = (res: T) => void;

export default function useApi<S, F, B = void>(request: ApiRequest<B>, onSuccess: onSuccessFn<S> = null, onFail: onFailFn<F> = null) {
  const [response, setResponse] = useState<{ success?: S, fail?: F } | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);

  function call() {
    fetch(request.toURI(), {
      method: request.type,
      mode: "cors",
      headers: {
        "Content-Type": request.contentType,
        ...(!request.publicEndpoint && { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))?.state?.token}` })
      },
      ...(request.body !== null && request.body !== undefined && { body: JSON.stringify(request.body) })
    })
      .then(data => data.json())
      .then(data => data?.statusCode === undefined ? data : Promise.reject(new Error(JSON.stringify(data))))
      .then(data => { setLoading(false); setResponse({ success: data }); onSuccess?.(data); })
      .catch(error => {
        setLoading(false);
        setError(true);
        try { error = JSON.parse(error.message); } catch { };
        setResponse({ fail: error });
        onFail?.(error);
        console.error(error);
      });
  }

  return {
    call,
    response,
    setResponse,
    isLoading,
    isError
  };
}

export function generateApiHook<S, F, B = void>(request: ApiRequest<B>) {
  return (onSuccess: onSuccessFn<S> = null, onFail: onFailFn<F> = null) => useApi(request, onSuccess, onFail);
}
