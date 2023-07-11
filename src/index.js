import _ from 'lodash';
import './style.css';

const lists = [
    { description: 'Wash the dishes', completed: false, index: 1 },
    { description: 'Complete to-do list project', completed: false, index: 2 },
  ];
  
  const provideLists = () => {
    const placeholder = document.querySelector('.todo-placeholder');
    placeholder.innerHTML = '';
    const sortedLists = lists.sort((a, b) => a.index - b.index);
    sortedLists.forEach((list) => {
      const listItem = document.createElement('div');
      listItem.className = 'todo';
      listItem.innerHTML = `
        <div>
          <input type="checkbox" class="list" ${list.completed ? 'checked' : ''} />${list.description}
        </div>
        <i class="fa-solid fa-ellipsis-vertical"></i>
      `;
      placeholder.appendChild(listItem);
    });
  };
  window.addEventListener('DOMContentLoaded', provideLists);
  