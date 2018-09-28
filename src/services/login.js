import apiFetch from './apiFetch'
export const login = (data) =>
  apiFetch({
    baseUrl: data.baseUrl,
    endPoint: encodeURI('/match'),
    method: 'POST',
    body: data.name,
  });
