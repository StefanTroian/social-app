import { animate, transition, trigger, state, style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        backgroundColor: '#c80303'
      })),
      state('closed', style({
        backgroundColor: '#00c519'
      })),
      transition('open => closed', [
        animate('0.5s 0s ease-in-out')
      ]),
      transition('closed => open', [
        animate('0.5s 0s ease-in-out')
      ]),
    ]),
  ]
})

export class LoadingComponent implements OnInit {

  currentFlag: boolean = true
  isLoading: boolean = true

  constructor(
    public _loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this._loadingService.status.subscribe((newValue: boolean) => {
      this.currentFlag = newValue;
    });

    setInterval(() => {
      this.isLoading = !this.isLoading;
    }, 500);

  }

}
