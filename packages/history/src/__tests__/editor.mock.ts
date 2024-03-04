export default class FakeEditor {
  commands;
  constructor() {
    this.commands = this;
  }

  undo() {
    return this;
  }

  redo() {
    return this;
  }

  chain() {
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
