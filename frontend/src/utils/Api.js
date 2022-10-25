export class Api {
  constructor(options) {
    this._options = options; // тело конструктора
  }

  _checkResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    };
  }
 
  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
      credentials: this._options.credentials,
    })
    .then(this._checkResponse);
  }

  addNewCard(data) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
      credentials: this._options.credentials,
    })
    .then(this._checkResponse) 
  }

  updAvatar(data) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: data.avatar
      }),
      credentials: this._options.credentials,
    })
    .then(this._checkResponse) 
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
      credentials: this._options.credentials,
    })
    .then(this._checkResponse)
  }

  editUserInfo(data) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
      credentials: this._options.credentials,
    })
    .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._options.headers,
      credentials: this._options.credentials,
    })
    .then(this._checkResponse)
  }

  toggleLike(cardId, isLiked) {
    if (!isLiked) {
      return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._options.headers,
        credentials: this._options.credentials,
      })
      .then(this._checkResponse)
    } else {
      return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._options.headers,
        credentials: this._options.credentials,
      })
      .then(this._checkResponse)
    }
  }

  logout() {
    return fetch(`${this._options.baseUrl}/signout`, {
      headers: this._options.headers,
      credentials: this._options.credentials,
    })
    .then(this._checkResponse)
  }
}

export const api = new Api({
  //baseUrl: 'https://api.nastiakor.mesto.nomoredomains.icu',
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
});



