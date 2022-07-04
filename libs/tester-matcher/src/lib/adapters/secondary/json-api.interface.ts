export interface JsonData<T> {
  type: string;
  id: string;
  attributes: T;
  links?: any;
  relationships?: any;
}

export interface JsonDataWithRelationships<T, K> extends JsonData<T> {
  relationships: K;
}

export interface HasDataWithRelationships<T, K> {
  data: JsonDataWithRelationships<T, K>;
}

export interface HasData<T> {
  data: JsonData<T>;
}

export interface HasIncluded<T> {
  included: JsonData<T>[];
}

export interface HasDataCollection<T> {
  data: JsonData<T>[];
}

export interface JsonResponseError {
  detail: string;
  code?: string;
}

export interface HasErrorResponse {
  error: HasErrorsResponse;
}

export interface HasErrorsResponse {
  errors: JsonResponseError[];
}

export interface HasDataWithMeta<T, K> {
  data: JsonData<T>[];
  meta: K;
}

export interface JsonTitleResponseError {
  title: string;
}

export interface HasTitleErrorResponse {
  error: {
    errors: JsonTitleResponseError[];
  };
}
