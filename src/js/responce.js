import axios from 'axios';
import { refs } from './refs';
import { smothScroll } from '..';
import simpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import { addListenerScroll } from './scroll';
import { removeListenerScroll } from './scroll';

class pixabayOptions {
  constructor() {
    this.page = 1;
    this.page_max = 0;
    this.url = 'https://pixabay.com/api/';
    this.key = '32020206-eb1e8243d0555b8d860dcfe9c';
    this.image_type = 'photo';
    this.per_page = 40;
    this.q = '';
    this.orientation = 'horizontal';
    this.safesearch = true;
    this.totalHits = 0;
  }
  incrimentPage() {
    this.page = this.page + 1;
  }
  set query(query) {
    this.q = query;
  }
}

export const options = new pixabayOptions();
export function resetOptionPage() {
  options.page_max = 2;
  options.page = 1;
}

export function pageCheck() {
  const { page, page_max } = options;
  if (page <= page_max) {
    axiosGet();
    return;
  }
  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
  removeListenerScroll();
}

async function axiosGet() {
  const { url, key, q, page, per_page, image_type, orientation, safesearch } =
    options;
  const URL = `${url}?key=${key}&q=${q}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&page=${page}&per_page=${per_page}`;
  await axios(URL).then(res => {
    checkResponse(res.data);
  });
}

function checkResponse(data) {
  if (data.totalHits) {
    options.totalHits = data.totalHits;
    options.page_max = Math.ceil(options.totalHits / options.per_page);
    responce(data);
  }
  if (data.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again'
    );
    return;
  } else if (options.page === 1) {
    Notiflix.Notify.success(`Hooray! We found ${options.totalHits} images.`);
    addListenerScroll();
  }
}

function responce(data) {
  const render = data.hits
    .map(e => {
      return `<div class="photo-card">
  <a href="${e.largeImageURL}" class="photo-card__link">
  <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${e.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${e.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${e.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${e.downloads}
    </p>
  </div>
  </a>
  </div>
`;
    })
    .join('');
  refs.galleryList.insertAdjacentHTML('beforeend', render);
  lightbox.refresh();
  smothScroll();
}

const lightbox = new simpleLightbox('.gallery a');

export function loadMore() {
  options.incrimentPage();
  pageCheck();
}
