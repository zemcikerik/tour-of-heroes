import { Component, Input } from '@angular/core';
import { Item } from '../item';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {

  @Input() public items: Item[];
  public selectedItem: Item;

  constructor (
    private readonly messageService: MessageService
  ) { }

  public onSelect(item: Item): void {
    this.selectedItem = item;
    this.messageService.addMessage(`ItemsComponent: Selected item id=${item.id}`);
  }

}
