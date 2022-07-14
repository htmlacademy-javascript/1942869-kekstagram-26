import { showPicture } from './big-picture.js';

const renderPhotos = (photos) => {
  // 1 Ищем куда вставить картинки, а именно контейнер с названием pictures
  const pictures = document.querySelector('.pictures');

  // 2 Ищем шаблон по которому будем создавать картинки по шаблону
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  // 3 Создаём фрагмент куда будем класть эти картинки
  const pictureFragment = document.createDocumentFragment();

  // 4 Создаём функцию, куда передаём массив картинок
  photos.forEach((photo) => {
    // Создали элемент(клон) по шаблону одного узла
    const pictureElement = pictureTemplate.cloneNode(true);
    // Наполнили этот элемент содержимым
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    // Записали во фрагмент этот элемент (увеличили его на этот элемент)
    pictureFragment.append(pictureElement);

    //Добавляем слушатель
    pictureElement.addEventListener('click', () => {
      showPicture(photo);
    });
  });

  // 5 Добавляем фрагмент в найденный в п1 контейнер
  pictures.append(pictureFragment);
};

export {renderPhotos};
