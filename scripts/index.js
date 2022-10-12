// все висящие листнеры можно посмотреть в консоли вот так:
// Array.from(document.querySelectorAll("*")).forEach(e => { const ev = getEventListeners(e); if (Object.keys(ev).length !== 0) {console.log(e, ev)} })

import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

// список карточек
const cardList = document.querySelector('.elements');

// селекторы профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

// селекторы карточки
const buttonAddCard = document.querySelector('.profile__add-button');

// селекторы попапов
const popups = document.querySelectorAll('.popup');

const profilePopup = document.querySelector('.popup.popup-edit');
const newCardPopup = document.querySelector('.popup.popup-add');
const imagePopup = document.querySelector('.popup.popup-image');

// селекторы открытого попапа с картинкой
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// форма редактирования профиля в DOM
const profileEditForm = document.querySelector('form[name=profile-edit-form]');
const profileNameInput = document.querySelector("input[name=popup-profile-name]");
const profileJobInput = document.querySelector("input[name=popup-profile-job]");
// форма добавления карточки
const newCardForm = document.querySelector('form[name=new-card-form]');
const newCardNameInput = document.querySelector("input[name=popup-new-card-name]");
const newCardLinkInput = document.querySelector("input[name=popup-new-card-link]");

// список селекторов для вызова валидации
const params = {
  formSelector: '.popup__form', // сама форма
  inputSelector: '.popup__input', // любое поле ввода на форме
  submitButtonSelector: '.popup__submit-button', // кнопка сабмита
  inactiveButtonClass: 'popup__submit-button_disabled', // неактивная кнопка сабмита
  inputErrorClass: 'popup__input_type_error', // класс типа ошибки для любого инпута на форме
  errorClass: 'popup__error_visible' // класс видимой ошибки
};

//--------------------------------------------Карточки-----------------------

// сгенерировать карточку с переданными параметрами
function renderCard(card) {
  // экземпляр карточки
  const newCard = new Card(card, '.card-template_type_default', openImagePopup);
  // создаем карточку и возвращаем наружу
  const renderedCard = newCard.generateCard();
  return renderedCard;
};
// добавить карточку в DOM
function addCardInList(card) {
  cardList.prepend(card);
};

// генерация карточек при загрузке страницы
initialCards.forEach((card) => {
  addCardInList(renderCard(card));
});

//--------------------------------------------Поп-апы-----------------------

// на все попапы навешиваем листнеры для нажатия на крестик и на область вне попапа (оверлей)
// используем mousedown, чтобы попап не закрывался, если изначально нажали на него,
// но потом перетащили нажатый курсор за его пределы
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
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

// открытие попапа редактирования профиля
function openEditProfilePopup() {
  openPopup(profilePopup);
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileText.textContent;
  editProfileFormValidate.toggleSubmitButtonOnOpeningPopup();
  editProfileFormValidate.hideInputErrorOnOpeningPopup();
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
  newCardFormValidate.toggleSubmitButtonOnOpeningPopup();
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
  renderCard(newCardData);
  closePopup(newCardPopup);
};

// открытие попапа с картинкой с получением данных для открытия
function openImagePopup(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.innerText = card.name;
  openPopup(imagePopup);
};

// добавление валидации на формы
const newCardFormValidate = new FormValidator(params, newCardForm);
newCardFormValidate.enableValidation();
const editProfileFormValidate = new FormValidator(params, profileEditForm);
editProfileFormValidate.enableValidation();