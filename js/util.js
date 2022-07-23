const ALERT_SHOW_TIME = 5000;

// Функция, возвращающая случайное целое число из переданного диапазона включительно

function getRandomIntInclusive(min, max) {
  if (min < 0) {
    return 'Минимальное число должно быть положительным!';
  }
  if (max < 0) {
    return 'Максимальное число должно быть положительным!';
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return min + Math.floor(Math.random() * (max - min + 1));
}

// Функция для проверки максимальной длины строки

const isMaxStrLengthFitSize = (str, maxLength) => {
  if (typeof str !== 'string') {
    throw new TypeError('Введена не строка!');
  }

  return str.length <= maxLength;
};

const getRandomEnumElement = (elems) => elems[getRandomIntInclusive(0,elems.length-1)];

// Функция для проверки клавиши Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomEnumElement, getRandomIntInclusive, isEscapeKey, isMaxStrLengthFitSize , showAlert};
