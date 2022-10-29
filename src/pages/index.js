// все висящие листнеры можно посмотреть в консоли вот так:
// Array.from(document.querySelectorAll("*")).forEach(e => { const ev = getEventListeners(e); if (Object.keys(ev).length !== 0) {console.log(e, ev)} })
// или через инструменты разработчика
import './index.css';
// импорт классов
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// импорт констант
import {
  initialCards,
  profileName,
  profileText,
  profilePopup,
  newCardPopup,
  imagePopup,
  cardList,
  profileEditButton,
  addCardButton,
  formSettings,
  newCardForm,
  profileEditForm
} from '../utils/constants.js';


//-------------------------------Информация профиля--------------------------
const userInfo = new UserInfo({
  userName: profileName,
  userDetails: profileText
});

//--------------------------------------------Карточки-----------------------
// сгенерировать одну карточку с переданными параметрами
const renderCard = (card) => {
  // экземпляр карточки
  const newCard = new Card(card, '.card-template_type_default', () => {
    popupImage.open({
      name: card.name,
      link: card.link
    })
  });
  // создаем карточку и возвращаем наружу
  const renderedCard = newCard.generateCard();
  return renderedCard;
};

// сформировать лист карточек
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      const cardElement = renderCard(item);
      cardsList.addItem(cardElement);
    },
  },
  cardList
);

// для каждого элемента листа сформировать и отрисовать карточку
cardsList.renderItems();

//----------------------------------------Валидация форм-----------------------
const newCardFormValidate = new FormValidator(formSettings, newCardForm);
newCardFormValidate.enableValidation();

const editProfileFormValidate = new FormValidator(formSettings, profileEditForm);
editProfileFormValidate.enableValidation();

//--------------------------------------------Поп-апы-----------------------
// попап редактирования профиля
const popupEditProfile = new PopupWithForm(profilePopup, (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues['popup-profile-name'],
    info: inputValues['popup-profile-job']
  });
});
popupEditProfile.setEventListeners();
// обработчик нажатия кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
  // вставить в поля формы значения со страницы
  const currentProfileValues = userInfo.getUserInfo();
  const profileValuesToSetInForm = {
    'popup-profile-name': currentProfileValues['name'],
    'popup-profile-job': currentProfileValues['info']
  };
  popupEditProfile.setInputValues(profileValuesToSetInForm);
  // открыть попап
  popupEditProfile.open();
});

// попап добавления карточки
const popupNewCard = new PopupWithForm(newCardPopup, (inputValues) => {
  const element = renderCard({
    name: inputValues['popup-new-card-name'],
    link: inputValues['popup-new-card-link']
  });
  cardsList.addItem(element);
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