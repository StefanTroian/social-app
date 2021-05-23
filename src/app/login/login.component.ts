import { ERROR_COMPONENT_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingService } from '../loading.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  public error: any = false;
  busy: boolean = true

  constructor(
    public afAuth: AngularFireAuth, 
    public user: UserService, 
    public router: Router,
    public loading: LoadingService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading.changeStatus(false)
      this.busy = false
    }, 1000);
  }

  async login() {

    const { email, password } = this
    try {
      const res = await this.afAuth.signInWithEmailAndPassword( email, password);  
      if (res.user) {
          this.user.setUser({
            email,
            uid: res.user.uid
          })
          this.router.navigate(['/feed']).then(() => {
            this.loading.changeStatus(true)
          })
      }
    } catch (err) {
      if (err.code == 'auth/invalid-email') {
        this.error = "The email is invalid";
      } else if (err.code == 'auth/wrong-password') {
        this.error = "The password is invalid";
      }
    }
  }

  goToRegister() {
    this.router.navigate(['/register']).then(() => {
      this.loading.changeStatus(true)
    })
  }

}
