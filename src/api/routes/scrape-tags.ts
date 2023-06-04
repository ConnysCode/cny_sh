import { toString } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import ogs from 'open-graph-scraper';
import type { OgObjectInteral } from 'open-graph-scraper/dist/lib/types';

import type { IAPIResponse } from '@/interfaces/api';
import type { IRedirect } from '@/interfaces/redirect';
import apiMessage from '@/utils/api-messages/api-message';
import {
  ErrorMessage,
  SuccessMessage,
} from '@/utils/api-messages/api-message-enums';

import axiosClient from '../axios-client';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<IAPIResponse<IRedirect>>
) => {
  try {
    const url = toString(req.body.url);

    if (req.method !== 'POST' || !url) {
      apiMessage(
        res,
        { success: false, message: ErrorMessage.invalid_request_body },
        (passedRes, message) => passedRes.status(405).json(message)
      );
      return;
    }

    const opg = await ogs({ url });
    if (opg.error) {
      apiMessage(res, {
        success: false,
        message: ErrorMessage.not_found,
      });
      return;
    }

    apiMessage(res, {
      success: true,
      content: opg.result,
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

export const callScrapeTags = async (url: string) => {
  return axiosClient.post<IAPIResponse<OgObjectInteral>>(
    'internal/scrape-tags/',
    { url }
  );
};
