// все висящие листнеры можно посмотреть в консоли вот так:
// Array.from(document.querySelectorAll("*")).forEach(e => { const ev = getEventListeners(e); if (Object.keys(ev).length !== 0) {console.log(e, ev)} })

// карточки по умолчанию при загрузке страницы
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// шаблон карточки
const cardTemplate = document.querySelector('#card').content;

// список карточек
const cardList = document.querySelector('.elements');

// селекторы профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

// кнопки закрытия попапов
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

// селекторы карточки
const buttonAddCard = document.querySelector('.profile__add-button');

// селекторы попапов
const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup.popup-edit');
const newCardPopup = document.querySelector('.popup.popup-add');
const imagePopup = document.querySelector('.popup.popup-image');

// форма редактирования профиля в DOM
const profileEditForm = document.querySelector('form[name=profile-edit-form]');
const profileNameInput = document.querySelector("input[name=popup-profile-name]");
const profileJobInput = document.querySelector("input[name=popup-profile-job]");
// форма добавления карточки
const newCardForm = document.querySelector('form[name=new-card-form]');
const newCardNameInput = document.querySelector("input[name=popup-new-card-name]");
const newCardLinkInput = document.querySelector("input[name=popup-new-card-link]");

// селекторы попапа с картинкой
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

//--------------------------------------------Карточки-----------------------

function deleteCard(event) {
  // удаляем ближайший от кнопки удаления элемент с классом element
  // обработчик события клика по картинке удаляется вместе с элементом автоматически
  const cardListItem = event.currentTarget.closest('.element');
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

// добавить карточку в DOM
function addCardInList(card) {
  const renderedCard = renderCard(card);
  cardList.prepend(renderedCard);
};

// генерация карточек при загрузке страницы
initialCards.forEach(addCardInList);


//--------------------------------------------Поп-апы-----------------------


// на все попапы навешиваем листнеры для нажатия на крестик и на область вне попапа (оверлей)
// используем mousedown, чтобы попап не закрывался, если изначально нажали на него,
// но потом перетащили нажатый курсор за его пределы
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
});


// обработчики нажатия кнопок
profileEditButton.addEventListener('click', openEditProfilePopup);
buttonAddCard.addEventListener('click', openNewCardPopup);

// обработчики кнопок сохранения для попапов
profileEditForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);

// закрытие попапа по Esc (листнер навешивать на документ)
function closePopupOnEscape(event) {
  const key = event.key;
  if (key === 'Escape') {
    const popupToClose = document.querySelector('.popup_opened');
    closePopup(popupToClose);
  };
};

// открытие любого попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEscape);
};

// закрытие любого попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEscape);
};

// // закрытие ближайшего открытого попапа
// function hideClosestPopup(event) {
//   const closestPopup = event.target.closest('.popup');
//   closePopup(closestPopup)
// };

// открытие попапа редактирования профиля
function openEditProfilePopup() {
  openPopup(profilePopup);
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileText.textContent;
};

// функция сохранения введенных данных и закрытия попапа редактирования профиля
function handleProfileFormSubmit(event) {
  //убрать отправку данных и перезагрузку страницы
  event.preventDefault();
  // вставить новые значения в DOM
  profileName.textContent = profileNameInput.value;
  profileText.textContent = profileJobInput.value;
  closePopup(profilePopup);
};

// открытие попапа добавления карточки и навешивание листнера
function openNewCardPopup() {
  openPopup(newCardPopup);
};

// функция сохранения введенных данных и закрытия попапа добавления карточки
function handleNewCardFormSubmit(event) {
  event.preventDefault();
  // вставить новые значения в DOM
  const newCardData = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value
  }
  event.target.reset();
  addCardInList(newCardData);
  closePopup(newCardPopup);
};

// открытие попапа с картинкой с получением данных для открытия
function openImagePopup(card) {
  openPopup(imagePopup);
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.innerText = card.name;
};
