export interface ICommonEntity {
  id: string;
  created: Date;
  updated: Date;
}

export interface IResponseError {
  statusCode: number;
  message: string | string[];
  error?: string;
}
