export default class Card {
  constructor(card, userId, templateSelector, handleCardClick, handleDeleteButtonClick, handleLikeButtonClick) {
    this._card = card;

    this._userId = userId;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;

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

  // deleteCardFromContainer() {
  //   // удаляем ближайший от кнопки удаления элемент с классом element
  //   // обработчик события клика по картинке удаляется вместе с элементом автоматически
  //   this._element.remove();
  //   this._element = null; // таким образом удалится ссылка на элемент, и сборщик мусора при следующем проходе очистит память
  // }

  // смена цвета иконки лайка
  _toggleLikeButtonState() {
    this._likeElement.classList.toggle('element__like_marked');
  }

  _markLikeButton() {
    this._likeElement.classList.add('element__like_marked');
  }

  // unmarkLikeButton() {
  //   this._likeElement.classList.remove('element__like_marked');
  // }

  // показать значение счетчика лайков на карточке
  _showLikeCounterValue() {
    this._likeCounterElement.innerText = this._card.likes.length;
  }

  // если карточку лайкнули или сняли лайк, ей нужно:
  // сменить массив лайков на новый
  // переключить цвет у иконки лайка
  // обновить счетчик лайков и отобразить его
  handlePressLikeButton(data) {
    this._card.likes = data.likes;
    this._toggleLikeButtonState();
    this._showLikeCounterValue();
  }

  // определить, лайкнул ли уже текущий пользователь эту карточку
  isLikedByUser() {
    // console.log('this = ', this);
    if (this._card.likes.length === 0) {
      return false;
    } else {
      //по аналогии с _hasInvalidInput из FormValidator
      return this._card.likes.some((item) => {
        return item._id === this._userId;
      });
    }
  }

  _setEventListeners() {
    // раскрытие изображения
    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._card);
    });
    // кнопка удаления карточки
    this._deleteElement.addEventListener('click', () => {
      this._handleDeleteButtonClick(this._card._id, this._element);
    });
    // кнопка лайка
    this._likeElement.addEventListener('click', () => {
      this._handleLikeButtonClick(this._card);
    });
  }

  // наполнение шаблона карточки данными
  generateCard() {
    // добавить данные
    this._nameElement.innerText = this._card.name;
    this._imageElement.alt = this._card.name;
    this._imageElement.src = this._card.link;
    this._showLikeCounterValue();
    //this._likeCounterElement.innerText = this._card.likes.length;

    // если id owner-а карточки не совпадает с id из api.getUserProfile, 
    // то удалить корзину с карточки (наверное можно скрывать, а не удалять)
    if (this._card.owner._id !== this._userId) {
      this._deleteElement.remove();
    }

    // если текущий пользователь лайкал эту карточку (например, при загрузке initialCards), 
    // то ее сразу нужно отобразить с закрашенной иконкой
    if (this.isLikedByUser()) {
      this._markLikeButton();
    }

    // навесить листнеры
    this._setEventListeners();
    // вернуть заполненный элемент наружу
    return this._element;
  }
}