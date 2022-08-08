export default class Card {
  constructor (card, templateSelector) {
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;

    this._element = this._getTemplate();
    this._nameElement = this._element.querySelector('.element__name');
    this._imageElement = this._element.querySelector('.element__image');
    this._deleteElement = this._element.querySelector('.element__delete');
  }

  // забрать только разметку карточки из index.html
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

  // наполнение шаблона карточки данными
  generateCard() {
    // Добавим данные
    this._nameElement.innerText = this._name;
    this._imageElement.alt = this._name;
    this._imageElement.src = this._link;

    // Вернём заполненный элемент наружу
    return this._element;
  }

  _handleImageClick(event) {
    // если клик именно на картинке, то показать поп-ап с картинкой
    if (event.target === event.currentTarget) {
      openPopup(imagePopup);
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupCaption.innerText = this._name;
    }
  }

  _handleDeleteButtonClick() {

  }


  _setEventListeners() {
    this._imageElement.addEventListener('click', () => {
      this._handleImageClick();
    });
    this._deleteElement.addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });
  }



}



function deleteCard(event) {
  // удаляем ближайший от кнопки удаления элемент с классом element
  // обработчик события клика по картинке удаляется вместе с элементом автоматически
  const cardListItem = event.target.closest('.element');
  cardListItem.remove();
}

function likeCard(event) {
  event.target.classList.toggle('element__like_marked');
}

// функция генерации одной карточки
// (в event.target хранится элемент, на котором сработало событие)
function renderCard(card) {
  // клонируем шаблон
  const newCard = cardTemplate.cloneNode(true);
  // меняем нужные параметры
  const newCardName = newCard.querySelector('.element__name');
  const newCardImage = newCard.querySelector('.element__image');
  newCardName.innerText = card.name;
  newCardImage.src = card.link;
  newCardImage.alt = card.name;
  // обработчик клика на картинку, по которому появляется поп-ап с картинкой на весь экран
  newCardImage.addEventListener('click', function (event) {
    // если клик именно на картинке, то показать поп-ап с картинкой
    if (event.target === event.currentTarget) {
      openImagePopup(card);
    }
  });
  // обработчик кнопки удаления карточки
  const newCardDelete = newCard.querySelector('.element__delete');
  newCardDelete.addEventListener('click', function (event) {
    // если клик именно на кнопке удаления, то удалить эту карточку
    if (event.target === event.currentTarget) {
      deleteCard(event);
    }
  });
  // обработчик лайка в карточке
  const newCardLike = newCard.querySelector('.element__like');
  newCardLike.addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
      likeCard(event);
    }
  });

  return newCard;
};
