import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'default-reactive-counter',
  template: `<button (click)="increment()">I have count {{ counter }}</button>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultReactiveCounterComponent {
  counter = 0;

  constructor() {
    setInterval(() => {
      console.log('UpdateDefaultReactiveCounter!');
      this.counter++;
    }, 1000);
  }

  increment() {
    this.counter++;
  }
}
