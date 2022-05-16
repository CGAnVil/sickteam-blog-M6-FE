export interface RequestOptions {
  data?: any;
  params?: { [param: string]: string | string[] | boolean | number };
  showLoadingImmediately?: boolean;
  hideLoading?: boolean;
  ignoreError?: boolean;
  ignoreUnknownError?: boolean;
  observe?: string;
  reportProgress?: boolean;
  responseType?: string;
}
