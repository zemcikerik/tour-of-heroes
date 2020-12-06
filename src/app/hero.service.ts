import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private readonly heroesUrl: string = 'api/heroes';

  private readonly httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private readonly httpClient: HttpClient,
    private readonly messageService: MessageService
  ) { }

  public getHero(id: number): Observable<Hero> {
    const url: string = `${this.heroesUrl}/${id}`;
    this.log(`fetching hero id=${id}`);

    return this.httpClient.get<Hero>(url).pipe(
      tap(() => this.log(`fetched hero id=${id}`)),
      catchError(this.createErrorHandler<Hero>(`getHero id=${id}`))
    );
  }

  public getHeroes(): Observable<Hero[]> {
    this.log('fetching heroes');

    return this.httpClient.get<Hero[]>(this.heroesUrl).pipe(
      tap(() => this.log('fetched heroes')),
      catchError(this.createErrorHandler('getHeroes', []))
    );
  }

  public addHero(hero: Hero): Observable<Hero> {
    this.log('adding new hero');

    return this.httpClient.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(newHero => this.log(`added hero with id ${newHero.id}`)),
      catchError(this.createErrorHandler<Hero>('addHero'))
    )
  }

  public updateHero(hero: Hero): Observable<any> {
    const id: number = hero.id;
    this.log(`updating hero id=${id}`);

    return this.httpClient.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(() => this.log(`updated hero id=${id}`)),
      catchError(this.createErrorHandler<any>('updateHero'))
    );
  }

  public deleteHero(hero: Hero | number): Observable<any> {
    const id: number = typeof hero === 'number' ? hero : hero.id;
    const url: string = `${this.heroesUrl}/${id}`;
    this.log(`deleting hero id=${id}`);

    return this.httpClient.delete<Hero>(url, this.httpOptions).pipe(
      tap(() => this.log(`deleted hero id=${id}`)),
      catchError(this.createErrorHandler('deleteHero'))
    );
  }

  public searchHeroes(term: string): Observable<Hero[]> {
    term = term.trim();

    if (!term) {
      return of([]);
    }

    const url: string = `${this.heroesUrl}/?name=${term}`;
    this.log(`finding heroes matching "${term}"`);

    return this.httpClient.get<Hero[]>(url).pipe(
      tap(heroes => heroes.length
        ? this.log(`found ${heroes.length} heroes matching ${term}`)
        : this.log(`found no heroes matching ${term}`)),
      catchError(this.createErrorHandler<Hero[]>('searchHeroes'))
    );
  }

  private log(message: string): void {
    this.messageService.addMessage(`HeroService: ${message}`);
  }

  private createErrorHandler<T>(operation: string, defaultResult?: T) {
    return (err: Error): Observable<T> => {
      console.error(err);
      this.log(`${operation} failed: ${err.message}`);
      return of(defaultResult);
    };
  }

}
