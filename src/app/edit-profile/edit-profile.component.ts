import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingService } from '../loading.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  mainUser: AngularFirestoreDocument
  email: string = ""
  profileImg: string = ""
  username: string = ""
  status: string = ""
  bio: string = ""
  busy: boolean = true

  @ViewChild('myFileBtn') myFileBtn: {
    nativeElement: HTMLInputElement
  }

  constructor(
    private http: HttpClient,
    private user: UserService,
    private afstore: AngularFirestore,
    private router: Router,
    private loading: LoadingService
  ) {

    this.mainUser = afstore.doc(`users/${user.getUID()}`)
    this.mainUser.valueChanges().subscribe(event => {
      this.email = event.email,
        this.profileImg = event.profileImg,
        this.username = event.username,
        this.status = event.status,
        this.bio = event.bio
    })

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading.changeStatus(false)
      this.busy = false
    }, 1000);
  }

  updateProfileImg() {
    this.myFileBtn.nativeElement.click()
  }

  uploadProfileImg(event) {
    const files = event.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', 'e0b9c34c13347c16e6f9')


    this.http.post('https://upload.uploadcare.com/base/', data).
      subscribe(event => {

        const uuid = event['file']
        this.mainUser.update({
          profileImg: uuid
        })

      })
  }


  updateProfile() {

    if (this.username) {
      this.mainUser.update({username: this.username})
    }
    if (this.status) {
      this.mainUser.update({status: this.status})
    }
    if (this.bio) {
      this.mainUser.update({bio: this.bio})
    }
    this.router.navigate(['/profile']).then(() => {
      this.loading.changeStatus(true)
    })
    
  }

}
