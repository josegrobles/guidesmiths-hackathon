import apiFetch from './apiFetch'
export const match = (data) =>
  apiFetch({
    baseUrl: data.baseUrl,
    endPoint: encodeURI('/match'),
    method: 'POST',
    body: data.name,
  });
