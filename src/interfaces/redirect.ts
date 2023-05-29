export interface IRedirect {
  key: string;
  url: string;
  is_whitespaced: boolean;
  redirect?: string;
}
export interface IRedirectRequest {
  url: string;
  is_whitespaced?: boolean;
}
