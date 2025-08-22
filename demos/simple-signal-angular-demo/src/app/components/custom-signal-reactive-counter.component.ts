// @ts-nocheck
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal } from '@angular/core';

class Signal {
  #value = undefined;
  subscribers = [];

  constructor(initialValue) {
    this.#value = initialValue;
  }

  set value(newValue) {
    this.#value = newValue;
    for (const subscriber of this.subscribers) {
      subscriber(this.#value);
    }
  }

  get value() {
    return this.#value;
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  toString() {
    return String(this.#value);
  }
}

@Component({
  selector: 'custom-signal-reactive-counter',
  template: ` <button (click)="increment()">I have count {{ counter.value }}</button>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSignalReactiveCounterComponent {
  counter = new Signal(0);

  constructor(private cdr: ChangeDetectorRef) {
    this.counter.subscribe(() => {
      this.cdr.detectChanges();
    });

    setInterval(() => {
      console.log('UpdateMeCustomSignalCounter!');
      this.increment();
    }, 2000);
  }

  increment() {
    this.counter.value++;
  }
}
