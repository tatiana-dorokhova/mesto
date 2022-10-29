import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  }

  // переопределение метода open родительского класса 
  // link и name из карточки передаем как параметры, 
  // чтобы метод можно было вызывать на любых переданных данных
  open({
    name,
    link
  }) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.innerText = name;
    super.open();
  }
}