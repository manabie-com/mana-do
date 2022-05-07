import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import ToDoPage from '../../ToDoPage';
import pretty from 'pretty';

let container: HTMLDivElement | null = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container as HTMLDivElement);
  container?.remove();
  container = null;
});

it('Should render ToDoPage correctly', async () => {
  await act(async () => {
    render(<ToDoPage />, container);
  });

  expect(pretty(container!?.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"ToDo__container\\">
      <div class=\\"Todo__creation\\"><input class=\\"Todo__input\\" placeholder=\\"What need to be done?\\"></div>
      <div class=\\"ToDo__list\\">
        <div>
          <div class=\\"item-enter item-enter-active\\">
            <div class=\\"ToDo__item\\"><input aria-label=\\"todo-item-checkbox\\" type=\\"checkbox\\"><span>Content</span><button aria-label=\\"delete-todo-button\\" class=\\"Todo__delete\\"><svg width=\\"100%\\" height=\\"100%\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" xmlns=\\"http://www.w3.org/2000/svg\\">
                  <path d=\\"M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z\\" fill=\\"gray\\"></path>
                </svg></button></div>
          </div>
        </div>
      </div>
      <div class=\\"Todo__toolbar\\">
        <div class=\\"Toolbar__toggle_all\\"><input id=\\"toggle-all\\" aria-label=\\"toggle-all-todos\\" type=\\"checkbox\\"><label for=\\"toggle-all\\">Mark all as completed</label></div><button class=\\"Action__btn\\">Clear all todos</button>
      </div>
    </div>"
  `);
});
