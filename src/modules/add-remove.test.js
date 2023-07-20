import 'jest-localstorage-mock';
import {
  addTask,
  editTask,
  toggleCompleted,
  deleteTask,
  clearCompletedTasks,
  lists,
  provideLists,
  updateIndexes,
} from './add-remove.js';

const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><html><body><div class="todo-placeholder"></div></body></html>');
global.document = dom.window.document;
global.window = dom.window;

describe('Task Functions', () => {
  let placeholderMock;

  beforeEach(() => {
    localStorage.clear();
    lists.length = 0;
    placeholderMock = document.querySelector('.todo-placeholder');
    placeholderMock.innerHTML = '';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should add a new task and update the DOM', () => {
    addTask('Task 1');
    const todoElement = placeholderMock.querySelector('.todo');
    expect(todoElement).toBeDefined();

    const descriptionElement = todoElement.querySelector('.list-description');
    expect(descriptionElement).toBeDefined();
    expect(descriptionElement.textContent).toBe('Task 1');

    const checkboxElement = todoElement.querySelector('.list');
    expect(checkboxElement).toBeDefined();
    expect(checkboxElement.dataset.index).toBe('1');
  });

  test('should update the DOM after editing a task', () => {
    addTask('Task 1');
    editTask(0, 'Edited Task'); 
    provideLists(); 

    const todoElement = placeholderMock.querySelector('.todo');
    expect(todoElement).toBeDefined();

    const descriptionElement = todoElement.querySelector('.list-description');
    expect(descriptionElement).toBeDefined();
    expect(descriptionElement.textContent).toBe('Edited Task');
  });

  test('should update an item\'s "completed" status and the DOM', () => {
    addTask('Task 1');
    toggleCompleted(0); 
    provideLists(); 

    const todoElement = placeholderMock.querySelector('.todo');
    expect(todoElement).toBeDefined();

    const checkboxElement = todoElement.querySelector('.list');
    expect(checkboxElement).toBeDefined();
    expect(checkboxElement.checked).toBe(true);
  });

  test('should delete a task from the list', () => {
    lists.push({ description: 'Task 1', completed: false, index: 1 });
    lists.push({ description: 'Task 2', completed: false, index: 2 });
    deleteTask(0);
    expect(lists).toHaveLength(1);
    expect(lists[0].description).toBe('Task 2');
  });

  test('should update indexes after deleting a task', () => {
    lists.push({ description: 'Task 1', completed: false, index: 1 });
    lists.push({ description: 'Task 2', completed: false, index: 2 });
    deleteTask(0);
    updateIndexes();
    expect(lists[0].index).toBe(1);
  });

  test('should clear all completed tasks from the list and update the DOM', () => {
    lists.push({ description: 'Task 1', completed: false, index: 1 });
    lists.push({ description: 'Task 2', completed: true, index: 2 });
    lists.push({ description: 'Task 3', completed: true, index: 3 });
    clearCompletedTasks(); 

    const todoElements = placeholderMock.querySelectorAll('.todo');
    expect(todoElements).toHaveLength(1);
    expect(todoElements[0].querySelector('.list-description').textContent).toBe('Task 1');
  });
});
