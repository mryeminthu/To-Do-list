import './style.css';

{
  const lists = JSON.parse(localStorage.getItem('lists')) || [];

  const saveLists = () => {
    localStorage.setItem('lists', JSON.stringify(lists));
  };

  const updateIndexes = () => {
    lists.forEach((list, index) => {
      list.index = index + 1;
    });
  };

  const provideLists = () => {
    const placeholder = document.querySelector('.todo-placeholder');
    placeholder.innerHTML = '';
    const sortedLists = lists.sort((a, b) => a.index - b.index);
    sortedLists.forEach((list) => {
      const listItem = document.createElement('div');
      listItem.className = 'todo';
      const checkedClass = list.completed ? 'checked' : '';
      const textDecoration = list.completed ? 'line-through' : 'none';
      listItem.innerHTML = `
          <div>
            <input type="checkbox" class="list" ${list.completed ? 'checked' : ''} data-index="${list.index}" />
            <span class="list-description ${checkedClass}" data-index="${list.index}" style="text-decoration: ${textDecoration}">${list.description}</span>
          </div>
          <i class="fa-solid fa-ellipsis-vertical" data-index="${list.index}"></i>
        `;
      placeholder.appendChild(listItem);
    });
  };

  const addTask = (description) => {
    const newTask = {
      description,
      completed: false,
      index: lists.length + 1,
    };
    lists.push(newTask);
    provideLists();
    saveLists();
  };

  const deleteTask = (index) => {
    lists.splice(index, 1);
    updateIndexes();
    provideLists();
    saveLists();
  };

  const editTask = (index, newDescription) => {
    lists[index].description = newDescription;
    provideLists();
    saveLists();
  };

  const toggleCompleted = (index) => {
    lists[index].completed = !lists[index].completed;
    provideLists();
    saveLists();
  };

  const clearCompletedTasks = () => {
    const completedTasks = lists.filter((list) => list.completed);
    completedTasks.forEach((task) => {
      const index = lists.indexOf(task);
      deleteTask(index);
    });
  };

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
}
