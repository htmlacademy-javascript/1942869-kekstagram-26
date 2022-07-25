const EFFECTS = {
  chrome: {
    FILTER: 'grayscale',
    OPTIONS: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    STEP_UNIT: ''
  },
  sepia: {
    FILTER: 'sepia',
    OPTIONS: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    STEP_UNIT: ''
  },
  marvin: {
    FILTER: 'invert',
    OPTIONS: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    STEP_UNIT: '%'
  },
  phobos: {
    FILTER: 'blur',
    OPTIONS: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    STEP_UNIT: 'px'
  },
  heat: {
    FILTER: 'brightness',
    OPTIONS: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    STEP_UNIT: ''
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

  // Функция для скалирования фильтров
  const applyFilterEffect = (effect) => {
    const effectStepUnit = EFFECTS[effect].STEP_UNIT;
    const effectStyle = EFFECTS[effect].FILTER;
    effectLevelSliderElement.noUiSlider.on('update', () => {
      // Уровень эффекта записывается в поле .effect-level__value
      effectLevelValueElement.value = effectLevelSliderElement.noUiSlider.get();
      imgUploadPreviewElement.style.filter = `${effectStyle}(${effectLevelValueElement.value}${effectStepUnit})`;
    });

    imgUploadEffectLevelElement.classList.remove('hidden');
    imgUploadPreviewElement.removeAttribute('class');
    imgUploadPreviewElement.classList.add(`effects__preview--${effect}`);
    // При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%):
    imgUploadPreviewElement.style.filter = `${effectStyle}(${EFFECTS[effect].OPTIONS.start}${effectStepUnit})`;
    // слайдер, CSS-стиль изображения и значение поля должны обновляться.
    effectLevelSliderElement.noUiSlider.updateOptions(EFFECTS[effect].OPTIONS);
  };

  // Для оригинального изображения
  imgUploadPreviewElement.removeAttribute('class');
  if (evt.target.id === 'effect-none') {
    // При выборе эффекта «Оригинал» слайдер скрывается.
    imgUploadEffectLevelElement.classList.add('hidden');
    // Для эффекта «Оригинал» CSS-стили filter удаляются.
    imgUploadPreviewElement.style.filter = 'none';

  // Для примененных фильтров
  } else {
    const effectName = evt.target.value;
    applyFilterEffect(effectName);
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
