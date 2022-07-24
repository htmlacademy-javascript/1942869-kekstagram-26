import {showAlert} from './util.js';

const URLS = {
  GET: 'https://26.javascript.pages.academy/kekstagram/data',
  POST: 'https://26.javascript.pages.academy/kekstagram'
};

// Получение данных с сервера
const getData = (onSuccess) => {
  fetch(URLS.GET)
    .then((response) => response.ok? response.json() : showAlert('Сервер не отвечает. Попробуйте позже'))
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showAlert('Ошибка зугрузки данных');
    });
};

// Отправка данных на сервер
const sendData = (onSuccess, onFail, body) => {
  fetch(
    URLS.POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => response.ok ? onSuccess() : onFail('Не удалось отправить форму. Попробуйте ещё раз'))
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
