export default class ReloadButton {
  constructor (buttonSelector, actionHandler, animationClass) {
    this._button = document.querySelector(buttonSelector);
    this._actionHandler = actionHandler;
    this._animationClass = animationClass;
  }

  _startAnimation() {
    this._button.classList.add(this._animationClass);
  }

  _stopAnimation() {
    this._button.classList.remove(this._animationClass);
  }

  setEventListeners() {
    this._button.addEventListener('click', () => {
      this._actionHandler();
    })
  }
}
