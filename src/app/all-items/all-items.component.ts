import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css']
})
export class AllItemsComponent implements OnInit {

  public items: Item[];

  constructor(
    private readonly itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.itemService.getItems()
      .subscribe(items => this.items = items);
  }

}
