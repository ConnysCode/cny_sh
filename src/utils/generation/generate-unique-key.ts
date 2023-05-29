import { sampleSize } from 'lodash';

import redirect from '@/api/models/redirect';

const regularKeySample =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789';
const whitespacedKeySample = [
  '\u200B', // Zero Width Space
  '\u200C', // Zero Width Non-Joiner
  '\u200D', // Zero Width Joiner
  '\u200E', // Left-to-Right Mark
  '\u200F', // Right-to-Left Mark
  '\u202A', // Left-to-Right Embedding
  '\u202B', // Right-to-Left Embedding
  '\u202C', // Pop Directional Formatting
  '\u202D', // Left-to-Right Override
  '\u202E', // Right-to-Left Override
  '\u2060', // Word Joiner
  '\u2061', // Function Application
  '\u2062', // Invisible Times
  '\u2063', // Invisible Separator
  '\u2064', // Invisible Plus
];

const generateUniqueKey = async (
  length = 10,
  whitespaced?: boolean
): Promise<string> => {
  const key = sampleSize(
    whitespaced ? whitespacedKeySample : regularKeySample,
    length
  ).join('');

  const exists = await redirect.exists({ uniqueKey: key });

  if (exists) {
    return generateUniqueKey(length + 1);
  }

  return key;
};

export default generateUniqueKey;
