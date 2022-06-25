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
// содержимое шаблона карточки
const cardTemplate = document.querySelector('#card').content;
// список карточек
const cardList = document.querySelector('.elements');

// кнопка редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
// кнопка добавления новой карточки
const addCardButton = document.querySelector('.profile__add-button');
// кнопка закрытия попапа
const popupCloseButton = document.querySelector('.popup__close-button');
// область попапа
const popup = document.querySelector('.popup');
// поле названия профиля (profile__name)
const profileName = document.querySelector('.profile__name');
// поле информации профиля (profile__text)
const profileText = document.querySelector('.profile__text');




// функция генерации одной карточки
function renderCard(cards) {
  // клонируем шаблон
  const newCard = cardTemplate.cloneNode(true);
  // меняем нужные параметры
  newCard.querySelector('.element__name').innerText = cards.name;
  newCard.querySelector('.element__image').src = cards.link;
  console.log(newCard);
  cardList.append(newCard);
};

// генерация карточек при загрузке страницы
initialCards.forEach(renderCard);


// форма редактирования профиля в DOM
let formElement = document.querySelector('.popup__form');
// поля формы в DOM
let nameInput = document.querySelector("input[name=popup-name]");
let jobInput = document.querySelector("input[name=popup-job]");

// обработчик события нажатия кнопки редактирования
profileEditButton.addEventListener('click', openPopup);

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
  //убрать отправку данных и перезагрузку страницы
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

// функция закрытия попапа по Enter с сохранением данных
function closePopupOnEnter(event) {
  if (event.key === 'Enter') {
    formSubmitHandler(event);
  };
}

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  document.addEventListener('keyup', closePopupOnEscape); // обработчик нажатия Escape
  document.addEventListener('keyup', closePopupOnEnter); // обработчик нажатия Enter
};

function closePopup() {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupOnEscape);
  document.removeEventListener('keyup', closePopupOnEnter);

};
