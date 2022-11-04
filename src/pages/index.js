// все висящие листнеры можно посмотреть в консоли вот так:
// Array.from(document.querySelectorAll("*")).forEach(e => { const ev = getEventListeners(e); if (Object.keys(ev).length !== 0) {console.log(e, ev)} })
// или через инструменты разработчика
import './index.css';
// импорт классов
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

// импорт констант
import {
  profileName,
  profileText,
  profileAvatar,
  profileAvatarButton,
  profilePopup,
  newCardPopup,
  imagePopup,
  editAvatarPopup,
  deleteCardPopup,
  cardListContainer,
  profileEditButton,
  addCardButton,
  formSettings,
  newCardForm,
  profileEditForm,
  editAvatarForm,
  apiConfig
} from '../utils/constants.js';


// экземпляр класса API для запросов к серверу
const api = new Api(apiConfig);

// id пользователя один и тот же, его можно положить в переменную
let userId;

//-------------------------------Информация профиля--------------------------
const userInfo = new UserInfo({
  userName: profileName,
  userDetails: profileText,
  userAvatar: profileAvatar
});

// получить данные с сервера и заполнить ими нужные поля
api.getUserProfile()
  .then((res) => {
    userId = res._id;
    userInfo.setUserInfo(res);
  })
  .catch((err) => console.log(err));

//--------------------------------------------Карточки-----------------------

// получить лист карточек с сервера и отрисовать их на странице 
// в каждой карточке приходят name, link, _id карточки
api.getInitialCards()
  .then((initialCards) => {
    // для каждого элемента листа сформировать и отрисовать карточку
    cardsList.renderItems(initialCards);
  })
  .catch(err => console.log(err));

const renderCard = (card) => {
  // экземпляр карточки
  const newCard = new Card(card, userId, '.card-template_type_default', () => {
    popupImage.open({
      name: card.name,
      link: card.link
    })
  });
  // создаем карточку и возвращаем наружу
  const renderedCard = newCard.generateCard();
  return renderedCard;
};

const cardsList = new Section({
    renderer: (item) => {
      const cardElement = renderCard(item);
      cardsList.addItem(cardElement);
    },
  },
  cardListContainer
);


//----------------------------------------Валидация форм-----------------------
const newCardFormValidate = new FormValidator(formSettings, newCardForm);
newCardFormValidate.enableValidation();

const editProfileFormValidate = new FormValidator(formSettings, profileEditForm);
editProfileFormValidate.enableValidation();

const editAvatarFormValidate = new FormValidator(formSettings, editAvatarForm);
editAvatarFormValidate.enableValidation();

//--------------------------------------------Поп-апы-----------------------
// попап редактирования профиля

const popupEditProfile = new PopupWithForm(profilePopup, (inputValues) => {
  // по кнопке сабмита должно происходить:
  // замена текста кнопки на Сохранение...
  // отправка запроса на сервер с name и about, которые указали в форме
  // замена аватарки на странице на ту, которую вернул запрос
  // изменение текста кнопки обратно на Сохранить
  popupEditProfile.changeButtonTextOnSaving(true, 'Сохранить', 'Сохранение...');

  const newUserInfo = {
    newUserName: inputValues['popup-profile-name'],
    newUserAbout: inputValues['popup-profile-job']
  };
  api.editUserProfile(newUserInfo)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.changeButtonTextOnSaving(false, 'Сохранить', 'Сохранение...');
    });
});
popupEditProfile.setEventListeners();
// обработчик нажатия кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
  // вставить в поля формы значения со страницы
  const currentProfileValues = userInfo.getUserInfo();
  const profileValuesToSetInForm = {
    'popup-profile-name': currentProfileValues['name'],
    'popup-profile-job': currentProfileValues['about']
  };
  popupEditProfile.setInputValues(profileValuesToSetInForm);
  // активировать кнопку сабмита, т.к. поля заполнены
  editProfileFormValidate.toggleSubmitButtonOnOpeningPopup();
  // открыть попап
  popupEditProfile.open();
});

// попап добавления карточки
const popupNewCard = new PopupWithForm(newCardPopup, (inputValues) => {
  // по кнопке сабмита должно происходить:
  // замена текста кнопки на Сохранение...
  // отправка запроса на сервер с name и link, которые указали в форме
  // из ответа с сервера генерим карточку и добавляем ее в контейнер карточек
  // изменение текста кнопки обратно на Сохранить

  popupNewCard.changeButtonTextOnSaving(true, 'Создать', 'Сохранение...');

  const newCardData = {
    newCardName: inputValues['popup-new-card-name'],
    newCardLink: inputValues['popup-new-card-link']
  };

  api.addNewCard(newCardData)
    .then((data) => {
      const element = renderCard(data);
      cardsList.addItem(element);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupNewCard.changeButtonTextOnSaving(false, 'Создать', 'Сохранение...');
    });
});

popupNewCard.setEventListeners();
// обработчик нажатия кнопки добавления карточки
addCardButton.addEventListener('click', () => {
  // деактивировать кнопку сабмита, если инпуты пустые
  newCardFormValidate.toggleSubmitButtonOnOpeningPopup();
  popupNewCard.open();
});

// попап клика на картинку (обработчик клика уже есть в классе Card)
const popupImage = new PopupWithImage(imagePopup);
popupImage.setEventListeners();


//попап редактирования аватарки
const popupEditAvatar = new PopupWithForm(editAvatarPopup, (inputValues) => {
  // по кнопке сабмита должно происходить:
  // замена текста кнопки на Сохранение...
  // отправка запроса на сервер с линком, который указали в форме
  // замена аватарки на странице на ту, которую вернул запрос
  // изменение текста кнопки обратно на Сохранить

  popupEditAvatar.changeButtonTextOnSaving(true, 'Сохранить', 'Сохранение...');
  const newAvatarLink = inputValues['popup-new-avatar-link'];
  api.updateUserAvatar(newAvatarLink)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.changeButtonTextOnSaving(false, 'Сохранить', 'Сохранение...');
    });
});

popupEditAvatar.setEventListeners();

profileAvatarButton.addEventListener('click', () => {
  // деактивировать кнопку сабмита, если инпуты пустые
  editAvatarFormValidate.toggleSubmitButtonOnOpeningPopup();
  popupEditAvatar.open();
});