// Значение должно изменяться с шагом в 25.
const SCALE_STEP = 25;
// Минимальное значение — 25%
const SCALE_MIN = 25;
// Максимальное значение — 100%
const SCALE_MAX = 100;
// Значение по умолчанию — 100%;
const SCALE_DEFAULT = 100;

// При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля .scale__control--value;
const imgUploadFormElement = document.querySelector('.img-upload__form');
const scaleControlValueElement = imgUploadFormElement.querySelector('.scale__control--value');
const scaleControlSmallerElement = imgUploadFormElement.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = imgUploadFormElement.querySelector('.scale__control--bigger');
const imgUploadPreview = imgUploadFormElement.querySelector('.img-upload__preview').querySelector('img');

// Устанавливаем значение по-умолчанию в .scale__control--value
const setScaleControlValue = () => {
  scaleControlValueElement.value = SCALE_DEFAULT;
};

// Распарсиваем значение в .scale__control--value
const getScaleControlValue = () => parseInt(scaleControlValueElement.value, 10);

// Задаём функцию для обработчика событий
const onScaleControlButtonClick = (evt) => {
  const scaleElement = evt.target;
  let scaleValue = 0;
  if (scaleElement.classList.contains('scale__control--smaller')) {
    scaleControlBiggerElement.disabled = false;
    scaleValue = getScaleControlValue() - SCALE_STEP;
  } else {
    scaleControlSmallerElement.disabled = false;
    scaleValue = getScaleControlValue() + SCALE_STEP;
  }
  if (scaleValue >= SCALE_MIN && scaleValue <= SCALE_MAX) {
    const transformScaleValue = scaleValue / 100;
    scaleElement.disabled = false;
    scaleControlValueElement.value = scaleValue;
    // внутри .img-upload__preview должен добавляться соответствующий стиль CSS,
    // который с помощью трансформации scale задаёт масштаб. Например transform: scale(0.75).
    imgUploadPreview.style.transform = `scale(${transformScaleValue})`;
  } else {
    scaleElement.disabled = true;
  }
};

// Код для начала скалирования
const beginScale = () => {
  setScaleControlValue();
  scaleControlSmallerElement.addEventListener('click', onScaleControlButtonClick);
  scaleControlBiggerElement.addEventListener('click', onScaleControlButtonClick);
};

// Функция для завершения скалирования
const finishScale = () => {
  scaleControlSmallerElement.removeEventListener('click', onScaleControlButtonClick);
  scaleControlBiggerElement.removeEventListener('click', onScaleControlButtonClick);
  imgUploadPreview.removeAttribute('style');
};

export {beginScale, finishScale};
