export type IResponseApi<T> = IResponseSuccessApi<T> | IResponseFailApi<T>;

export interface IResponseSuccessApi<T> {
  data: T;
  isSuccess: boolean;
}

export interface IResponseFailApi<T> {
  error: T;
  isSuccess: boolean;
}
