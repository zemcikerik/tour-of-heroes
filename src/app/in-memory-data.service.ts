import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  
  public createDb(): any {
    const heroes: Hero[] = [
      { id: 1, name: 'Dr Nice', money: 100, items: [] },
      { id: 2, name: 'Narco', money: 1000, items: [] },
      { id: 3, name: 'Bombasto', money: 1000, items: [] },
      { id: 4, name: 'Celeritas', money: 1000, items: [] },
      { id: 5, name: 'Magneta', money: 1000, items: [] },
      { id: 6, name: 'RubberMan', money: 1000, items: [] },
      { id: 7, name: 'Dynama', money: 1000, items: [] },
      { id: 8, name: 'Dr IQ', money: 1000, items: [] },
      { id: 9, name: 'Magma', money: 1000, items: [] },
      { id: 10, name: 'Tornado', money: 1000, items: [] }
    ];

    const items: Item[] = [
      { id: 1, name: 'First Item', price: 100, isPurchasable: true },
      { id: 2, name: 'Second Item', price: 200, isPurchasable: true },
      { id: 3, name: 'Third Item', price: 300, isPurchasable: true }
    ];

    return { heroes, items };
  }

  public genId(list: { id: number }[]): number {
    return list.length > 0 
      ? Math.max(...list.map(elem => elem.id)) + 1 
      : 1;
  }

}
