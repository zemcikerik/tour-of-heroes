import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  public heroes$: Observable<Hero[]>;
  private searchTerms: Subject<string>;

  constructor(
    private readonly heroService: HeroService
  ) {
    this.searchTerms = new Subject();
  }

  public ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => this.heroService.searchHeroes(term))
    );
  }

  public search(term: string): void {
    this.searchTerms.next(term);
  }

}
