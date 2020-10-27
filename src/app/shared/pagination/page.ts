import { Observable } from 'rxjs';

export interface Sort<T> {
  property: keyof T;
  order: 'asc' | 'desc';
}

export interface Delete<T> {
  content?: T[];
}

export interface PageRequest<T> {
  page: number;
  size: number;
  sort?: Sort<T>;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  size: number;
  number: number;
}

export type PaginatedEndpoint<T> = (
  pageable: PageRequest<T>,
  removeItems: Delete<T>
) => Observable<Page<T>>;
