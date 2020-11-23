import { Component, Input } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {

  @Input() public items: Item[];
  public selectedItem: Item;

  public onSelect(item: Item): void {
    this.selectedItem = item;
  }

}
