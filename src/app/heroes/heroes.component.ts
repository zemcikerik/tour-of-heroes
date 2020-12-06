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
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  public create(name: string, money: number): void {
    name = name.trim();

    if (!name || money < 0) {
      return;
    }

    this.heroService.addHero({ name, money, items: [] } as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }

  public delete(hero: Hero): void {
    this.heroes.splice(this.heroes.indexOf(hero), 1);
    this.heroService.deleteHero(hero).subscribe();
  }

}
