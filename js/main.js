import { makePhotos } from './data.js';
import { renderPhotos } from './feed.js';

const photos = makePhotos(25);

renderPhotos(photos);

