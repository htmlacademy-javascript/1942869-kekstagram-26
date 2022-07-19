import { isEscapeKey } from './util.js';

const COMMENTS_RANGE_TO_SHOW = 5;

const bigPicture = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');

const showPicture = (photo) => {

  bigPicture.classList.remove('hidden');

  // Адрес изображения url подставляется как src изображения внутри блока .big-picture__img
  const bigPictureImgElement = document.querySelector('.big-picture__img').querySelector('img');
  bigPictureImgElement.src = photo.url;

  // Количество лайков likes подставляется как текстовое содержание элемента .likes-count
  const bigPictureLikesCount = document.querySelector('.likes-count');
  bigPictureLikesCount.textContent = photo.likes;

  // Переменные для блоков счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader
  const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
  const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');

  const comments = photo.comments;

  // Создаём счётчик комментариев
  let commentsCounter = 0;

  //
  socialCommentsCount.classList.remove('hidden');

  // Код по выводу списка комментариев таким образом, чтобы список показывался не полностью, а по 5 элементов,
  // и следующие 5 элементов добавлялись бы по нажатию на кнопку «Загрузить ещё».


  const showNextComments = () => {

    // Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments
    const socialComments = document.querySelector('.social__comments');

    // Удаляем содержимое блока social__comments
    document.querySelectorAll('.social__comment').forEach((li) => li.remove());

    // Создаём фрагмент
    const commentsFragment = document.createDocumentFragment();

    comments.slice(0, commentsCounter += COMMENTS_RANGE_TO_SHOW).forEach((comment) => {
      const commentsElement = document.createElement('li');
      commentsElement.classList.add('social__comment');
      const socialPicture = document.createElement('img');
      socialPicture.src = comment.avatar;
      socialPicture.alt = comment.name;
      socialPicture.width = 35;
      socialPicture.height = 35;
      commentsElement.append(socialPicture);

      const socialText = document.createElement('p');
      socialText.classList.add('social__text');
      socialText.textContent=comment.message;
      commentsElement.append(socialText);

      commentsFragment.append(commentsElement);
    });

    socialComments.append(commentsFragment);

    // Не забываем реализовать обновление числа показанных комментариев в блоке .social__comment-count.
    if(commentsCounter >= comments.length) {
      socialCommentsLoader.classList.add('hidden');
      socialCommentsCount.textContent = `${comments.length} из ${comments.length} комментариев`;
    } else {
      socialCommentsLoader.classList.remove('hidden');
      socialCommentsCount.textContent = `${commentsCounter} из ${comments.length} комментариев`;
    }

  };

  // Функция действий при клике на Cancel socialCommentsLoader
  const onSocialCommentsLoaderClick = () => {
    showNextComments();
  };

  socialCommentsLoader.addEventListener('click', onSocialCommentsLoaderClick);

  showNextComments();

  // Описание фотографии description вставьте строкой в блок .social__caption
  const bigPictureDescription = document.querySelector('.social__caption');
  bigPictureDescription.textContent = photo.description;

  // После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями
  // позади не прокручивался при скролле.
  bodyElement.classList.add('modal-open');

  // Функция действий при нажатии кнопки Esc
  const onBigPictureEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePicture();
    }
  };

  // Функция действий при клике на Cancel
  const onBigPictureCancelClick = () => {
    closePicture();
  };

  // Код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.
  const bigPictureCancel = document.querySelector('.big-picture__cancel');

  // Переопределение функции закрытия Изображения
  function closePicture() {
    bigPicture.classList.add('hidden');

    // При закрытии окна не забудьте удалить этот класс.
    bodyElement.classList.remove('modal-open');

    // Удаляем обработчик события на Esc и на Клик на Картинке
    bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
    document.removeEventListener('keydown', onBigPictureEscKeydown);

    // Удаляем обработчик события на Esc и на Клик на "Загрузке комментариев"
    socialCommentsLoader.removeEventListener('click', onSocialCommentsLoaderClick);
  }

  // Добавление обработчиков событий
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onBigPictureEscKeydown);
};

export {showPicture};
