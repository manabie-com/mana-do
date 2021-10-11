export interface ListResponse<T> {
    data: T[];
    status?: number;
  }
  export interface Loading {
    type: string;
    payload: any;
  }