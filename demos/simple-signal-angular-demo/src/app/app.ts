import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultReactiveCounterComponent } from './components/default-reactive-counter.component';
import { SignalReactiveCounterComponent } from './components/signal-reactive-counter.component';
import { CustomSignalReactiveCounterComponent } from './components/custom-signal-reactive-counter.component';
import { ZonelessReactiveCounterComponent } from './components/zoneless-reactive-counter.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    DefaultReactiveCounterComponent,
    SignalReactiveCounterComponent,
    CustomSignalReactiveCounterComponent,
    ZonelessReactiveCounterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('simple-signal-angular-demo');
}
