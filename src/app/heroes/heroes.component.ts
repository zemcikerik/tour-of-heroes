import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public heroes: Hero[];
  public selectedHero: Hero;

  constructor(
    private readonly heroService: HeroService,
    private readonly messageService: MessageService
  ) { }

  public ngOnInit(): void {
    this.heroService.getHeroes().subscribe({
      next: heroes => this.heroes = heroes,
      error: err => console.error(err)
    });
  }

  public onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.addMessage(`HeroesComponent: Selected hero id=${hero.id}`);
  }

}
