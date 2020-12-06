import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent implements OnInit {

  public items$: Observable<Item[]>;
  private searchTerms: Subject<string>;

  constructor(
    private readonly itemService: ItemService
  ) {
    this.searchTerms = new Subject();
  }

  public ngOnInit(): void {
    this.items$ = this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => this.itemService.searchItems(term))
    );
  }

  public search(term: string): void {
    this.searchTerms.next(term);
  }

}
