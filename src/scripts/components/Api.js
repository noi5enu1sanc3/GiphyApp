export default class Api {
  constructor(key, options) {
    this._key = key;
    this._baseUrl = options.baseUrl;
  }

  _getResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  getTrendingGifs() {
    return fetch (`${this._baseUrl}gifs/trending?api_key=${this._key}`)
      .then((res) => this._getResponse(res));
  }

  getRandomGif() {
    return fetch (`${this._baseUrl}gifs/random?api_key=${this._key}`)
      .then((res) => this._getResponse(res));
  }

  getSearches() {
    return fetch (`${this._baseUrl}trending/searches?api_key=${this._key}`)
      .then((res) => this._getResponse(res));
  }

  search(str) {
    return fetch (`${this._baseUrl}gifs/search?q=${str}&api_key=${this._key}`)
      .then((res) => this._getResponse(res));
  }

  upload(){}
}
