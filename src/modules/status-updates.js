import { lists, saveLists, provideLists } from './add-remove.js';

export const updateStatus = (index, completed) => {
  lists[index].completed = completed;
  saveLists();
  provideLists();
};

export const clearCompleted = () => {
  lists.filter((list) => !list.completed);
  saveLists();
  provideLists();
};
