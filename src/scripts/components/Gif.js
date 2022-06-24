export default class Gif {
  constructor(data, templateSelector, elementsConfig) {
    this._link = data.images.fixed_width.url;
    this._templateSelector = templateSelector;
    this._elementsConfig = elementsConfig;
    this._height = data.images.fixed_width.height;
  }

  _getTemplate() {
    const gifElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(this._elementsConfig.gifSelector)
      .cloneNode(true);

    //setting height from api data to properly layout by masonry
    gifElement.style.height = this._height + 'px';

    return gifElement;
  }

  renderGif() {
    this._element = this._getTemplate();
    this._gifImage = this._element.querySelector(this._elementsConfig.gifImageSelector);

    this._gifImage.src = this._link;
    console.log(this._height)
    return this._element;
  }

  clearGif() {
    this._gifImage.src = ''
  }
}
