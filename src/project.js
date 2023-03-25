import { createTodo } from './todo';

class Project {
  sTitle;

  tobjTodosArray = [];

  constructor(title) {
    this.sTitle = title;
  }

  modifyParameter(key, value) {
    this[key] = value;
  }

  addTodo(todo) {
    this.tobjTodosArray.push(todo);
  }

  addNewTodo(title, dueDate, priority, description) {
    this.addTodo(createTodo(title, dueDate, priority, description));
  }

  removeTodo(index) {
    return [this.tobjTodosArray.splice(index, 1)];
  }

  modifyTodo(index, key, value) {
    this.tobjTodosArray[index].modifyParameter(key, value);
  }
}

export function createProject(title) {
  return new Project(title);
}
