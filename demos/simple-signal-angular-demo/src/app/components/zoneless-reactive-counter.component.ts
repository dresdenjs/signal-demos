// @ts-nocheck
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

function reactiveValue(cdr, initialValue) {
  return new (class {
    #value = initialValue;

    set value(newValue) {
      this.#value = newValue;
      cdr.detectChanges();
    }

    get value() {
      return this.#value;
    }

    toString() {
      return String(this.#value);
    }
  })();
}

@Component({
  selector: 'zoneless-reactive-counter',
  template: `<button (click)="increment()">I have count {{ counter.value }}</button>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZonelessReactiveCounterComponent {
  counter: { value: number };

  constructor(private cdr: ChangeDetectorRef) {
    this.counter = reactiveValue(cdr, 0);

    setInterval(() => {
      console.log('UpdateMeZonelessReactiveCounter!');
      this.increment();
    }, 2000);
  }

  increment() {
    this.counter.value++;
  }
}
