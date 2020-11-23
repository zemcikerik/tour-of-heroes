import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hero } from './hero';
import { ItemService } from './item.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private readonly itemService: ItemService,
    private readonly messageService: MessageService
  ) { }

  public getHeroes(): Observable<Hero[]> {
    this.messageService.addMessage('HeroService: fetching heroes');

    return this.itemService.getItems().pipe(
      map(items => [
        { id: 1, name: 'Dr Nice', items: [...items] },
        { id: 2, name: 'Narco', items: [...items] },
        { id: 3, name: 'Bombasto', items: [...items] },
        { id: 4, name: 'Celeritas', items: [...items] },
        { id: 5, name: 'Magneta', items: [...items] },
        { id: 6, name: 'RubberMan', items: [...items] },
        { id: 7, name: 'Dynama', items: [...items] },
        { id: 8, name: 'Dr IQ', items: [...items] },
        { id: 9, name: 'Magma', items: [...items] },
        { id: 10, name: 'Tornado', items: [...items] }
      ])
    );
  }

}
