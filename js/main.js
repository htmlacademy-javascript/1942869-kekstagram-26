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

const maxStrLength = (str, maxLength) => {
  if (typeof str !== 'string') {
    throw new TypeError('Введена не строка!');
  }

  return str.length <= maxLength;
};


/* Код проверки функций */

getRandomIntInclusive(1, 10);
// console.log(getRandomIntInclusive(1, 10));
// console.log(getRandomIntInclusive(-1, 10));

maxStrLength('Строка', 10);
// console.log(maxStrLength('Строка', 10));
// console.log(maxStrLength('Строка', 1));

/* Код проверки функций*/

const NAMES = [
  'Артём',
  'Никита',
  'Дима',
  'Олеся',
  'Таня',
  'Юля',
  'Лена',
  'Аня'
];

const DESCRIPTIONS = [
  'Я',
  'Ещё раз я',
  'Снова я?',
  'Опять я',
  'Я любимый'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomEnumElement = (elems) => elems[getRandomIntInclusive(0,elems.length-1)];

let commentId = 1;

const MIN_COMMENT_NUMBER = 1;
const MAX_COMMENT_NUMBER = 6;
const MIN_NUMBER_OF_LIKES = 25;
const MAX_NUMBER_OF_LIKES = 100;
const MIN_NUMBER_OF_COMMENTS = 0;
const MAX_NUMBER_OF_COMMENTS = 5;


const makeComment = () => ({
  id: commentId++,
  avatar:`img/avatar-${  getRandomIntInclusive(MIN_COMMENT_NUMBER, MAX_COMMENT_NUMBER)  }.svg`,
  message: getRandomEnumElement(COMMENTS),
  name: getRandomEnumElement(NAMES)
});

const makeComments = (count) => {
  const comments = [];
  for (let i=1; i <= count; i++) {
    comments.push(makeComment(i));
  }

  return comments;
};

const makePhoto = (id) => ({
  id: id,
  url: `photos/${  id  }.jpg`,
  description: getRandomEnumElement(DESCRIPTIONS),
  likes: getRandomIntInclusive(MIN_NUMBER_OF_LIKES, MAX_NUMBER_OF_LIKES),
  comments: makeComments(getRandomIntInclusive(MIN_NUMBER_OF_COMMENTS, MAX_NUMBER_OF_COMMENTS))
});

const makePhotos = (count) => {
  const photo = [];
  for (let i=1; i <= count; i++) {
    photo.push(makePhoto(i));
  }

  return photo;
};

makePhotos(25);
