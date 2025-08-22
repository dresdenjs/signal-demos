import { html } from './utils.js';

export function setupTaggedRenderedSignalCounter(element, counterSignal) {
  element.render = () => {
    console.log('rendering setupTaggedRenderedSignalCounter');
    element.innerHTML = html`<button>I have count ${counterSignal.value}</button>`;
  };
  element.addEventListener('click', () => {
    counterSignal.value++;
  });
  element.render();

  // explicit subscription to the signal
  counterSignal.subscribe(() => {
    element.render();
  });
}
