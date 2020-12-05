import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private readonly messageService: MessageService
  ) { }

  public getHero(id: number): Observable<Hero> {
    this.messageService.addMessage(`HeroService: fetching hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  public getHeroes(): Observable<Hero[]> {
    this.messageService.addMessage('HeroService: fetching heroes');
    return of(HEROES);
  }

}
