/* eslint no-console: 0 */
export default
({ baseUrl = null, endPoint, method, body = null }) =>
  new Promise((resolve, reject) => {

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    const opts = {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    };

    fetch(`${baseUrl}${endPoint}`, opts)
      .then(response => {
        if (response.ok) {
          if (response.status === 204 || response.status === 201) {
            resolve();
          } else {
            response.json().then(resolve).catch(reject);
          }
        } else {
          response.json()
            .then(errJson => reject({ status: response.status, json: errJson }))
            .catch(reject);
        }
      })
      .catch((error) => {
        console.log('error', error);
        reject(error);
      });
  });
