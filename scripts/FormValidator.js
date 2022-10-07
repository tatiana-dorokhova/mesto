// включение валидации вызовом enableValidation
// все настройки передаются при вызове

export default class FormValidator {
  constructor (params, formElement) {
    this._formSelector = params.formSelector,
    this._inputSelector = params.inputSelector,
    this._submitButtonSelector = params.submitButtonSelector,
    this._inactiveButtonClass = params.inactiveButtonClass,
    this._inputErrorClass = params.inputErrorClass,
    this._errorClass = params.errorClass;

    this._formElement = formElement;
  }

// показывает элемент ошибки (применяется к инпуту на форме)
_showInputError(errorMessage) {
  // сформировать уникальное имя класса ошибки по уникальному имени поля
  const errorElement = this._formElement.querySelector(`.${this._inputSelector.name}-error`);
  // добавить подчеркивание красным нижней границы инпута
  this._inputSelector.classList.add(this._inputErrorClass);
  // записать в span текст браузерной ошибки
  errorElement.textContent = errorMessage;
  // добавить ошибке видимость
  errorElement.classList.add(this._errorClass);
};

// скрывает элемент ошибки
_hideInputError () {
  const errorElement = this._formElement.querySelector(`.${this._inputSelector.name}-error`);
  // убрать классы ошибки и ее видимости, очистить текст ошибки
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
};

// проверяет валидность одного инпута
_checkInputValidity () {
  if (!this._inputSelector.validity.valid) {
    _showInputError(this._formElement, this._inputSelector, this._inputSelector.validationMessage);
  } else {
    _hideInputError(this._formElement, this._inputSelector);
  }
};

// проверка, есть ли хотя бы один невалидный инпут из списка
_hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
// переключение состояния кнопки сабмита
_toggleButtonState (inputList, buttonElement) {
  // дизэйблить кнопку сохранения, если есть невалидные поля
  if (_hasInvalidInput(inputList)) {
    buttonElement.classList.add(this._params.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(this._params.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', false);
  }
};
// навешивание листнеров на все инпуты
_setEventListeners (formElement) {
  // найти все инпуты на форме, переданной в formElement
  const inputList = Array.from(formElement.querySelectorAll(this._params.inputSelector));
  // найти кнопку сабмита на этой форме
  const buttonElement = formElement.querySelector(this._params.submitButtonSelector);
  // сделать кнопку сохранения неактивной, если поле пустое (т.е. невалидное)
  _toggleButtonState(inputList, buttonElement);
  // для каждого инпута на всех формах повесить листнеры
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      _checkInputValidity(formElement, inputElement);
      _toggleButtonState(inputList, buttonElement);
    });
  });
};

// переключение состояни кнопки сабмита при открытии попапа
_toggleSubmitButtonOnOpeningPopup (popup) {
  // найти все инпуты в переданном popup
  const inputList = Array.from(popup.querySelectorAll(this._params.inputSelector));
  // найти кнопку сабмита на этой форме
  const buttonElement = popup.querySelector(this._params.submitButtonSelector);
  // сделать кнопку сохранения неактивной, если поля невалидные
  _toggleButtonState(inputList, buttonElement, this._params);
};

// очистка сообщения об ошибках при открытии попапа
_hideInputErrorOnOpeningPopup (popup) {
  const inputList = Array.from(popup.querySelectorAll(this._params.inputSelector));
  // для всех инпутов очистить ошибки
  inputList.forEach((inputElement) => _hideInputError(popup, inputElement, this._params));
};

// включение валидации для одной формы
enableValidation () {
  // для формы сбросить дефолтное поведение кнопки сохранения
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    // повесить листнеры на все инпуты на форме
    this._params.inputSelector.forEach((input) => {
      _setEventListeners(input)}
      );
}


}



