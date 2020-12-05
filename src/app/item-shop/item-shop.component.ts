import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { ItemService } from '../item.service';
import { Hero } from '../hero';
import { Item } from '../item';

@Component({
  selector: 'app-item-shop',
  templateUrl: './item-shop.component.html',
  styleUrls: ['./item-shop.component.css']
})
export class ItemShopComponent implements OnInit {

  public hero: Hero;
  public items: Item[];

  constructor(
    private readonly heroService: HeroService,
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly location: Location
  ) { }

  public ngOnInit(): void {
    const heroId: number = +this.route.snapshot.paramMap.get('id');

    this.heroService.getHero(heroId)
      .subscribe(hero => this.hero = hero);

    this.itemService.getItems()
      .subscribe(items => this.items = items.filter(item => item.isPurchasable));
  }

  public buyItem(item: Item): void {
    if (this.hero.money < item.price) {
      return;
    }

    item.isPurchasable = false;
    this.hero.money -= item.price;

    this.hero.items.push(item);
    this.items.splice(this.items.indexOf(item), 1);

    // TODO: call update
  }

  public goBack(): void {
    this.location.back();
  }

}
