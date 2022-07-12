const renderPhotos = (photos) => {
  const pictures = document.querySelector('.pictures');

  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const pictureFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureFragment.append(pictureElement);
  });

  pictures.append(pictureFragment);
};

export {renderPhotos};
