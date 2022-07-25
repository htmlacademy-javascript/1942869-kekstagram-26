const URLS = {
  GET: 'https://26.javascript.pages.academy/kekstagram/data',
  POST: 'https://26.javascript.pages.academy/kekstagram'
};

// Получение данных с сервера
const getData = (onSuccess, onFail) => {
  fetch(URLS.GET)
    .then((response) => {
      if (!response.ok) {
        throw new new Error (onFail('Сервер не отвечает. Попробуйте позже'));
      }
      return response.json();
    })
    .then((posts) => {
      onSuccess(posts);
    })
    .catch(() => {
      onFail('Ошибка зугрузки данных');
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
