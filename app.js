import { Command, CommandExecutor, Commands } from "./app/command.js";
import { TodoList } from "./app/todo.js";

globalThis.DOM = {};
const DOM = globalThis.DOM;

function render() {
  DOM.todoList.innerHTML = "";
  const todoList = TodoList.getInstance();
  for (let item of todoList.items) {
    const listItem = document.createElement("li");
    listItem.classList.add("todo-item");
    listItem.innerHTML = `
      ${item.text} <button class="delete-btn">Delete</button>
    `;
    listItem.dataset.text = item.text;
    DOM.todoList.appendChild(listItem);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  DOM.todoList = document.getElementById("todo-list");
  DOM.addBtn = document.getElementById("add-btn");
  DOM.todoInput = document.getElementById("todo-input");

  DOM.addBtn.addEventListener("click", () => {
    const command = new Command(Commands.ADD);
    CommandExecutor.execute(command);
  });

  DOM.todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const todo = event.target.parentNode.dataset.text;
      const command = new Command(Commands.DELETE, [todo]);
      CommandExecutor.execute(command);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  TodoList.getInstance().addObserver(render);
});
