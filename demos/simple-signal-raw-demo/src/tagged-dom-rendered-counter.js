import { dom, html } from './utils.js';

export function setupTaggedDomRenderedCounter(element, counterSignal) {
  element.render = () => {
    console.log('rendering setupTaggedDomRenderedCounter');
    const render = () => dom`<button>I have count ${counterSignal}</button>`;
    if (element.firstChild) {
      element.firstChild.replaceWith(render());
    } else {
      element.appendChild(render());
    }
  };
  element.addEventListener('click', () => {
    counterSignal.value++;
  });
  element.render();
}
