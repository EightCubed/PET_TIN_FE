export interface LoginPostData {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginPostResponseData {
  roles: number[];
  accessToken: string;
}
