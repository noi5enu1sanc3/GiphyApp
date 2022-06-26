export default class Gif {
  constructor(data, templateSelector, elementsConfig, isHD = false) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._elementsConfig = elementsConfig;
    this._isHD = isHD;
  }

  _isFromServer() {
    return typeof this._data === 'object'
  }

  _getTemplate() {
    const gifElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(this._elementsConfig.gifSelector)
      .cloneNode(true);
      if (this._isFromServer()) {
        this._height = this._data.images.fixed_width.height;
        //setting height from api data to properly layout by masonry
        gifElement.style.height = this._height + 'px';
      }

    return gifElement;
  }

  renderGifFromServer() {
    this._element = this._getTemplate();
    this._gifImage = this._element.querySelector(this._elementsConfig.gifImageSelector);

    if (this._isFromServer()) {
     this._height = this._data.images.fixed_width.height;
      this._link = this._data.images.fixed_width.url;
      this._hdLink = this._data.images.original.url;

      (!this._isHD) ? this._gifImage.src = this._link : this._gifImage.src = this._hdLink;
    } else {
      this._gifImage.src = this._data
    }


    return this._element;
  }
}
