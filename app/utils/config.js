import Unsplash from 'unsplash-js/native';
import { APPLICATION_ID, SECRET_ID, CALLBACK_URL } from './secrets';

export const unsplash = new Unsplash({
  applicationId: APPLICATION_ID,
  secret: SECRET_ID,
  callbackUrl: CALLBACK_URL
});
