import { observer } from "./observer.js";

export class TodoItem {
  constructor(text) {
    this.text = text;
  }

  equals(entity) {
    return this.text === entity.text;
  }
}

export class TodoList {
  #data = new Set();
  get items() {
    return this.#data;
  }

  static instance = null;

  static {
    this.instance = new TodoList();
  }

  static getInstance() {
    return this.instance;
  }

  constructor() {
    if (this.instance) {
      throw new Error("Use TodoList.getInstance instead.");
    }
  }

  add(value) {
    const array = Array.from(this.#data);
    const itemExists = array.filter((item) => item.equals(value)).length > 0;
    if (!itemExists) {
      this.#data.add(value);
      this.notify();
    }
  }

  delete(value) {
    const array = Array.from(this.#data);
    const currentItem = array.find((item) => item.text === value);
    this.#data.delete(currentItem);
    this.notify();
  }

  find(value) {
    const array = Array.from(this.#data);
    return array.find((item) => item.text === value);
  }

  replace(list) {
    this.#data = list;
    this.notify();
  }
}

Object.assign(TodoList.prototype, observer);
