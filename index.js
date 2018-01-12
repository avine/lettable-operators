/* eslint-disable no-console */

const self = this;

// Simple class
class Value {
  constructor(value) {
    this.value = value;
  }

  // Some basic operations
  more(value) {
    this.value += value;
    return this;
  }
  less(value) {
    this.value -= value;
    return this;
  }

  // Add `pipe` method
  pipe(...fns) {
    fns.forEach(fn => fn.call(this));
    return this;
  }
}

// Test methods
console.log(new Value(5).more(2).less(1).value); // = 6

// Create "lettable-operators"
Object.getOwnPropertyNames(Value.prototype).forEach((method) => {
  if (method !== 'constructor' && method !== 'pipe') {
    self[method] = (...args) => function operator() {
      Value.prototype[method].apply(this, args);
    };
  }
});

// Test pipe
console.log(new Value(5).pipe(self.more(2), self.less(1)).value); // = 6
