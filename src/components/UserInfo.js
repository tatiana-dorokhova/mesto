export default class UserInfo {
  // в конструктор передаются селекторы полей, а не значения полей
  constructor({
    userName,
    userDetails
  }) {
    this._userName = document.querySelector(userName);
    this._userDetails = document.querySelector(userDetails);
  }
  // получение текущих значений профиля со страницы
  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userDetails.textContent
    }
  }
  // вставка значений в профиль на странице
  setUserInfo({
    name,
    info
  }) {
    this._userName.textContent = name;
    this._userDetails.textContent = info;
  }
}