import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import firebase from 'firebase/app';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postID: string
  post
  postReference: any
  effect: string = ''
  busy: boolean = true

  likeColor: string = 'black'

  constructor(
    private route: ActivatedRoute, 
    private afstore: AngularFirestore,
    private user: UserService,
    private loading: LoadingService
    ) { 
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.loading.changeStatus(false)
      this.busy = false
    }, 1000);

    this.postID = this.route.snapshot.paramMap.get('id')
    this.postReference = this.afstore.doc(`posts/${this.postID}`)
    this.postReference.valueChanges().subscribe(val => {
      this.post = val
      this.effect = val.effect
      this.likeColor = val.likes.includes(this.user.getUID()) ? 'red' : 'black'
    })
  }

  toggleLike() {
    if (this.likeColor == 'black') {
      this.postReference.update({
        likes: firebase.firestore.FieldValue.arrayUnion(this.user.getUID())
      })
    } else {
      this.postReference.update({
        likes: firebase.firestore.FieldValue.arrayRemove(this.user.getUID())
      })
    }
  }

}
