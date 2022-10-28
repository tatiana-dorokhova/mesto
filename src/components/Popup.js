export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    // 
  }

  // публичный метод, открывающий попап
  open() {
    this._popup.classList.add('popup_opened');
    // механизм слушателя события такой, что this будет ссылаться на DOM-элемент, 
    // на котором событие сработало, и this.close не сработает без привязки this к попапу
    document.addEventListener('keydown', this._handleEscClose);
  }

  // публичный метод, закрывающий попап
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // закрытие попапа по нажатию клавиши Esc
  _handleEscClose(event) {
    const key = event.key;
    if (key === 'Escape') {
      this.close();
    };
  }

  // закрытие попапа по кнопке закрытия и по оверлею
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    })
  }
}