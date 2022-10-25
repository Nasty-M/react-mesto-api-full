class RegisterApi {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    };
  }

  register(data) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse)
  }

  auth(data) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify(data),
      credentials: this._options.credentials,
    })
    .then(this._checkResponse)
  }

  // getUserInfo(token) {
  //   return fetch(`${this._options.baseUrl}/users/me`, {
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization" : `Bearer ${token}`
  //     }
  //   })
  //   .then(this._checkResponse)
  // }
}

const registerApi = new RegisterApi({
  //baseUrl: 'https://api.nastiakor.mesto.nomoredomains.icu',
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
});

export default registerApi;