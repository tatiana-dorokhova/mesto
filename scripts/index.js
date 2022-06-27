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
// содержимое шаблона карточки
const cardTemplate = document.querySelector('#card').content;
// список карточек
const cardList = document.querySelector('.elements');

// кнопка редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
// кнопка добавления новой карточки
const addCardButton = document.querySelector('.profile__add-button');
// поле названия профиля (profile__name)
const profileName = document.querySelector('.profile__name');
// поле информации профиля (profile__text)
const profileText = document.querySelector('.profile__text');
// кнопка лайка в карточке
const likeButton = document.querySelector('.element__like');

// кнопка закрытия любого попапа
const popupCloseButtons = document.querySelectorAll('.popup__close-button');


// попап редактирования профиля
const editProfilePopup = document.querySelector('.popup.popup-edit');
// попап добавления карточки
const newCardPopup = document.querySelector('.popup.popup-add');
// попап редактирования профиля
const imagePopup = document.querySelector('.popup.popup-image');

// форма редактирования профиля в DOM
let editProfileForm = document.querySelector('form[name=profile-edit-form]');
// форма добавления карточки
let newCardForm = document.querySelector('form[name=new-card-form]');
// поля формы редактирования профиля в DOM
let profileNameInput = document.querySelector("input[name=popup-profile-name]");
let profileJobInput = document.querySelector("input[name=popup-profile-job]");
// поля формы добавления карточки в DOM
let newCardNameInput = document.querySelector("input[name=popup-new-card-name]");
let newCardLinkInput = document.querySelector("input[name=popup-new-card-link]");



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
  newCard.querySelector('.element__name').innerText = card.name;
  newCard.querySelector('.element__image').src = card.link;
  // обработчик клика на картинку, по которому появляется поп-ап с картинкой на весь экран
  newCard.querySelector('.element__image').addEventListener('click', function (event) {
    // если клик именно на картинке, то показать поп-ап с картинкой
    if (event.target === event.currentTarget) {
      console.log(card);
      openImagePopup(card);
    }
  });
  // обработчик кнопки удаления карточки
  newCard.querySelector('.element__delete').addEventListener('click', function (event) {
    // если клик именно на кнопке удаления, то удалить эту карточку
    if (event.target === event.currentTarget) {
      deleteCard(event);
    }
  });
  // обработчик лайка в карточке
  newCard.querySelector('.element__like').addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
      likeCard(event);
    }
  });

  console.log(newCard);
  return newCard;
};

// добавить карточку в DOM
function addCardInList(card) {
  const renderedCard = renderCard(card);
  cardList.prepend(renderedCard);
};

// генерация карточек при загрузке страницы
initialCards.forEach((item) => addCardInList(item));


//////////////////////////////////////////////////////////////////////////////

// обработчики нажатия любого из крестиков закрытия попапа
popupCloseButtons.forEach((item) => {
  item.addEventListener('click', closePopup);
});

// обработчик события нажатия кнопки редактирования профиля
profileEditButton.addEventListener('click', openEditProfilePopup);

// обработчик события нажатия кнопки добавления карточки
addCardButton.addEventListener('click', openNewCardPopup);

// обработчик события нажатия картинки в карточке навешивается при создании карточки

//////////////////////////////////////////////////////////////////////////////

// закрытие любого попапа
function closePopup(event) {
  const closestPopup = event.target.closest('.popup');
  closestPopup.classList.remove('popup_opened');
};

// обработка клика вне области любого попапа
function handleClickOutOfPopup(popup) {
  popup.addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
      closePopup(event);
    }
  })
};

//////////////////////////////////////////////////////////////////////////////

// открытие попапа редактирования профиля
function openEditProfilePopup() {
  editProfilePopup.classList.add('popup_opened');
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileText.textContent;
  // обработчик события клика по кнопке Сохранить для формы редактирования попапа
  editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
  // обработчик события клика вне области попапа
  handleClickOutOfPopup(editProfilePopup);
};

// функция сохранения введенных данных и закрытия попапа редактирования профиля
function editProfileFormSubmitHandler(event) {
  //убрать отправку данных и перезагрузку страницы
  event.preventDefault();
  // вставить новые значения в DOM
  profileName.textContent = profileNameInput.value;
  profileText.textContent = profileJobInput.value;
  closePopup(event);
};

//////////////////////////////////////////////////////////////////////////////

// открытие попапа добавления карточки
function openNewCardPopup() {
  newCardPopup.classList.add('popup_opened');
  newCardForm.reset();
  // обработчик события клика по кнопке Создать для формы добавления карточки
  newCardForm.addEventListener('submit', editNewCardFormSubmitHandler);
  // обработчик клика вне области попапа
  handleClickOutOfPopup(newCardPopup);
};

// функция сохранения введенных данных и закрытия попапа добавления карточки
function editNewCardFormSubmitHandler(event) {
  //убрать отправку данных и перезагрузку страницы
  event.preventDefault();
  // вставить новые значения в DOM
  const newCardData = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value
  }

  addCardInList(newCardData);
  closePopup(event);
};

//////////////////////////////////////////////////////////////////////////////

// открытие попапа с картинкой
function openImagePopup(card) {
  imagePopup.classList.add('popup_opened');
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.innerText = card.name;
  handleClickOutOfPopup(imagePopup);
};
