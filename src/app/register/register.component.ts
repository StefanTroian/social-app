import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string = ""
  password: string = ""
  cpassword: string = ""
  public error: any = false
  busy: boolean = true

  constructor(
    public afAuth: AngularFireAuth, 
    public router: Router, 
    public afstore: AngularFirestore,
    public user: UserService,
    public loading: LoadingService
    ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading.changeStatus(false)
      this.busy = false
    }, 1000);
  }

  async register() {
    const { email, password, cpassword } = this;
    try {
      if (password === cpassword) {
        const res = await this.afAuth.createUserWithEmailAndPassword(email, password);
        
        this.afstore.doc(`users/${res.user.uid}`).set({
          email,
        })

        this.user.setUser({
          email,
          uid: res.user.uid
        })

        this.router.navigate(['/feed']).then(() => {
          this.loading.changeStatus(true)
        });  

      } else {
        this.error = 'The password do not match'
      }

    } catch (err) {
      if (err.code == 'auth/invalid-email') {
        this.error = 'The email is invalid'
      } else if (err.code == 'auth/weak-password'){
        this.error = 'Password should be at least 6 characters'
      }
    }
  }

  goToLogin() {
    this.router.navigate(['/login']).then(() => {
      this.loading.changeStatus(true)
    })
  }


}