import { isBoolean, startsWith, toString } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { IAPIResponse } from '@/interfaces/api';
import type { IRedirect, IRedirectRequest } from '@/interfaces/redirect';
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
    const body = req.body as IRedirectRequest;
    const url = toString(body.url);
    const isWhitespaced = isBoolean(body.is_whitespaced)
      ? body.is_whitespaced
      : false;

    if (!url || !startsWith(url, `https://`)) {
      apiMessage(res, {
        success: false,
        message: ErrorMessage.only_https,
      });
      return;
    }

    const redirectRes = await createRedirect(url, isWhitespaced);
    apiMessage(res, {
      success: true,
      content: {
        redirect: `${process.env.DOMAIN}/${redirectRes.key}`,
        ...redirectRes,
      },
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

export const callCreateRedirect = async (data: IRedirectRequest) => {
  return axiosClient.post<IAPIResponse<IRedirect>>(`create`, data);
};
