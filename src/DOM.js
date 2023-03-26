import './generatedDOM_style.css';
import { formatDistance } from 'date-fns';
import {
  tobjProjectsArray, addProject, deleteProject, addNewTodoToProject, deleteTodoFromProject,
  saveInLocalStorage,
} from './projectsManager';

// *************************
// **** State variables ****
// *************************
let currentProjectIndex = 0; // Index of current project displayed

// ******************
// **** Elements ****
// ******************
// DOM areas
const projectList = document.getElementById('project_list');
const todoList = document.getElementById('todo_list');
const listContainer = document.getElementById('list_container');
listContainer.setAttribute('display', 'hidden');

// Input fields
const titleInput = document.getElementById('title_input');
const dueDateInput = document.getElementById('dueDate_input');
const priorityInput = document.getElementById('priority_input');
const descriptionInput = document.getElementById('description_input');
const projectTitleInput = document.getElementById('project_title_input');
const projectDescriptionInput = document.getElementById('project_description_input');

// Buttons
const menuButton = document.getElementById('menu_button');
const deleteProjectButton = document.getElementById('delete_project_button');
const addTodoButton = document.getElementById('add_todo_button');
const addProjectButton = document.getElementById('add_project_button');

// Buttons event listeners
menuButton.addEventListener('click', () => toggleDisplay(listContainer));
deleteProjectButton.addEventListener('click', () => deleteDOMProject());
addTodoButton.addEventListener('click', () => addNewDOMTodo());
addProjectButton.addEventListener('click', () => addNewDOMProject());

// *******************
// **** Functions ****
// *******************
// Toggle menu
function toggleDisplay(element) {
  if (element.getAttribute('display') === 'hidden') {
    element.setAttribute('display', 'displayed');
  } else {
    element.setAttribute('display', 'hidden');
  }
}

// Reset DOM area
function reset(element) {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
}

// Utility function for priority color
function priorityColor(priority) {
  const nPriority = Number(priority);
  if (nPriority <= 1) {
    return '#10b981';
  }
  if (nPriority === 2) {
    return '#f97316';
  }

  return '#dc2626';
}

// Build a Todo Card
function buildTodoCard(Todo, index, dtCurrDate) {
  // Top-level Card
  const todoCard = document.createElement('div');
  todoCard.classList.add('todo_card');
  todoCard.style.borderColor = priorityColor(Todo.nPriority);

  // Title
  const todoTitle = document.createElement('h2');
  todoTitle.textContent = Todo.sTitle;

  // Due Date
  const strDueDateDistance = formatDistance(Todo.dtDueDate, dtCurrDate, { addSuffix: true });
  const todoDueDate = document.createElement('div');
  todoDueDate.classList.add('due_date');
  todoDueDate.textContent = strDueDateDistance;

  // Description
  const todoDescription = document.createElement('div');
  todoDescription.classList.add('description');
  todoDescription.textContent = Todo.sDescription;
  todoDescription.setAttribute('display', 'hidden');

  // Buttons container
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('todo_buttons_container');

  // Delete button
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete_button');
  deleteButton.textContent = '🗑';
  deleteButton.addEventListener('click', () => deleteDOMTodo(currentProjectIndex, index));

  buttonsContainer.appendChild(deleteButton);

  // If description exists
  if (todoDescription.textContent !== '') {
    // Extend button
    const extendButton = document.createElement('button');
    extendButton.classList.add('extend_button');
    extendButton.textContent = '﹀';
    extendButton.addEventListener('click', () => {
      toggleDisplay(todoDescription);

      if (extendButton.textContent === '﹀') {
        extendButton.textContent = '︿';
      } else {
        extendButton.textContent = '﹀';
      }
    });

    buttonsContainer.appendChild(extendButton);
  }

  // Building card and append to container
  todoCard.appendChild(todoTitle);
  todoCard.appendChild(todoDueDate);
  todoCard.appendChild(todoDescription);
  todoCard.appendChild(buttonsContainer);

  todoList.appendChild(todoCard);
}

// Display all Todos of a Project
export function displayProject(index) {
  // Reset area
  reset(todoList);

  // Get current date
  const dtCurrDate = Date.now();

  tobjProjectsArray[index].tobjTodosArray.forEach((obj, objIndex) => {
    buildTodoCard(obj, objIndex, dtCurrDate);
  });

  // Set current project displayed
  currentProjectIndex = index;

  displayProjectsList();
}

// Display index with list of Projects
export function displayProjectsList() {
  // Reset area
  reset(projectList);

  const container = document.createElement('ul');

  tobjProjectsArray.forEach((obj, objIndex) => {
    const list = document.createElement('li');
    list.textContent = obj.sTitle;
    if (objIndex === currentProjectIndex) {
      list.style.fontWeight = '800';
    }
    if (obj.sDescription !== '') {
      list.setAttribute('title', obj.sDescription);
    }
    list.addEventListener('click', () => displayProject(objIndex));
    container.appendChild(list);
  });

  projectList.appendChild(container);
}

// Add new Todo
function addNewDOMTodo() {
  addNewTodoToProject(
    currentProjectIndex,
    titleInput.value,
    dueDateInput.value,
    priorityInput.value,
    descriptionInput.value,
  );

  // Save state in local storage
  saveInLocalStorage();

  // Refresh display
  displayProject(currentProjectIndex);
}

// Add new Project
function addNewDOMProject() {
  addProject(projectTitleInput.value, projectDescriptionInput.value);

  // Save state in local storage
  saveInLocalStorage();

  // Refresh display
  displayProjectsList();
}

// Delete Todo
function deleteDOMTodo(projectIndex, todoIndex) {
  deleteTodoFromProject(projectIndex, todoIndex);

  // Save state in local storage
  saveInLocalStorage();

  // Refresh display
  displayProject(currentProjectIndex);
}

// Delete Project
function deleteDOMProject() {
  // If successful
  if (deleteProject(currentProjectIndex)) {
    // Save state in local storage
    saveInLocalStorage();

    // Refresh display
    displayProject(0);
  }
}
