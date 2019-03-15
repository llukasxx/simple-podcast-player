interface IApiParams {
  method: string;
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
  get: (path: IApiParams['path']) =>
    apiCall({
      method: 'GET',
      path,
    }),
};

export default api;
