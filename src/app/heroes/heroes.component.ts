import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public heroes: Hero[];

  constructor(
    private readonly heroService: HeroService
  ) { }

  public ngOnInit(): void {
    this.heroService.getHeroes().subscribe({
      next: heroes => this.heroes = heroes,
      error: err => console.error(err)
    });
  }

}
