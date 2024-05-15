export default class FakeEditor {
  public commands: this;
  constructor() {
    this.commands = this;
  }

  chain() {
    return this;
  }

  getAttributes() {
    return {
      href: 'https://www.google.com',
    };
  }

  public state = {
    selection: {
      $from: {
        parent: {
          textContent: {
            length: 0,
          },
        },
      },
      $to: {
        pos: 0,
      },
    },
  };

  extendMarkRange() {
    return this;
  }

  updateAttributes() {
    return this;
  }

  toggleLink() {
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
