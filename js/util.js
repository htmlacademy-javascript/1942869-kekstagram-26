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

export {getRandomEnumElement};
export {getRandomIntInclusive};
export {isEscapeKey};
export {isMaxStrLengthFitSize};