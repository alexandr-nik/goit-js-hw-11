import { loadMore } from './responce';
import throttle from 'lodash.throttle';

export  function checkPosition() {
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
  window.addEventListener('scroll', throtFun);
}
export function removeListenerScroll() {
  window.removeEventListener('scroll', throtFun);
}

let throtFun = throttle(checkPosition, 200)
