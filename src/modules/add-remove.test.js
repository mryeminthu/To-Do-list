import 'jest-localstorage-mock';
import {
  addTask,
  deleteTask,
  lists,
  provideLists,
} from './add-remove';
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body><div class="todo-placeholder"></div></body></html>');
global.document = dom.window.document;
global.window = dom.window;
describe('addTask', () => {
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
});
describe('deleteTask', () => {
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
