import { TodoItem, TodoList } from "./todo.js";

export class Command {
  name;
  args;

  constructor(name, args) {
    this.name = name;
    this.args = args;
  }
}

export const Commands = {
  ADD: "add",
  DELETE: "delete",
};

export const CommandExecutor = {
  execute(command) {
    const todoList = TodoList.getInstance();
    switch (command.name) {
      case Commands.ADD:
        const todoInput = globalThis.DOM.todoInput;
        const value = todoInput.value.trim();
        const itemToAdd = todoList.find(value);
        if (value !== "" && itemToAdd === undefined) {
          todoInput.value = "";
          todoList.add(new TodoItem(value));
        }
        break;
      case Commands.DELETE:
        const [valueToDelete] = command.args;
        todoList.delete(valueToDelete);
        break;
    }
  },
};
