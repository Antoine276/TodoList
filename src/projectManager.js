import { createProject } from './project';

export const tobjProjectsArray = [];
const projectsArrayKey = 'projectsArray';

export function saveAllInLocalStorage() {
  localStorage.setItem(projectsArrayKey, JSON.stringify(tobjProjectsArray));
}

export function getAllFromLocalStorage() {
  // If nothing in local storage, return false
  if (localStorage.length === 0) {
    return false;
  }

  // Get and parse from local storage
  const localStorageArray = JSON.parse(localStorage.getItem(projectsArrayKey));

  resetProjectsArray();

  localStorageArray.forEach((project, index) => {
    addProject(project.sTitle, project.sDescription);

    project.tobjTodosArray.forEach((todo) => {
      addNewTodoToProject(
        index,
        todo.sTitle,
        Date.parse(todo.dtDueDate),
        parseInt(todo.nPriority, 10),
        todo.sDescription,
      );
    });
  });

  return true;
}

function resetProjectsArray() {
  tobjProjectsArray.length = 0;
}

export function addProject(title, description) {
  tobjProjectsArray.push(createProject(title, description));
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
