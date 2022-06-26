export default class FormValidator {
  constructor (config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form;
    this._input = this._form.querySelector(this._inputSelector);
    this._button = this._form.querySelector(this._submitButtonSelector);
  }

  _toggleButton() {
    this._button.disabled = !this._form.checkValidity();
    this._button.classList.toggle(this._inactiveButtonClass, !this._form.checkValidity());
  }

  _handleFormInput(input) {
    input.validity.valid ? this._hideError(input) : this._showError(input);
    this._toggleButton();
  }

  _showError(input) {
    const errorNode = document.querySelector(`#${input.id}-error`);
    console.log(errorNode)
    errorNode.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  }

  _hideError(input) {
    const errorNode = document.querySelector(`#${input.id}-error`);
    errorNode.textContent = '';
    input.classList.remove(this._inputErrorClass);
  }

  _setEventListeners() {
    this._form.addEventListener('input', (evt) => {this._handleFormInput(evt.target)});
  }

  resetErrors() {
    this._hideError(this._input);
    this._toggleButton();
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButton();
  }
}
