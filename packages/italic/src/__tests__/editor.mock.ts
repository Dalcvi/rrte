export default class FakeEditor {
  commands: this;

  constructor() {
    this.commands = this;
  }

  chain() {
    return this;
  }

  toggleItalic() {
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
