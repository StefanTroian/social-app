import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingService } from '../loading.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userPosts
  mainUser: AngularFirestoreDocument
  posts
  email
  username
  status
  bio
  profileImg
  busy: boolean = true

  constructor(
    private afstore: AngularFirestore,
    private user: UserService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private loading: LoadingService
  ) {
    this.mainUser = afstore.doc(`users/${user.getUID()}`);
    this.mainUser.valueChanges().subscribe(event => {
      this.posts = event.posts,
      this.email = event.email,
      this.username = event.username ? event.username : event.email.split('@')[0],
      this.profileImg = event.profileImg,
      this.status = event.status,
      this.bio = event.bio
    });

  }

  ngOnInit(): void {

    setTimeout(() => {
      this.loading.changeStatus(false)
      this.busy = false
    }, 1000);

  }

  
  goTo(postID: string) {
    this.router.navigate(['post/' + postID.split('/')[0]]).then(() => {
      this.loading.changeStatus(true)
    })
  }

  goToEdit() {
    this.router.navigate(['/edit-profile']).then(() => {
      this.loading.changeStatus(true)
    });
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/login']).then(() => {
      this.loading.changeStatus(true)
    });
  }

}
