const EFFECTS = {
  chrome: {
    FILTER: 'grayscale',
    MIN: 0,
    MAX: 1,
    STEP: 0.1
  },
  sepia: {
    FILTER: 'sepia',
    MIN: 0,
    MAX: 1,
    STEP: 0.1
  },
  marvin: {
    FILTER: 'invert',
    MIN: 0,
    MAX: 100,
    STEP: 1
  },
  phobos: {
    FILTER: 'blur',
    MIN: 0,
    MAX: 3,
    STEP: 0.1
  },
  heat: {
    FILTER: 'brightness',
    MIN: 1,
    MAX: 3,
    STEP: 0.1
  },
};

const imgUploadFormElement = document.querySelector('.img-upload__form');
const effectsListElement =  imgUploadFormElement.querySelector('.effects__list');
const imgUploadEffectLevelElement = imgUploadFormElement.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = imgUploadFormElement.querySelector('.effect-level__slider');
const effectLevelValueElement = imgUploadFormElement.querySelector('.effect-level__value');
const imgUploadPreviewElement = imgUploadFormElement.querySelector('.img-upload__preview').querySelector('img');


// Интенсивность эффекта регулируется перемещением ползунка в слайдере.
// Слайдер реализуется сторонней библиотекой для реализации слайдеров noUiSlider.
noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.01,
  connect: 'lower'
});

// При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio,
// добавить картинке внутри .img-upload__preview CSS-класс, соответствующий эффекту
const onEffectsListClick = (evt) => {

  // Для оригинального изображения
  imgUploadPreviewElement.removeAttribute('class');
  if (evt.target.id === 'effect-none') {
    // При выборе эффекта «Оригинал» слайдер скрывается.
    imgUploadEffectLevelElement.classList.add('hidden');
    // Для эффекта «Оригинал» CSS-стили filter удаляются.
    imgUploadPreviewElement.style.filter = 'none';

  // Для всех остальных
  } else {
    const effectName = evt.target.id.replace(/effect-/, '');
    const effectStyle = EFFECTS[effectName].FILTER;
    effectLevelSliderElement.noUiSlider.on('update', () => {
      // Уровень эффекта записывается в поле .effect-level__value
      effectLevelValueElement.value = effectLevelSliderElement.noUiSlider.get();
      // При изменении уровня интенсивности эффекта (предоставляется API слайдера),
      // CSS-стили картинки внутри .img-upload__preview обновляются
      if (effectName === 'marvin') {
        // Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
        imgUploadPreviewElement.style.filter = `${effectStyle}(${effectLevelValueElement.value}%)`;
      } else if (effectName === 'phobos') {
        // Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
        imgUploadPreviewElement.style.filter = `${effectStyle}(${effectLevelValueElement.value}px)`;
      } else {
        // Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
        // Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
        // Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
        imgUploadPreviewElement.style.filter = `${effectStyle}(${effectLevelValueElement.value})`;
      }
    });

    imgUploadEffectLevelElement.classList.remove('hidden');
    imgUploadPreviewElement.removeAttribute('class');
    imgUploadPreviewElement.classList.add(`effects__preview--${effectName}`);
    // При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%):
    imgUploadPreviewElement.style.filter = `${effectStyle}(${EFFECTS[effectName].MAX})`;
    // слайдер, CSS-стиль изображения и значение поля должны обновляться.
    effectLevelSliderElement.noUiSlider.updateOptions({
      range: {
        min: EFFECTS[effectName].MIN,
        max: EFFECTS[effectName].MAX
      },
      start: EFFECTS[effectName].MAX,
      step: EFFECTS[effectName].STEP
    });
  }
};

const accessEffects = () => {
  imgUploadEffectLevelElement.classList.add('hidden');
  effectsListElement.addEventListener('change', onEffectsListClick);
};

const finishEffects = () => {
  effectsListElement.removeEventListener('change', onEffectsListClick);
  imgUploadEffectLevelElement.classList.add('hidden');
  imgUploadPreviewElement.removeAttribute('class');
};

export {accessEffects, finishEffects};
