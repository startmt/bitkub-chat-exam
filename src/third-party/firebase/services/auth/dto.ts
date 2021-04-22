import {
  ICreateUserFireStorePayload,
  IRegisterPayload,
  ISigninPayload,
} from "./interface";

export const mapToSigninService = (input: ISigninPayload) => {
  return input;
};

export const mapToRegisterService = (input: IRegisterPayload) => {
  return input;
};

export const mapToCreateUserFirestoreService = (
  input: ICreateUserFireStorePayload
) => {
  return input;
};
