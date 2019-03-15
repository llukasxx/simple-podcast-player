enum Methods {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  PUT = 'PUT',
}

interface IApiParams {
  method: Methods;
  path: string;
}

export const apiCall = async ({ method, path }: IApiParams) => {
  const fullUrl = `${process.env.REACT_APP_HOST}/${path}`;

  const response = await fetch(fullUrl, {
    method,
  });

  if (!response.ok) {
    return Promise.reject(response);
  }
  return response;
};

const api = {
  get: (path: string) =>
    apiCall({
      method: Methods.GET,
      path,
    }),
};

export default api;
