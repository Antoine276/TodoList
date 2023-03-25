import {
  getAllFromLocalStorage, saveAllInLocalStorage, addProject, addNewTodoToProject,
} from './projectManager';
import { displayProject } from './DOM';

getAllFromLocalStorage();
// Default presentation
addProject('Default', 'Default project');
addProject('qsfqg', 'hellooooo');
addProject('yoqsfqsfqsfy', 'hellooooo');
addProject('qsfqsfqsfqsfqsf', 'hellooooo');
displayProject(0);

addNewTodoToProject(0, 'herhej', Date.now(), 5, 'je suis un todo');
saveAllInLocalStorage();

// Display default

// modifyTodoFromProject(0, 0, 'sTitle', 'je suis un nouveau nom');
