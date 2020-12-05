import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { ItemsComponent } from './items/items.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllItemsComponent } from './all-items/all-items.component';
import { ItemShopComponent } from './item-shop/item-shop.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    ItemsComponent,
    HeroDetailComponent,
    ItemDetailComponent,
    MessagesComponent,
    DashboardComponent,
    AllItemsComponent,
    ItemShopComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
