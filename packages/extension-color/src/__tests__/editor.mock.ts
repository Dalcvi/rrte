export default class FakeEditor {
  commands;
  constructor() {
    this.commands = this;
  }

  chain() {
    return this;
  }

  setColor() {
    return this;
  }

  unsetColor() {
    return this;
  }

  run() {
    return this;
  }

  focus() {
    return this;
  }

  can() {
    return this;
  }

  isActive() {
    return false;
  }
}