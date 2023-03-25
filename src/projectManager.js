import { createProject } from './project';

export const tobjProjectsArray = [];

export function addProject(title) {
  tobjProjectsArray.push(createProject(title));
}

export function deleteProject(projectIndex) {
  if (tobjProjectsArray.length > 1) {
    if ((tobjProjectsArray[projectIndex].tobjTodosArray.length === 0)
     || (window.confirm('All Todos of this Project will also be deleted. Continue ?'))) {
      tobjProjectsArray.splice(projectIndex, 1);
      return true;
    }
  } else {
    alert("You can't have less than one active project");
  }

  return false;
}

export function addNewTodoToProject(projectIndex, title, dueDate, priority, description) {
  tobjProjectsArray[projectIndex].addNewTodo(title, dueDate, priority, description);
}

export function modifyTodoFromProject(projectIndex, todoIndex, key, value) {
  tobjProjectsArray[projectIndex].modifyTodo(todoIndex, key, value);
}

export function moveTodoByIndex(projectIndexFrom, projectIndexTo, indexTodo) {
  tobjProjectsArray[projectIndexTo]
    .addTodo(tobjProjectsArray[projectIndexFrom].removeTodo(indexTodo));
}

export function deleteTodoFromProject(projectIndex, todoIndex) {
  if (tobjProjectsArray.length > projectIndex) {
    tobjProjectsArray[projectIndex].removeTodo(todoIndex);
  }
}
