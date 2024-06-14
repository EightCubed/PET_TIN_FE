export interface LoginPostData {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterPostData {
  username: string;
  password: string;
  emailId: string;
}

export interface LoginPostResponseData {
  roles: number[];
  accessToken: string;
}
