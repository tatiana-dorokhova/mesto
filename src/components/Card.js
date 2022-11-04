export default class Card {
  constructor(card, userId, templateSelector, handleCardClick) {
    this._card = card;

    this._userId = userId;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

    this._element = this._getTemplate();
    this._nameElement = this._element.querySelector('.element__name');
    this._imageElement = this._element.querySelector('.element__image');
    this._deleteElement = this._element.querySelector('.element__delete');
    this._likeElement = this._element.querySelector('.element__like');
    this._likeCounterElement = this._element.querySelector('.element__likes-counter');
  }

  // забрать шаблон карточки из index.html
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  _handleDeleteButtonClick() {
    // удаляем ближайший от кнопки удаления элемент с классом element
    // обработчик события клика по картинке удаляется вместе с элементом автоматически
    this._element.remove();
    this._element = null; // таким образом удалится ссылка на элемент, и сборщик мусора при следующем проходе очистит память
  }

  _handleLikeButtonClick() {
    this._likeElement.classList.toggle('element__like_marked');
  }

  _setEventListeners() {
    // раскрытие изображения
    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._card);
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
    this._likeCounterElement.innerText = this._card.likes.length;

    // если id owner-а карточки не совпадает с id из api.getUserProfile, 
    // то удалить корзину с карточки (наверное можно скрывать, а не удалять)
    if (this._card.owner._id !== this._userId) {
      this._deleteElement.remove();
    }
    // навесить листнеры
    this._setEventListeners();
    // вернуть заполненный элемент наружу
    return this._element;
  }
}