import { generateKey } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';

import ShortUrl from '@/api/models/redirect';
import connectMongo from '@/utils/connect-mongo';

type Data = SucceededData | FailedData;

type SucceededData = {
  url: string;
};
type FailedData = {
  error_message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error_message: 'Method not allowed' });
    return;
  }

  await connectMongo();
  const data = req.body;

  if (!data || !data.url) {
    res.status(400).json({ error_message: 'Invalid URL' });
    return;
  }

  let keyLength = 5;
  let key = generateKey(keyLength);

  while (await ShortUrl.findOne({ key })) {
    keyLength++;
    key = generateKey(keyLength);
  }

  const shortUrl = await ShortUrl.create({ url: data.url, key });

  res.status(200).json({ url: `https://qwq.sh/${shortUrl.key}` });
}
