import {
  addProject, addNewTodoToProject, modifyTodoFromProject,
} from './projectManager';
import { displayProjectsList, displayProject } from './DOM';

addProject('yoy', 'hellooooo');
addProject('qsfqg', 'hellooooo');
addProject('yoqsfqsfqsfy', 'hellooooo');
addProject('qsfqsfqsfqsfqsf', 'hellooooo');
displayProjectsList();

addNewTodoToProject(0, 'herhej', Date.now(), 5, 'je suis un todo');
displayProject(0);

modifyTodoFromProject(0, 0, 'sTitle', 'je suis un nouveau nom');
displayProject(0);
