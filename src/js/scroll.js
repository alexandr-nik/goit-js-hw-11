import { loadMore } from './responce';

export async function checkPosition() {
  await setScrollTimeout();
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
  window.addEventListener('scroll', checkPosition);
}
export function removeListenerScroll() {
  window.removeEventListener('scroll', checkPosition);
}

function setScrollTimeout() {
  setTimeout(() => {}, 200);
}
