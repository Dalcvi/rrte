export default class FakeEditor {
  commands;
  constructor() {
    this.commands = this;
  }

  chain() {
    return this;
  }

  setHeading({}: { level: number }) {
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
