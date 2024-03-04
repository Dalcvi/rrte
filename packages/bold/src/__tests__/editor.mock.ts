export default class FakeEditor {
  commands;
  constructor() {
    this.commands = this;
  }

  chain() {
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toggleBold(isActive: boolean) {
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
