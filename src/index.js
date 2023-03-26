import {
  getFromLocalStorage, addProject, addNewTodoToProject,
} from './projectsManager';
import { displayProject } from './DOM';

if (!getFromLocalStorage()) {
  // Default presentation
  addProject('Default', 'Default project');
  addNewTodoToProject(0, 'herhej', Date.now(), 5, 'je suis un todo');
}

displayProject(0);
