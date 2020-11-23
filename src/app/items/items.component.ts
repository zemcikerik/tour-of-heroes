import { Component } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {

  public item: Item = {
    id: 1,
    name: 'Shield',
    price: 1000
  };

}
