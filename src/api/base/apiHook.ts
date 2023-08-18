import { useState } from "preact/hooks";
import ApiRequest from "./apiRequest";

export type onSuccessFn<T> = (res: T) => void;
export type onFailFn<T> = (res: T) => void;

export default function useApi<S, F, B = void>(request: ApiRequest<B>, onSuccess: onSuccessFn<S> = null, onFail: onFailFn<F> = null) {
  const [response, setResponse] = useState<{ response?: S, fail?: F } | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  function call() {
    fetch(request.toURI(), {
      method: request.type,
      mode: "cors",
      headers: {
        "Content-Type": request.contentType,
        ...(!request.publicEndpoint && { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))?.state?.token}` })
      },
      ...(request.body !== null && { body: JSON.stringify(request.body) })
    })
      .then(data => { setLoading(true); return data; })
      .then(data => ({ body: data.json(), ok: data.ok }))
      .then(data => data.ok ? data.body : Promise.reject(new Error(JSON.stringify(data.body))))
      .then(data => { setLoading(false); setResponse({ response: data }); onSuccess?.(data); })
      .catch(error => { setLoading(false); setError(true); setResponse({ fail: error }); onFail?.(error) });
  }

  return {
    call,
    response,
    isLoading,
    isError
  };
}

export function generateApiHook<S, F, B = void>(request: ApiRequest<B>) {
  return (onSuccess: onSuccessFn<S> = null, onFail: onFailFn<F> = null) => useApi(request, onSuccess, onFail);
}
