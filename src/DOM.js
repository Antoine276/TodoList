import './generatedDOM_style.css';
import { tobjProjectsArray, addNewTodoToProject } from './projectManager';

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

// Buttons
const menuButton = document.getElementById('menu_button');
const addTodoButton = document.getElementById('add_todo_button');

// Input fields
const titleInput = document.getElementById('title_input');
const dueDateInput = document.getElementById('dueDate_input');
const priorityInput = document.getElementById('priority_input');
const descriptionInput = document.getElementById('description_input');

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

menuButton.addEventListener('click', () => toggleDisplay(listContainer));

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

// Display all Todos of a Project
export function displayProject(index) {
  // Reset area
  reset(todoList);

  tobjProjectsArray[index].tobjTodosArray.forEach((obj) => {
    // Top-level Card
    const todoCard = document.createElement('div');
    todoCard.classList.add('todo_card');
    todoCard.style.borderColor = priorityColor(obj.nPriority);

    // Title
    const todoTitle = document.createElement('h2');
    todoTitle.textContent = obj.sTitle;

    // Due Date
    const todoDueDate = document.createElement('div');
    todoDueDate.classList.add('due_date');
    todoDueDate.textContent = obj.nDueDate;

    // Description
    const todoDescription = document.createElement('div');
    todoDescription.classList.add('description');
    todoDescription.textContent = obj.sDescription;
    todoDescription.setAttribute('display', 'hidden');

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

    // Building card and append to container
    todoCard.appendChild(todoTitle);
    todoCard.appendChild(todoDueDate);
    todoCard.appendChild(todoDescription);
    todoCard.appendChild(extendButton);

    todoList.appendChild(todoCard);
  });

  // Set current project displayed
  currentProjectIndex = index;
}

// Display index with list of Projects
export function displayProjectsList() {
  // Reset area
  reset(projectList);

  const container = document.createElement('ul');

  tobjProjectsArray.forEach((obj, objIndex) => {
    const list = document.createElement('li');
    list.textContent = obj.sTitle;
    list.addEventListener('click', () => displayProject(objIndex));
    container.appendChild(list);
  });

  projectList.appendChild(container);
}

// Add new Todo
function addNewTodo() {
  addNewTodoToProject(
    currentProjectIndex,
    titleInput.value,
    dueDateInput.value,
    priorityInput.value,
    descriptionInput.value,
  );

  displayProject(currentProjectIndex);
}

addTodoButton.addEventListener('click', () => addNewTodo());
