import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingService } from '../loading.service';
import { UserService } from '../user.service';

interface Post {
  id: string,
  author: string,
  desc: string,
  effect: string,
  likes: []
}

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  posts: Post[] = new Array()
  profileImg: string
  mainUser: AngularFirestoreDocument
  busy: boolean = true

  constructor(
    private afstore: AngularFirestore,
    private router: Router,
    private user: UserService,
    public loading: LoadingService
  ) { 
    this.mainUser = afstore.doc(`users/${user.getUID()}`);
    this.mainUser.valueChanges().subscribe(event => {
      this.profileImg = event.profileImg
    });
  }
  

  ngOnInit(): void {

    setTimeout(() => {
      this.loading.changeStatus(false)
      this.busy = false
    }, 1000);

    const feed = this.afstore.collection('posts').get().forEach((doc) => {
      doc.docs.map(elem => {
        const feedLocal = this.afstore.doc(`posts/${elem.id}`)
        feedLocal.valueChanges().subscribe(data => {
          const postLocal = {
            id: elem.id,
            author: data['author'],
            desc: data['desc'],
            effect: data['effect'] ? data['effect'] : '',
            likes: data['likes']  
          }
          this.posts.push(postLocal)
        })
      })
    })
  }

  goTo(postID: string) {
      this.router.navigate(['post/' + postID]).then(() => {
        this.loading.changeStatus(true)
      })
  }

}
