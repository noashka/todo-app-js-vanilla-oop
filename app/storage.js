import { TodoItem, TodoList } from "./todo.js";

const todoList = TodoList.getInstance();

export const LocalStorage = {
  load() {
    if (localStorage.getItem("todos")) {
      const data = JSON.parse(localStorage.getItem("todos"));

      for (let item of data) {
        todoList.add(new TodoItem(item.text));
      }
    }
  },

  save() {
    const array = Array.from(todoList.items);
    localStorage.setItem("todos", JSON.stringify(array));
  },
};

todoList.addObserver(LocalStorage.save);
