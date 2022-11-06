export default class UserInfo {
  // в конструктор передаются селекторы полей, а не значения полей
  constructor({
    userName,
    userDetails,
    userAvatar
  }) {
    this._userName = document.querySelector(userName);
    this._userDetails = document.querySelector(userDetails);
    this._userAvatar = document.querySelector(userAvatar);
  }
  // получение текущих значений профиля со страницы
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userDetails.textContent
    }
  }
  // вставка значений в профиль на странице
  setUserInfo({
    name,
    about,
    avatar
  }) {
    // если значение не пришло (серверная ошибка), то останутся предыдущие значения
    if (name) {
      this._userName.textContent = name
    };
    if (about) {
      this._userDetails.textContent = about
    };
    if (avatar) {
      this._userAvatar.style.backgroundImage = `url(${avatar})`
    };
  }
}