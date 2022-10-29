import Popup from "./Popup";
import {
  formSettings
} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    handleFormSubmit
  ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    // форма в попапе и ее элементы
    this._popupForm = this._popup.querySelector(formSettings.formSelector);
    this._popupFormInputs = this._popupForm.querySelectorAll(formSettings.inputSelector);
    this._popupFormSubmitButton = this._popupForm.querySelector(formSettings.submitButtonSelector);
  }
  // метод, возвращающий список полей формы попапа
  _getInputValues() {
    this._formValues = {};
    this._popupFormInputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
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
      this.close();
    })
  }
}