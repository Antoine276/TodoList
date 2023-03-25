class Todo {
  sTitle;

  dtDueDate;

  nPriority;

  sDescription;

  constructor(title, dueDate, priority, description) {
    this.sTitle = title;
    this.dtDueDate = dueDate;
    this.nPriority = priority;
    this.sDescription = description;
  }

  modifyParameter(key, value) {
    this[key] = value;
  }
}

export function createTodo(title, dueDate, priority, description) {
  return new Todo(title, dueDate, priority, description);
}
