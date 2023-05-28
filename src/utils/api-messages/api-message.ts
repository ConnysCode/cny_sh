import type { NextApiResponse } from 'next';

import type { IAPIResponse } from '@/interfaces/api';

export default (
  res: NextApiResponse,
  message: IAPIResponse<any>,
  callback?: (res: NextApiResponse, message: IAPIResponse<any>) => void
) => {
  res.status(message.success ? 200 : 500);
  callback ? callback(res, message) : res.json(message);
};
