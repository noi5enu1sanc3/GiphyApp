export default class Form {
  constructor(sectionSelector, elementsConfig, handleFormSubmit) {
    this._section = document.querySelector(sectionSelector);
    this._form = this._section.querySelector(elementsConfig.formSelector);
    this._input = this._form.querySelector(elementsConfig.inputSelector);
    this._submitButton = this._form.querySelector(elementsConfig.buttonSelector);

    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValue() {
    this._inputValue = '';

    this._inputValue = this._input.value;
    return this._inputValue;
  }

  renderButtonText(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValue());
      this._form.reset();
    })
  }
}
