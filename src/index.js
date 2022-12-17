import { refs } from './js/refs';
import { goForImages } from './js/responce';
import { options } from './js/responce';
import Notiflix from 'notiflix';

refs.form.addEventListener('input', searchInput);
refs.searchBtn.addEventListener('click', onButtonClick);

function searchInput(e) {
  options.query = e.target.value;
}

function onButtonClick(e) {
  e.preventDefault();
  if (options.q.trim() === '') {
    Notiflix.Notify.failure('Please enter a valid request');
    refs.form.reset();
    return;
  }
  refs.galleryList.innerHTML = '';
  refs.form.reset();
  goForImages();
}

export function smothScroll() {
  const { height: cardHeight } =
    refs.galleryList.firstElementChild.getClientRects();
  window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
}
