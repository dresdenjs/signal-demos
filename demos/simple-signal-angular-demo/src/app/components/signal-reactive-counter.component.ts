import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'signal-reactive-counter',
  template: `<button (click)="increment()">I have count {{ counter() }}</button>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SignalReactiveCounterComponent {
  counter = signal(0);

  constructor() {
    setInterval(() => {
      console.log('UpdateMeSignalCounter!');
      this.increment();
    }, 2000);
  }

  increment() {
    this.counter.update((value) => value + 1);
  }
}
