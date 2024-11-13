`use strict`;

import { fetchImages } from '../src/js/pixabay-api';
import {
  renderImages,
  showLoadMoreButton,
  hideLoadMoreButton,
  showEndMessage,
} from '../src/js/render-functions.js';

let query = '';
let page = 1;

const form = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('.load-more');

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.target.querySelector('input').value;
  page = 1;
  const data = await fetchImages(query, page);

  if (data.hits.length > 0) {
    renderImages(data.hits);
    showLoadMoreButton();
  } else {
    hideLoadMoreButton();
  }

  if (data.totalHits <= 15) {
    hideLoadMoreButton();
    showEndMessage();
  }
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  const data = await fetchImages(query, page);
  if (data.hits.length > 0) {
    renderImages(data.hits);
  }

  if (page * 15 >= data.totalHits) {
    hideLoadMoreButton();
    showEndMessage();
  }
});
