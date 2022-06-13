// кнопка редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
// кнопка закрытия попапа
const popupCloseButton = document.querySelector('.popup__close-button');
// область попапа
const popup = document.querySelector('.popup');
// поле названия профиля (profile__name)
const profileName = document.querySelector('.profile__name');
// поле информации профиля (profile__text)
const profileText = document.querySelector('.profile__text');

// форма редактирования профиля в DOM
let formElement = document.querySelector('.popup__form');
// поля формы в DOM
let nameInput = document.querySelector("input[name=popup-name]");
let jobInput = document.querySelector("input[name=popup-job]");

// обработчик события нажатия кнопки редактирования
editButton.addEventListener('click', openPopup);

// обработчик события нажатия кнопки закрытия попапа
popupCloseButton.addEventListener('click', closePopup);

// обработчик события клика вне области попапа
popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
});

// обработчик события клика по кнопке Сохранить
formElement.addEventListener('submit', formSubmitHandler);

// функция сохранения введенных данных и закрытия попапа
function formSubmitHandler(event) {
  event.preventDefault();
  // вставить новые значения в DOM
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopup();
};

// функция закрытия попапа по Escape
function closePopupOnEscape(event) {
  if (event.key === 'Escape') {
    closePopup();
  };
}

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  document.addEventListener('keyup', closePopupOnEscape); // обработчик нажатия Escape
};

function closePopup() {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupOnEscape);
};


