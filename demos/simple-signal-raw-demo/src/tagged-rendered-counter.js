import { html } from './utils.js';

export function setupTaggedRenderedCounter(element, counter = { value: 0 }) {
  element.render = () => {
    console.log('rendering setupTaggedRenderedCounter');
    element.innerHTML = html`<button>I have count ${counter.value}</button>`;
  };
  element.addEventListener('click', () => {
    counter.value++;
    element.render();
  });
  element.render();
}
