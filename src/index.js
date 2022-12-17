import { refs } from './js/refs';
import { pageCheck } from './js/responce';
import { options } from './js/responce';
import Notiflix from 'notiflix';
import { resetOptionPage } from './js/responce';

refs.searchBtn.addEventListener('click', onButtonClick);

function onButtonClick(e) {
  e.preventDefault();
  const input = refs.input.value;
  if (input.trim() === '' || input.length < 3) {
    Notiflix.Notify.failure('Please enter a valid request');
    refs.input.value = '';
    return;
  }
  options.query = input;
  refs.galleryList.innerHTML = '';
  refs.input.value = '';
  resetOptionPage();
  pageCheck();
}

export function smothScroll() {
  const { height: cardHeight } =
    refs.galleryList.firstElementChild.getClientRects();
  window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
}
