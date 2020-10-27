import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, startWith, map, share, tap } from 'rxjs/operators';
import { CONFIG } from 'src/app/config/config';
import { Page, Sort, PageRequest, PaginatedEndpoint, Delete } from './page';

export interface SimpleDataSource<T> extends DataSource<T> {
  connect(): Observable<T[]>;
  disconnect(): void;
}

export class PaginatedDataSource<T> implements SimpleDataSource<T> {
  private pageNumber = new Subject<number>();
  private sort: BehaviorSubject<Sort<T>>;
  private removeItems: BehaviorSubject<Delete<T>>;
  private loading = new Subject<boolean>();

  public loading$ = this.loading.asObservable();
  public page$: Observable<Page<T>>;
  public data: T[];

  constructor(
    private endpoint: PaginatedEndpoint<T>,
    initialSort: Sort<T>,
    public pageSize = CONFIG.pageSize
  ) {
    this.sort = new BehaviorSubject<Sort<T>>(initialSort);
    this.removeItems = new BehaviorSubject<Delete<T>>({});
    const param$ = combineLatest([this.removeItems, this.sort]);
    this.page$ = param$.pipe(
      switchMap(([removeItems, sort]) =>
        this.pageNumber.pipe(
          startWith(0),
          switchMap((page) => {
            return this.endpoint({ page, sort, size: this.pageSize }, removeItems);
          })
        )
      ),
      share()
    );
    this.connect().subscribe((data) => (this.data = data));
  }

  sortBy(sort: Partial<Sort<T>>) {
    const lastSort = this.sort.getValue();
    const nextSort = { ...lastSort, ...sort };
    this.sort.next(nextSort);
  }

  fetch(page: number) {
    this.pageNumber.next(page);
  }

  deleteItems(items: Partial<Delete<T>>) {
    const lastDelete = this.removeItems.getValue();
    const nextDelete = { ...lastDelete, ...items };
    this.removeItems.next(nextDelete);
  }

  connect() {
    return this.page$.pipe(map((page) => page.content));
  }

  disconnect() {}
}
