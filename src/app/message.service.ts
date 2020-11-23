import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnDestroy {

  private messageSubject: ReplaySubject<string>;

  constructor() {
    this.messageSubject = new ReplaySubject();
  }

  public addMessage(message: string): void {
    this.messageSubject.next(message);
  }

  public get onMessage$(): Observable<string> {
    return this.messageSubject;
  }

  public ngOnDestroy(): void {
    this.messageSubject.complete();
  }

}
