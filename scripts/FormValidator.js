export default class FormValidator {
  constructor(params, formElement) {
    this._formSelector = params.formSelector,
      this._inputSelector = params.inputSelector,
      this._submitButtonSelector = params.submitButtonSelector,
      this._inactiveButtonClass = params.inactiveButtonClass,
      this._inputErrorClass = params.inputErrorClass,
      this._errorClass = params.errorClass;

    this._formElement = formElement;
  }

  // показывает элемент ошибки
  _showInputError(formElement, inputElement, errorMessage) {
    // сформировать уникальное имя класса ошибки по уникальному имени поля
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    // добавить подчеркивание красным нижней границы инпута
    inputElement.classList.add(this._inputErrorClass);
    // записать в span текст браузерной ошибки
    errorElement.textContent = errorMessage;
    // добавить ошибке видимость
    errorElement.classList.add(this._errorClass);
  };

  // скрывает элемент ошибки
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    // убрать классы ошибки и ее видимости, очистить текст ошибки
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // проверяет валидность одного инпута
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  // проверка, есть ли хотя бы один невалидный инпут из списка
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  // переключение состояния кнопки сабмита
  _toggleButtonState(inputList, buttonElement) {
    // дизэйблить кнопку сохранения, если есть невалидные поля
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled', false);
    }
  };
  // навешивание листнеров на все инпуты
  _setEventListeners(formElement) {
    // найти все инпуты на форме, переданной в formElement
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    // найти кнопку сабмита на этой форме
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    // сделать кнопку сохранения неактивной, если поле пустое (т.е. невалидное)
    this._toggleButtonState(inputList, buttonElement);
    // для каждого инпута на всех формах повесить листнеры
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  // переключение состояния кнопки сабмита при открытии попапа
  toggleSubmitButtonOnOpeningPopup(formElement) {
    // найти все инпуты в переданном popup
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    // найти кнопку сабмита на этой форме
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    // сделать кнопку сохранения неактивной, если поля невалидные
    this._toggleButtonState(inputList, buttonElement);
  };

  // очистка сообщения об ошибках при открытии попапа
  hideInputErrorOnOpeningPopup(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    // для всех инпутов очистить ошибки
    inputList.forEach((inputElement) => this._hideInputError(formElement, inputElement));
  };

  // включение валидации для конкретной формы
  enableValidation() {
    // для формы сбросить дефолтное поведение кнопки сохранения
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    // повесить листнеры на все инпуты во всех формах на странице
    this._setEventListeners(this._formElement);
  };
}