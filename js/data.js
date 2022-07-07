import {getRandomEnumElement, getRandomIntInclusive} from './util.js';

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

export {makePhotos};
