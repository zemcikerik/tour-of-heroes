import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Item } from './item';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly itemsUrl: string = 'api/items';

  private readonly httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private readonly httpClient: HttpClient,
    private readonly messageService: MessageService
  ) { }

  public getItem(id: number): Observable<Item> {
    const url: string = `${this.itemsUrl}/${id}`;
    this.log(`fetching item id=${id}`);

    return this.httpClient.get<Item>(url).pipe(
      tap(() => this.log(`fetched item id=${id}`)),
      catchError(this.createErrorHandler<Item>(`getItem id=${id}`))
    );
  }

  public getItems(): Observable<Item[]> {
    this.log('fetching items');

    return this.httpClient.get<Item[]>(this.itemsUrl).pipe(
      tap(() => this.log('fetched items')),
      catchError(this.createErrorHandler('getItems', []))
    );
  }

  public addItem(item: Item): Observable<Item> {
    this.log('adding new item');

    return this.httpClient.post<Item>(this.itemsUrl, item, this.httpOptions).pipe(
      tap(newItem => this.log(`added item with id ${newItem.id}`)),
      catchError(this.createErrorHandler<Item>('addItem'))
    )
  }

  public updateItem(item: Item): Observable<any> {
    const id: number = item.id;
    this.log(`updating item id=${id}`);

    return this.httpClient.put(this.itemsUrl, item, this.httpOptions).pipe(
      tap(() => this.log(`updated item id=${id}`)),
      catchError(this.createErrorHandler<any>('updateItem'))
    );
  }

  public deleteItem(item: Item | number): Observable<any> {
    const id: number = typeof item === 'number' ? item : item.id;
    const url: string = `${this.itemsUrl}/${id}`;
    this.log(`deleting item id=${id}`);

    return this.httpClient.delete<Item>(url, this.httpOptions).pipe(
      tap(() => this.log(`deleted item id=${id}`)),
      catchError(this.createErrorHandler('deleteItem'))
    );
  }

  public searchItems(term: string): Observable<Item[]> {
    term = term.trim();

    if (!term) {
      return of([]);
    }

    const url: string = `${this.itemsUrl}/?name=${term}`;
    this.log(`finding items matching "${term}"`);

    return this.httpClient.get<Item[]>(url).pipe(
      tap(items => items.length
        ? this.log(`found ${items.length} items matching ${term}`)
        : this.log(`found no items matching ${term}`)),
      catchError(this.createErrorHandler<Item[]>('searchItems'))
    );
  }
  
  private log(message: string): void {
    this.messageService.addMessage(`ItemService: ${message}`);
  }

  private createErrorHandler<T>(operation: string, defaultResult?: T) {
    return (err: Error): Observable<T> => {
      console.error(err);
      this.log(`${operation} failed: ${err.message}`);
      return of(defaultResult);
    };
  }

}
