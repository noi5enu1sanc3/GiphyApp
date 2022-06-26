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

  upload(str) {
    const urlencoded = new URLSearchParams();
    urlencoded.append("source_image_url", str);
    const options = {
      method: 'POST',
      body: urlencoded,
      redirect: 'follow'
    };
    return fetch (`https://upload.giphy.com/v1/gifs?api_key=${this._key}`, options,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then((res) => this._getResponse(res));
  }

  getGifById(id) {
    return fetch(`${this._baseUrl}gifs/${id}`)
    .then((res) => this._getResponse(res));
  }
}
