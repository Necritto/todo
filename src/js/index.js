/* eslint-disable indent */
'use strict';

const todo = document.querySelector('.todo');

createSectionList(todo);
generateTODO(todo);

function createSectionList(elem) {
  elem.insertAdjacentHTML('beforeend',
    `<main class="main hide">
      <input id="toggle-all" class="toggle-all" type="checkbox">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list"></ul>
    </main>
    <footer class="footer hide">
      <span class="todo-count"><strong>0</strong> items left</span>
      <ul class="filters">
        <li>
            <a class="all">All</a>
        </li>
        <li>
            <a class="active">Active</a>
        </li>
        <li>
            <a class="completed">Completed</a>
        </li>
      </ul>
      <button class="clear-completed hide-btn">Clear completed</button>
    </footer>`);
}

function generateTODO(elem) {
  const input = elem.querySelector('.header_input');
  const ul = elem.querySelector('.todo-list');
  const filter = elem.querySelector('.filters');
  const count = elem.querySelector('strong');
  const clear = elem.querySelector('.clear-completed');
  const hide = elem.querySelectorAll('.hide');

  ul.addEventListener('click', ({ target: element }) => {
    const elementLi = element.closest('li');
    const isRemove = element.classList.contains('destroy');
    const isComplete = element.classList.contains('toggle');

    if (!isRemove && !isComplete) {
      return;
    }

    if (isRemove) {
      ul.removeChild(elementLi);
      updateCount(count, ul);
      return;
    }

    if (!clear.classList.contains('hide-btn')) {
      clear.classList.add('hide-btn');
    }

    elementLi.classList.toggle('completed');
    clear.classList.remove('hide-btn');
  });

  input.addEventListener('change', ({ target }) => {

    if (!target.value) {
      return;
    }

    ul.insertAdjacentHTML('beforeend',
      `<li>
        <div class="view"><input class="toggle" type="checkbox"><label>${target.value}</label>
          <button class="destroy"></button>
        </div>
      </li>`);

    for (let item of hide) {
      item.classList.remove('hide');
    }

    target.value = '';
    updateCount(count, ul);

  });

  filter.addEventListener('click', ({ target }) => {
    const list = ul.querySelectorAll('li');

    for (let li of list) {
      switch (target.className) {
        case 'all': {
          li.removeAttribute('hidden');
          break;
        }
        case 'active': {
          if (li.classList.contains('completed')) {
            li.setAttribute('hidden', true);
            break;
          }
          li.removeAttribute('hidden');
          break;
        }
        case 'completed': {
          if (li.classList.contains('completed')) {
            li.removeAttribute('hidden');
            break;
          }
          li.setAttribute('hidden', true);
          break;
        }
      }
    }
    updateCount(count, ul);
  });

  // if (!ul.firstChild) {
  //   elem.lastChild.classList.add('hide');
  // }
}

function updateCount(elem, listContainer) {
  const list = [...listContainer.querySelectorAll('li')].filter((li) => !li.hasAttribute('hidden'));
  elem.innerHTML = list.length;
}