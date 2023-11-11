import type { ICustomOPG } from './custom-opg';

export interface IRedirect {
  key: string;
  url: string;
  is_whitespaced: boolean;
  redirect?: string;
  opg?: ICustomOPG;
}
export interface IRedirectRequest {
  url: string;
  is_whitespaced?: boolean;
  opg?: ICustomOPG;
}
