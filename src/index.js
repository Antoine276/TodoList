import {
  getFromLocalStorage, addProject, addNewTodoToProject,
} from './projectsManager';
import { displayProject } from './DOM';

// Recuperation of stored projects via local storage
if (!getFromLocalStorage()) {
  // Default presentation
  addProject('Default', 'Default project');
  addNewTodoToProject(0, 'Default ToDo', Date.now(), 2, 'You may have something to do..');
}

// Display first project
displayProject(0);
