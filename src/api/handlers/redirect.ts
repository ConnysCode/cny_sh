import { pick } from 'lodash';

import generateUniqueKey from '@/utils/generation/generate-unique-key';

import redirect from '../models/redirect';

export const createRedirect = async (url: string, whitespaced = false) => {
  const key = await generateUniqueKey(undefined, whitespaced);
  const created = await redirect.create({
    url,
    key,
    is_whitespaced: whitespaced,
  });
  return pick(created, [`key`, `url`]);
};
export const fetchRedirect = async (key: string) => {
  const found = await redirect.findOne({ key });
  return found ? pick(found, [`key`, `url`]) : null;
};
