export default class Card {
  constructor (card, templateSelector, openImagePopup) {
    this._card = card;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;

    this._element = this._getTemplate();
    this._nameElement = this._element.querySelector('.element__name');
    this._imageElement = this._element.querySelector('.element__image');
    this._deleteElement = this._element.querySelector('.element__delete');
    this._likeElement = this._element.querySelector('.element__like');
  }

  // забрать шаблон карточки из index.html
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
      const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
      console.log(1);
    // вернём DOM-элемент карточки
      return cardElement;
  }

  _handleDeleteButtonClick(event) {
  // удаляем ближайший от кнопки удаления элемент с классом element
  // обработчик события клика по картинке удаляется вместе с элементом автоматически
  const cardListItem = event.target.closest('.element');
  cardListItem.remove();
  }

  _handleLikeButtonClick(event) {
  event.target.classList.toggle('element__like_marked');
  }

  _setEventListeners() {
    // раскрытие изображения
    this._imageElement.addEventListener('click', () => {
      this._openImagePopup(this._card);
    });
    // удаление карточки
    this._deleteElement.addEventListener('click', (event) => {
      this._handleDeleteButtonClick(event);
    });
    // кнопка лайка
    this._likeElement.addEventListener('click', (event) => {
      this._handleLikeButtonClick(event);
    });
  }

    // наполнение шаблона карточки данными
    generateCard() {
      // добавить данные
      this._nameElement.innerText = this._card.name;
      this._imageElement.alt = this._card.name;
      this._imageElement.src = this._card.link;
      // навесить листнеры
      this._setEventListeners();
      // вернуть заполненный элемент наружу
      return this._element;
    }
}
