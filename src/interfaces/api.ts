import type {
  ErrorMessage,
  SuccessMessage,
} from '@/utils/api-messages/api-message-enums';

export type IAPIResponse<T> = IAPISuccessfulResponse<T> | IAPIFailedResponse;

export interface IAPISuccessfulResponse<T> {
  success: true;
  message: SuccessMessage;
  content: T;
}

export interface IAPIFailedResponse {
  success: false;
  message: ErrorMessage;
  error?: any;
}
