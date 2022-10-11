export default class FormValidator {
  constructor(params, formElement) {
    this._formSelector = params.formSelector;
    this._inputSelector = params.inputSelector;
    this._submitButtonSelector = params.submitButtonSelector;
    this._inactiveButtonClass = params.inactiveButtonClass;
    this._inputErrorClass = params.inputErrorClass;
    this._errorClass = params.errorClass;

    this._formElement = formElement;

    // все инпуты на форме
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    // кнопка сабмита на форме
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  // показывает элемент ошибки
  _showInputError(inputElement, errorMessage) {
    // сформировать уникальное имя класса ошибки по уникальному имени поля
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    // добавить подчеркивание красным нижней границы инпута
    inputElement.classList.add(this._inputErrorClass);
    // записать в span текст браузерной ошибки
    errorElement.textContent = errorMessage;
    // добавить ошибке видимость
    errorElement.classList.add(this._errorClass);
  };

  // скрывает элемент ошибки
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    // убрать классы ошибки и ее видимости, очистить текст ошибки
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // проверяет валидность одного инпута
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // проверка, есть ли хотя бы один невалидный инпут из списка
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  // переключение состояния кнопки сабмита
  _toggleButtonState() {
    // дизэйблить кнопку сохранения, если есть невалидные поля
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', false);
    }
  };
  // навешивание листнеров на все инпуты формы
  _setEventListeners() {
    // сделать кнопку сохранения неактивной, если поле пустое (т.е. невалидное)
    this._toggleButtonState();
    // для каждого инпута на форме повесить листнеры
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  // переключение состояния кнопки сабмита при открытии попапа
  toggleSubmitButtonOnOpeningPopup() {
    // сделать кнопку сохранения неактивной, если поля невалидные
    this._toggleButtonState(this._inputList, this._buttonElement);
  };

  // очистка сообщения об ошибках при открытии попапа
  hideInputErrorOnOpeningPopup() {
    // для всех инпутов очистить ошибки
    this._inputList.forEach((inputElement) => this._hideInputError(inputElement));
  };

  // включение валидации для конкретной формы
  enableValidation() {
    // для формы сбросить дефолтное поведение кнопки сохранения
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    // повесить листнеры на все инпуты формы
    this._setEventListeners();
  };
}