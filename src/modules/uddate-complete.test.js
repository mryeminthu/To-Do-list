import 'jest-localstorage-mock';
import {
  addTask,
  editTask,
  toggleCompleted,
  clearCompletedTasks,
  lists,
  provideLists,
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
  test('should add a new task to the list', () => {
    addTask('Task 1');
    expect(lists).toHaveLength(1);
    expect(lists[0].description).toBe('Task 1');
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
  test('should clear all completed tasks from the list and update the DOM', () => {
    addTask('Task 1');
    addTask('Task 2');
    toggleCompleted(0);
    toggleCompleted(1);
    clearCompletedTasks();
    const todoElements = placeholderMock.querySelectorAll('.todo');
    expect(todoElements).toHaveLength(0);
    
  });
});
