import {isEscapeKey} from './util.js';
import { closeUploadForm } from './upload-form.js';

const bodyElement = document.querySelector('body');
const errorMsgTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMsgElement = errorMsgTemplate.cloneNode(true);
const errorButtonElement = errorMsgElement.querySelector('.error__button');
const successMsgTemplate = document.querySelector('#success').content.querySelector('.success');
const successMsgElement = successMsgTemplate.cloneNode(true);
const successButtonElement = successMsgElement.querySelector('.success__button');


// Функция показа сообщения об ошибке
const showErrorMessage = () => {
  bodyElement.classList.add('modal-open');
  bodyElement.append(errorMsgElement);
  document.addEventListener('keydown', onErrorMessageEscClose);
};

// Функция закрытия сообщения об ошибке
const closeErrorMessage = () => {
  bodyElement.classList.remove('modal-open');
  errorMsgElement.remove();
  document.removeEventListener('keydown', onErrorMessageEscClose);
};

// Добавление слушателя на кнопку для закрытия сообщения об ошибке
errorButtonElement.addEventListener('click', () => closeErrorMessage());

// Обработчик для закрытия сообщения об ошибке при нажатии Esc
function onErrorMessageEscClose(evt) {
  if (isEscapeKey(evt)) {
    closeErrorMessage();
  }
}

// Функция показа сообщения об успешной отправке сообщения
const showSuccessMessage = () => {
  bodyElement.classList.add('modal-open');
  bodyElement.append(successMsgElement);
  document.addEventListener('keydown', onSuccessMessageEscClose);
};

// Функция закрытия сообщения об успешной отправке
const closeSuccessMessage = () => {
  bodyElement.classList.remove('modal-open');
  successMsgElement.remove();
  document.removeEventListener('keydown', onSuccessMessageEscClose);
};

// Закрытие сообщения об успехе по кнопке
successButtonElement.addEventListener('click', () => closeSuccessMessage());

// Обработчики для закрытия сообщения об успешной отправке
function onSuccessMessageEscClose(evt) {
  if (isEscapeKey(evt)) {
    closeSuccessMessage();
  }
}

// Функция для отправки данных без ошибки
const submitSuccessForm = () => {
  closeUploadForm();
  showSuccessMessage();
};

// Функция для отправки данных с ошибкой
const submitErrorForm = () => {
  showErrorMessage();
};

export {submitSuccessForm, submitErrorForm};
