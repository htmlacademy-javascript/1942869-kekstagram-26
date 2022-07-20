import { makePhotos } from './data.js';
import { renderPhotos } from './feed.js';
import { addUploadFileChangeHandler } from './upload-form.js';

const photos = makePhotos(25);

renderPhotos(photos);

addUploadFileChangeHandler();


