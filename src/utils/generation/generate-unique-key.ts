import { sampleSize } from 'lodash';

import redirect from '@/api/models/redirect';

const generateUniqueKey = async (length = 10): Promise<string> => {
  const key = sampleSize(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789',
    length
  ).join('');

  const exists = await redirect.exists({ uniqueKey: key });

  if (exists) {
    return generateUniqueKey(length + 1);
  }

  return key;
};

export default generateUniqueKey;
