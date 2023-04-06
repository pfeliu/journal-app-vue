import 'setimmediate';
import uploadImage from '@/modules/daybook/helpers/uploadImage';
import axios from 'axios';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'dgfysd3yh',
  api_key: '581264772325879',
  api_secret: 'dX9lGRQokdQHY3CiKRYrJWh8mgM',
});

describe('Upload Image', () => {
  test('should load a file and return url', async (done) => {
    const { data } = await axios.get(
      'https://res.cloudinary.com/dgfysd3yh/image/upload/v1680621835/mj7wde7dae3vuhuxuhp2.jpg',
      { responseType: 'arraybuffer' }
    );

    const file = new File([data], 'foto.jpg');

    const url = await uploadImage(file);

    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');
    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done();
    });
  });
});
