import { renderPhotos } from './feed.js';
import { debounce } from './util.js';

const RANDOM_PHOTOS_NUMBER = 10;
const RERENDER_DELAY = 500;

const imgFiltersElement = document.querySelector('.img-filters');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

// Добавляем класс активной кнопке
const getActiveButton = (currentButton) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  currentButton.classList.add('img-filters__button--active');
};

// Функция удаления предыдущих фото
const clearPhotos = () => {
  const photosList = document.querySelectorAll('.picture');
  photosList.forEach((photo) => photo.remove());
};

// Функция обновления фото
const updatePhotos = (photos) => {
  clearPhotos();
  renderPhotos(photos);
};

// Функция устранение дребезгов
const debouncedFilter = debounce(updatePhotos, RERENDER_DELAY);

// По умолчанию — фотографии в изначальном порядке с сервера.
const getDefaultFilter = (photos) => photos.slice();

// Случайные — 10 случайных, не повторяющихся фотографий.
// Использован механизм https://www.codecademy.com/forum_questions/4f609c49e0bd2b0003011313
const getRandomFilter = (photos) => photos.slice().sort(() => 0.5 - Math.random()).slice(0, RANDOM_PHOTOS_NUMBER);

// Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
const getDisscussedFilter = (photos) => photos.slice()
  .sort((photo1, photo2) => photo2.comments.length - photo1.comments.length);

// Добавляем обработчики изменения фильтров, которые будут управлять порядком отрисовки элементов на странице:
const createFilters = (photos) => {
  imgFiltersElement.classList.remove('img-filters--inactive');

  filterDefaultButton.addEventListener('click', (evt) => {
    getActiveButton(evt.target);
    debouncedFilter(getDefaultFilter(photos));
  });

  filterRandomButton.addEventListener('click', (evt) => {
    getActiveButton(evt.target);
    debouncedFilter(getRandomFilter(photos));
  });

  filterDiscussedButton.addEventListener('click', (evt) => {
    getActiveButton(evt.target);
    debouncedFilter(getDisscussedFilter(photos));
  });
};

export { createFilters };
