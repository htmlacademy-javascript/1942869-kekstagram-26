import { renderPhotos } from './feed.js';
import { setUserFormSubmit, addUploadFileChangeHandler } from './upload-form.js';
import { getData } from './api.js';
import { submitSuccessForm, submitErrorForm } from './messages.js';
import { createFilters } from './feed-filters.js';
import { showAlert } from './util.js';
import './upload-photo.js';

// Получение данных с сервера
getData((photos) => {
  renderPhotos(photos);
  createFilters(photos);
}, showAlert);

// Добавление обработчика на момент завершения выбора файла
addUploadFileChangeHandler();

// Отправка данных из формы на сервер
setUserFormSubmit(submitSuccessForm, submitErrorForm);
