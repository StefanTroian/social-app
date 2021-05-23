import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'social-app';

  constructor(
    public router: Router,
    private loading: LoadingService
  ) { }

  goToFeed() {
    if (this.router.url !== '/feed') {
      this.router.navigate(['/feed']).then(() => {
        this.loading.changeStatus(true)
      })
    }
  }

  goToUpload() {
    if (this.router.url !== '/upload') {
      this.router.navigate(['/upload']).then(() => {
        this.loading.changeStatus(true)
      })
    }
  }

  goToProfile() {
    if (this.router.url !== '/profile') {
      this.router.navigate(['/profile']).then(() => {
        this.loading.changeStatus(true)
      })
    }
  }

}
