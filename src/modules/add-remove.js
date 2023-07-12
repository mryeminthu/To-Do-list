export const lists = JSON.parse(localStorage.getItem('lists')) || [];

export const saveLists = () => {
  localStorage.setItem('lists', JSON.stringify(lists));
};

export const updateIndexes = () => {
  lists.forEach((list, index) => {
    list.index = index + 1;
  });
};

export const provideLists = () => {
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
          <input type="checkbox" class="list ${checkedClass}" data-index="${list.index}" ${list.completed ? 'checked' : ''}/>
          <span class="list-description" data-index="${list.index}" style="text-decoration: ${textDecoration}">${list.description}</span>
        </div>
        <i class="fa-solid fa-ellipsis-vertical" data-index="${list.index}"></i>
      `;
    placeholder.appendChild(listItem);
  });
};

export const addTask = (description) => {
  const newTask = {
    description,
    completed: false,
    index: lists.length + 1,
  };
  lists.push(newTask);
  provideLists();
  saveLists();
};

export const deleteTask = (index) => {
  lists.splice(index, 1);
  updateIndexes();
  provideLists();
  saveLists();
};

export const editTask = (index, newDescription) => {
  lists[index].description = newDescription;
  provideLists();
  saveLists();
};

export const toggleCompleted = (index) => {
  lists[index].completed = !lists[index].completed;
  provideLists();
  saveLists();
};

export const clearCompletedTasks = () => {
  const completedTasks = lists.filter((list) => list.completed);
  completedTasks.forEach((task) => {
    const index = lists.indexOf(task);
    deleteTask(index);
  });
};
