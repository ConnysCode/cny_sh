import { startsWith, toString } from 'lodash';
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
import { createRedirect } from '../handlers/redirect';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<IAPIResponse<IRedirect>>
) => {
  try {
    if (req.method !== 'POST') {
      apiMessage(
        res,
        { success: false, message: ErrorMessage.invalid_request_body },
        (passedRes, message) => passedRes.status(405).json(message)
      );
      return;
    }

    await establishMongoConnection();
    const url = toString(req.body.url);

    if (!url || !startsWith(url, `https://`)) {
      apiMessage(res, {
        success: false,
        message: ErrorMessage.only_https,
      });
      return;
    }

    apiMessage(res, {
      success: true,
      content: await createRedirect(url),
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

export const callCreateRedirect = async (url: string) => {
  return axiosClient.post<IAPIResponse<IRedirect>>(`create`, { url });
};
