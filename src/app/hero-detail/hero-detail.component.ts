import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  public hero: Hero;

  constructor(
    private readonly heroService: HeroService,
    private readonly route: ActivatedRoute,
    private readonly location: Location
  ) { }

  public ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');

    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  public save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  public goBack(): void {
    this.location.back();
  }

}
