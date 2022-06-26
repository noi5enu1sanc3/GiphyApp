export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    console.log(items)
    //debugger
    items.forEach((item) => this._renderer(item));
  }

  renderItem(item) {
    this._renderer(item);
  }

  addItem(element) {
    this._container.append(element);
  }

  clearContainer() {
    if (this._container.childNodes.length !== 0) {
      this._container.innerHTML = '';
    }

  }
}
