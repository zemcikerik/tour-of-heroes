import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {

  public messages: string[];
  private messageSubscription: Subscription;

  constructor(
    private readonly messageService: MessageService
  ) {
    this.messages = [];
  }

  public ngOnInit(): void {
    this.messageSubscription = this.messageService.onMessage$.subscribe({
      next: message => this.messages.push(message),
      error: err => console.error(err),
      complete: () => this.messages.push('Stopped receiving messages!')
    });
  }

  public clear(): void {
    this.messages = [];
  }

  public ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

}
