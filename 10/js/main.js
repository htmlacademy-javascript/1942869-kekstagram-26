import { renderPhotos } from './feed.js';
import { setUserFormSubmit, addUploadFileChangeHandler } from './upload-form.js';
import {getData} from './api.js';
import {submitSuccessForm, submitErrorForm} from './messages.js';


// Получение данных с сервера
getData(renderPhotos);

// Добавление обработчика на момент завершения выбора файла
addUploadFileChangeHandler();

// Отправка данных из формы на сервер
setUserFormSubmit(submitSuccessForm, submitErrorForm);
