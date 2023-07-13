import './style.css';
import {
  provideLists,
  addTask,
  deleteTask,
  editTask,
  toggleCompleted,
  clearCompletedTasks,
} from './modules/add-remove.js';

document.addEventListener('DOMContentLoaded', () => {
  provideLists();

  const addForm = document.querySelector('form');
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('.addList');
    const description = input.value;
    if (description.trim() !== '') {
      addTask(description);
      input.value = '';
    }
  });

  const todoItems = document.querySelector('.todo-placeholder');
  todoItems.addEventListener('click', (e) => {
    const { target } = e;
    if (target.classList.contains('fa-ellipsis-vertical')) {
      const index = target.getAttribute('data-index');
      const listItem = target.parentNode;
      const listDescription = listItem.querySelector('.list-description');
      listItem.removeChild(target);
      const deleteIcon = document.createElement('i');
      deleteIcon.className = 'fa-solid fa-trash-can delete';
      listItem.appendChild(deleteIcon);
      deleteIcon.addEventListener('click', () => {
        deleteTask(index - 1);
      });
      listDescription.contentEditable = true;
      listDescription.focus();
      listDescription.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          listDescription.contentEditable = false;
          const newText = listDescription.innerText.trim();
          editTask(index - 1, newText);
        }
      });
    } else if (target.classList.contains('list')) {
      const index = target.getAttribute('data-index');
      const listItem = target.parentNode;
      const listDescription = listItem.querySelector('.list-description');
      const textDecoration = target.checked ? 'line-through' : 'none';
      listDescription.style.textDecoration = textDecoration;
      listDescription.classList.toggle('checked');
      toggleCompleted(index - 1);
    }
  });

  const clearButton = document.querySelector('.clear');
  clearButton.addEventListener('click', () => {
    clearCompletedTasks();
  });
});
