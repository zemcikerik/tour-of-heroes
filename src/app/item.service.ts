import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from './item';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private readonly messageService: MessageService
  ) { }

  public getItems(): Observable<Item[]> {
    this.messageService.addMessage('ItemService: fetching items');

    return of([
      { id: 1, name: 'Test Item', price: 100 },
      { id: 2, name: 'Test Item', price: 200 },
      { id: 3, name: 'Test Item', price: 300 }
    ]);
  }

}
