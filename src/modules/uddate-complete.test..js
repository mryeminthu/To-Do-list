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

  