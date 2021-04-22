export interface ISigninPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  email: string;
  password: string;
}

export interface ICreateUserFireStorePayload {
  email: string;
  name: string;
}
