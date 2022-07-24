import { isEscapeKey, isMaxStrLengthFitSize } from './util.js';
import {beginScale, finishScale} from './picture-scale.js';
import {accessEffects, finishEffects} from './photo-effects.js';
import {sendData} from './api.js';

const HASHTAG_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const COMMENTS_MAX_LENGTH = 140;
const MAX_TAGS_COUNT = 5;

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const uploadFileElement = imgUploadForm.querySelector('#upload-file');
const imgUploadCancel = document.querySelector('.img-upload__cancel');

// Переменные для валидации
const textHashtagElement = imgUploadForm.querySelector('.text__hashtags');
const textDescriptionElement = imgUploadForm.querySelector('.text__description');

// Переменная для отправки фото
const submitButton = document.querySelector('.img-upload__submit');

// Функция действий при нажатии кнопки Esc
const onImgUploadFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
};

// Функция действия при клике на кнопку закрытия
const onUploadCancelButtonClick = () => {
  closeUploadForm();
};

// Открытие формы и редактирования изображения
const showUploadForm = () => {

  // У элемента .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open
  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  // Подключение скалирования и изменения эффектов
  beginScale();
  accessEffects();

  // Добавление обработчиков событий
  imgUploadCancel.addEventListener('click', onUploadCancelButtonClick);
  document.addEventListener('keydown', onImgUploadFormEscKeydown);
};

// Функция закрытия формы и редактирования изображения
function closeUploadForm () {
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  // Обратите внимание, что при закрытии формы дополнительно необходимо сбрасывать значение поля выбора файла
  // #upload-file. В принципе, всё будет работать, если при повторной попытке загрузить в поле другую фотографию.
  // Но! Событие change не сработает, если пользователь попробует загрузить ту же фотографию, а значит окно с
  // формой не отобразится, что будет нарушением техзадания. Значение других полей формы также нужно сбрасывать.
  imgUploadForm.reset();

  //Удаление обработчиков событий
  document.removeEventListener('keydown', onImgUploadFormEscKeydown);
  imgUploadCancel.removeEventListener('click', onUploadCancelButtonClick);

  // Удаление обработчиков шкалирования и эффектов
  finishScale();
  finishEffects();
}

const addUploadFileChangeHandler = () => {
  // Добавляем слушатель на загрузку формы
  uploadFileElement.addEventListener('change', showUploadForm);
};

// !Начало раздела валидации

// Функция для действий при нажатии клавиши Esc в поле ввода
const onInputEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // остановим всплытие
    evt.stopPropagation();
  }
};

// - если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
textHashtagElement.addEventListener('keydown', onInputEscKeydown);
// - если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
textDescriptionElement.addEventListener('keydown', onInputEscKeydown);

// Функция для валидации комментариев
const validateCommentMaxLength = (str) => isMaxStrLengthFitSize( str, COMMENTS_MAX_LENGTH );

// - хэш-тег начинается с символа # (решётка);
// - строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы
// - хеш-тег не может состоять только из одной решётки;
// - максимальная длина одного хэш-тега 20 символов, включая решётку;
const validateHashTagsNames = (data) => {
  if (data.length > 0) {
    // - хэш-теги разделяются пробелами;
    const tagsArray = data.split(' ');
    return(tagsArray.every((htag) => HASHTAG_REGEX.test(htag)));
  }
  return(true);
};

// - нельзя указать больше пяти хэш-тегов;
const validateHashTagsNumbers = (data) => {
  // - хэш-теги разделяются пробелами;
  const tagsArray = data.split(' ');
  return(tagsArray.length <= MAX_TAGS_COUNT);
};

// - один и тот же хэш-тег не может быть использован дважды;
const validateHashTagsDuplicates = (data) => {
  // - хэш-теги разделяются пробелами;
  const tagsArray = data.split(' ');
  // - хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
  const uniqueTagsArray = [...new Set(tagsArray.map((htag) => htag.toLowerCase()))];
  return (tagsArray.length === uniqueTagsArray.length);
};

// Подключение Pristine
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

// Добавление валидаторов

pristine.addValidator(
  textHashtagElement,
  validateHashTagsNames,
  'Хэш-тег должен начинается с символа #, состоять из букв и чисел, не содержать пробелы, спецсимволы и быть от 2 до 20'
);

pristine.addValidator(
  textHashtagElement,
  validateHashTagsNumbers,
  'Нельзя указать больше пяти хэш-тегов'
);

pristine.addValidator(
  textHashtagElement,
  validateHashTagsDuplicates,
  'Один и тот же хэш-тег не может быть использован дважды'
);

// длина комментария не может составлять больше 140 символов
pristine.addValidator(
  textDescriptionElement,
  validateCommentMaxLength,
  'Длина комментария не может составлять больше 140 символов'
);

// Конец раздела валидации

// Функция блокировки кнопки отправить
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

// Функция разблокировки кнопки отправить
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// Отправка данных из формы на сервер
const setUserFormSubmit = (onSuccess, onFail) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData (
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          onFail();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export { addUploadFileChangeHandler, setUserFormSubmit, closeUploadForm };
