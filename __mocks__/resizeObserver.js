import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;

global.console.trace = () => {};
