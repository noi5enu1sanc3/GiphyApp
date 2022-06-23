import Gif from "./Gif.js";

export default class RandomGif extends Gif {
  constructor(data, templateSelector, elementsConfig, options) {
    super(data, templateSelector, elementsConfig, options);
    this._link = this._link = data.images.original.url;
  }
}
