export interface LoginPostData {
  username: string;
  password: string;
}

export interface LoginPostResponseData {
  roles: number[];
  accessToken: string;
}
