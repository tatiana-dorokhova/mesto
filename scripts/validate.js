// включение валидации вызовом enableValidation
// все настройки передаются при вызове


// показывает элемент ошибки
const showInputError = (formElement, inputElement, errorMessage, params) => {
  // сформировать уникальное имя класса ошибки по уникальному имени поля
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  // добавить подчеркивание красным нижней границы инпута
  inputElement.classList.add(params.inputErrorClass);
  // записать в span текст браузерной ошибки
  errorElement.textContent = errorMessage;
  // добавить ошибке видимость
  errorElement.classList.add(params.errorClass);
};

// скрывает элемент ошибки
const hideInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  // убрать классы ошибки и ее видимости, очистить текст ошибки
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, params) => {
  // дизэйблить кнопку сохранения, если есть невалидные поля
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(params.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
  else {
    buttonElement.classList.remove(params.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', false);
  }
};

const setEventListeners = (formElement, params) => {
  // найти все инпуты на форме, переданной в formElement
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  // найти кнопку сабмита на этой форме
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  // сделать кнопку сохранения неактивной, если поле пустое (т.е. невалидное)
  toggleButtonState(inputList, buttonElement, params);
  // для каждого инпута на всех формах повесить листнеры
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      console.log(checkInputValidity(formElement, inputElement));
      toggleButtonState(inputList, buttonElement, params);
    });
  });
};





const enableValidation = (params) => {
  // найти все формы на странице
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  // для каждой формы сбросить дефолтное поведение кнопки сохранения
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  // повесить листнеры на все инпуты в
    formList.forEach((formElement) => {
      setEventListeners(formElement, params);
    });
  });
};
