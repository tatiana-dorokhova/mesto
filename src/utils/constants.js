// контейнер для вставки карточек
export const cardListContainer = '.elements';

// селекторы профиля
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileName = '.profile__name';
export const profileText = '.profile__text';
export const profileAvatar = '.profile__avatar';
export const profileAvatarButton = document.querySelector(profileAvatar);


// селекторы карточки
export const addCardButton = document.querySelector('.profile__add-button');

// селекторы попапов
export const popups = document.querySelectorAll('.popup');

export const profilePopup = '.popup.popup-edit';
export const newCardPopup = '.popup.popup-add';
export const imagePopup = '.popup.popup-image';
export const editAvatarPopup = '.popup.popup-edit-avatar';
export const deleteCardPopup = '.popup.popup-delete-card';

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

// форма изменения аватарки
export const editAvatarForm = document.querySelector('form[name=edit-avatar-form]');
export const editAvatarFormInput = document.querySelector("input[name=popup-new-avatar-link]");

// список селекторов для вызова валидации
export const formSettings = {
  formSelector: '.popup__form', // сама форма
  inputSelector: '.popup__input', // любое поле ввода на форме
  submitButtonSelector: '.popup__submit-button', // кнопка сабмита
  inactiveButtonClass: 'popup__submit-button_disabled', // неактивная кнопка сабмита
  inputErrorClass: 'popup__input_type_error', // класс типа ошибки для любого инпута на форме
  errorClass: 'popup__error_visible' // класс видимой ошибки
};

export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: '2dd148fa-cdec-4e91-b47f-aa7d67bc876a',
    'Content-Type': 'application/json'
  }
}