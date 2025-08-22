import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';
import { setupTaggedRenderedCounter } from './tagged-rendered-counter.js';
import { signal } from './utils.js';
import { setupTaggedRenderedSignalCounter } from './tagged-rendered-signal-counter.js';
import { setupTaggedDomRenderedCounter } from './tagged-dom-rendered-counter.js';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
      <div id="tagged-rendered-counter"></div>
      
      <div id="stateful-tagged-rendered-counter"></div>
      <div id="shared-stateful-tagged-rendered-counter"></div>
      
      <div id="signal-stateful-tagged-rendered-counter"></div>
      <div id="shared-signal-stateful-tagged-rendered-counter"></div>

      <div id="signal-stateful-tagged-signal-aware-rendered-counter"></div>
      <div id="shared-signal-stateful-tagged-signal-aware-rendered-counter"></div>

      <div id="signal-stateful-tagged-dom-signal-aware-rendered-counter"></div>
      <div id="shared-signal-stateful-tagged-dom-signal-aware-rendered-counter"></div>
    
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

// simple counter
setupCounter(document.querySelector('#counter'));

// simple tagged rendered counter
setupTaggedRenderedCounter(document.querySelector('#tagged-rendered-counter'));

// simple tagged rendered counter with broken shared state
window.counter = { value: 666 };
setupTaggedRenderedCounter(document.querySelector('#stateful-tagged-rendered-counter'), window.counter);
setupTaggedRenderedCounter(document.querySelector('#shared-stateful-tagged-rendered-counter'), window.counter);

// using a signal, subscribing to it and rendering explicitly
window.counterSignal = signal(300);
const signalStatefulTaggedRenderedCounter = document.querySelector('#signal-stateful-tagged-rendered-counter');
setupTaggedRenderedCounter(signalStatefulTaggedRenderedCounter, window.counterSignal);

const sharedSignalStatefulTaggedRenderedCounter = document.querySelector(
  '#shared-signal-stateful-tagged-rendered-counter',
);
setupTaggedRenderedCounter(sharedSignalStatefulTaggedRenderedCounter, window.counterSignal);

window.counterSignal.subscribe(() => {
  signalStatefulTaggedRenderedCounter.render();
  sharedSignalStatefulTaggedRenderedCounter.render();
});

// using a signal-aware tagged rendered counter
window.counterSignalToo = signal(500);
const signalStatefulTaggedSignalAwareRenderedCounter = document.querySelector(
  '#signal-stateful-tagged-signal-aware-rendered-counter',
);
setupTaggedRenderedSignalCounter(signalStatefulTaggedSignalAwareRenderedCounter, window.counterSignalToo);
const sharedSignalStatefulTaggedSignalAwareRenderedCounter = document.querySelector(
  '#shared-signal-stateful-tagged-signal-aware-rendered-counter',
);
setupTaggedRenderedSignalCounter(sharedSignalStatefulTaggedSignalAwareRenderedCounter, window.counterSignalToo);

// using a signal-aware tagged rendered counter with DOM
const signalStatefulTaggedDomSignalAwareRenderedCounter = document.querySelector(
  '#signal-stateful-tagged-dom-signal-aware-rendered-counter',
);
setupTaggedDomRenderedCounter(signalStatefulTaggedDomSignalAwareRenderedCounter, window.counterSignalToo);
const sharedSignalStatefulTaggedDomSignalAwareRenderedCounter = document.querySelector(
  '#shared-signal-stateful-tagged-dom-signal-aware-rendered-counter',
);
setupTaggedDomRenderedCounter(sharedSignalStatefulTaggedDomSignalAwareRenderedCounter, window.counterSignalToo);
