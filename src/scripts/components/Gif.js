export default class Gif {
  constructor(data, templateSelector, elementsConfig) {
    this._link = data.images.fixed_width.url;
    this._templateSelector = templateSelector;
    this._elementsConfig = elementsConfig;
  }

  _getTemplate() {
    const gifElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(this._elementsConfig.gifSelector)
      .cloneNode(true);

    return gifElement;
  }

  renderGif() {
    this._element = this._getTemplate();
    this._gifImage = this._element.querySelector(this._elementsConfig.gifImageSelector);

    this._gifImage.src = this._link;

    return this._element;
  }

  clearGif() {
    this._gifImage.src = ''
  }
}
