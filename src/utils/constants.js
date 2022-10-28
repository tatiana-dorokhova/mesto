// карточки по умолчанию при загрузке страницы
export const initialCards = [{
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
export const cardList = '.elements';

// селекторы профиля
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileName = '.profile__name';
export const profileText = '.profile__text';

// селекторы карточки
export const addCardButton = document.querySelector('.profile__add-button');

// селекторы попапов
export const popups = document.querySelectorAll('.popup');

export const profilePopup = '.popup.popup-edit';
export const newCardPopup = '.popup.popup-add';
export const imagePopup = '.popup.popup-image';

// селекторы картинки и подписи открытого попапа с картинкой
export const popupImage = '.popup__image';
export const popupCaption = '.popup__caption';

// форма редактирования профиля в DOM
export const profileEditForm = document.querySelector('form[name=profile-edit-form]');
export const profileNameInput = document.querySelector("input[name=popup-profile-name]");
export const profileJobInput = document.querySelector("input[name=popup-profile-job]");
// форма добавления карточки
export const newCardForm = document.querySelector('form[name=new-card-form]');
export const newCardNameInput = document.querySelector("input[name=popup-new-card-name]");
export const newCardLinkInput = document.querySelector("input[name=popup-new-card-link]");

// список селекторов для вызова валидации
export const params = {
  formSelector: '.popup__form', // сама форма
  inputSelector: '.popup__input', // любое поле ввода на форме
  submitButtonSelector: '.popup__submit-button', // кнопка сабмита
  inactiveButtonClass: 'popup__submit-button_disabled', // неактивная кнопка сабмита
  inputErrorClass: 'popup__input_type_error', // класс типа ошибки для любого инпута на форме
  errorClass: 'popup__error_visible' // класс видимой ошибки
};