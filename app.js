import { Command, CommandExecutor, Commands } from "./app/command.js";

globalThis.DOM = {};
const DOM = globalThis.DOM;

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
