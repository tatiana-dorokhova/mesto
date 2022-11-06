import Popup from "./Popup";
// попап должен открываться по клику на иконку удаления в карточке
export default class PopupWithConfirmation extends Popup {
  constructor(
    popupSelector,
    handleSubmitButton
  ) {
    super(popupSelector);
    this._handleSubmitButton = handleSubmitButton;
  }

  open(cardId, element) {
    super.open();
    // листнер на нажатие кнопки подтверждения удаления
    this._popupSubmitButton.addEventListener('click', (evt) => {
      this._handleSubmitButton(cardId, element);
    });
  }
}