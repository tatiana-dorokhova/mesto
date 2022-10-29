export default class Section {
  // items - начальный массив данных, полученные на вход при создании экземпляра класса
  // containerSelector - контейнер, в который добавляются отрисованные items
  constructor({
    items,
    renderer
  }, containerSelector) {
    this._initialItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // публичный метод, который рендерит весь массив items
  renderItems() {
    this._initialItems.forEach(item => this._renderer(item));
  }

  // публичный метод, который добавляет один отрендеренный элемент в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}