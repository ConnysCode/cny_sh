import { toString } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { IAPIResponse } from '@/interfaces/api';
import type { IRedirect } from '@/interfaces/redirect';
import apiMessage from '@/utils/api-messages/api-message';
import {
  ErrorMessage,
  SuccessMessage,
} from '@/utils/api-messages/api-message-enums';
import establishMongoConnection from '@/utils/establish-mongo-connection';

import axiosClient from '../axios-client';
import { fetchRedirect } from '../handlers/redirect';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<IAPIResponse<IRedirect>>
) => {
  try {
    const key = toString(req.query.key);
    if (req.method !== 'GET' || !key) {
      apiMessage(
        res,
        { success: false, message: ErrorMessage.invalid_request_body },
        (passedRes, message) => passedRes.status(405).json(message)
      );
      return;
    }

    await establishMongoConnection();
    const redirectRes = await fetchRedirect(key);

    if (!redirectRes) {
      apiMessage(res, {
        success: false,
        message: ErrorMessage.not_found,
      });
      return;
    }

    apiMessage(res, {
      success: true,
      content: await fetchRedirect(key),
      message: SuccessMessage.success,
    });
  } catch (error) {
    apiMessage(res, {
      success: false,
      message: ErrorMessage.unknown_error,
      error,
    });
  }
};

export const callGetRedirect = async (key: string) => {
  return axiosClient.get<IAPIResponse<IRedirect>>(key);
};
