export default class FakeEditor {
  commands;
  constructor() {
    this.commands = this;
  }

  chain() {
    return this;
  }

  setTableOfContents() {
    return this;
  }

  removeTableOfContents() {
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
