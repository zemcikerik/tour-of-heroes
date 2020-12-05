import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from './item';
import { MessageService } from './message.service';
import { ITEMS } from './mock-items';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private readonly messageService: MessageService
  ) { }

  public getItem(id: number): Observable<Item> {
    this.messageService.addMessage(`ItemService: fetching item id=${id}`);
    return of(ITEMS.find(item => item.id === id));
  }

  public getItems(): Observable<Item[]> {
    this.messageService.addMessage('ItemService: fetching items');
    return of(ITEMS);
  }

}
