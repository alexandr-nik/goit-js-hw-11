import { loadMore } from './responce';
import throttle from 'lodash.throttle';

export function checkPosition() {
  log();
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;
  const scrolled = window.scrollY;
  const threshold = height - screenHeight / 4;
  const position = scrolled + screenHeight;
  if (position >= threshold) {
    loadMore();
  }
}

export function addListenerScroll() {
  window.addEventListener('scroll', throttle(checkPosition, 200));
}
export function removeListenerScroll() {
  window.removeEventListener('scroll', throttle);
}

function throtleCheck() {
  throttle(checkPosition(), 200);
}

function log() {
  console.log('sdsad');
}
