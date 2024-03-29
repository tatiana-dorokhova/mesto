import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    handleFormSubmit
  ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    // форма в попапе и ее элементы
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupFormInputs = this._popupForm.querySelectorAll('.popup__input');
  }
  // метод, возвращающий список полей формы попапа
  _getInputValues() {
    this._formValues = {};
    this._popupFormInputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._popupFormInputs.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  // закрытие формы с ее очисткой
  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    // закрытие попапа по кнопке и оверлею без очистки формы
    super.setEventListeners();
    // закрытие попапа по нажатию на кнопку сабмита с очисткой формы
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      // попап не должен закрываться, если возникнет ошибка в ответе от сервера, 
      // поэтому функционал закрытия уходит в блок then соответствующей цепочки промиcов
    })
  }

  // метод, меняющий текст кнопки сабмита во время сохранения данных
  // на входе: originalValue - текст кнопки до нажатия
  //           valueWhileSaving - текст кнопки во время сохранения
  changeButtonTextOnSaving(isSaving, originalButtonText, buttonTextWhileSaving) {
    if (isSaving) {
      this._popupSubmitButton.textContent = buttonTextWhileSaving;
    } else {
      this._popupSubmitButton.textContent = originalButtonText;
    }
  }
}