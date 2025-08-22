export function html(strings, ...expressions) {
  return strings.reduce((template, inbetweenPart, index) => {
    template += inbetweenPart + (expressions[index] ?? '');
    return template;
  }, '');
}

export function dom(strings, ...expressions) {
  const divTemplate = document.createElement('div');
  const update = () => {
    divTemplate.innerHTML = html(strings, ...expressions);
  };
  update();
  // for any signal, we update directly...
  for (const expression of expressions) {
    if (expression instanceof Signal) {
      expression.subscribe((value) => {
        update();
      });
    }
  }
  return divTemplate;
}

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

export function signal(initialValue) {
  return new Signal(initialValue);
}
