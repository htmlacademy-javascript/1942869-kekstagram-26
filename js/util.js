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

// const maxStrLength = (str, maxLength) => {
//   if (typeof str !== 'string') {
//     throw new TypeError('Введена не строка!');
//   }

//   return str.length <= maxLength;
// };

// /* Код проверки функции maxStrLength */

// maxStrLength('Строка', 10);
// // console.log(maxStrLength('Строка', 10));
// // console.log(maxStrLength('Строка', 1));

const getRandomEnumElement = (elems) => elems[getRandomIntInclusive(0,elems.length-1)];

export {getRandomEnumElement};
export {getRandomIntInclusive};
