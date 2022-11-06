export default class Section {
  // containerSelector - контейнер, в который добавляются отрисованные items
  constructor({
    renderer
  }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // публичный метод, который рендерит весь начальный массив карточек
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    })
  }

  // публичный метод, который добавляет один отрендеренный элемент в контейнер
  addItem(element) {
    this._container.prepend(element);
  }

  addInitialItem(element) {
    this._container.append(element);
  }
}