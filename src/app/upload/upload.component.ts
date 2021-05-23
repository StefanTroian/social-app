import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import firestore from 'firebase/app';
import { Router } from '@angular/router';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  imageURL: string;
  description: string;
  activeEffect: string = '';
  scaleCrop: string = "-/scale_crop/200x200/center";
  busy: boolean = true
  effects = [
    "",
    "-/filter/adaris/150",
    "-/filter/briaril/150",
    "-/filter/calarel/150",
    "-/filter/carris/150",
    "-/filter/cynarel/150",
    "-/filter/cyren/150",
    "-/filter/elmet/150",
    "-/filter/elonni/150",
    "-/filter/enzana/150",
    "-/filter/erydark/150",
    "-/filter/fenralan/150",
    "-/filter/ferand/150",
    "-/filter/galen/150",
    "-/filter/gavin/150",
    "-/filter/gethriel/150",
    "-/filter/iorill/150",
    "-/filter/iothari/150",
    "-/filter/iselva/150",
    "-/filter/jadis/150",
    "-/filter/lavra/150",
    "-/filter/misiara/150"
  ]

  @ViewChild('myFileBtn') myFileBtn

  constructor(
    public http: HttpClient,
    public afstore: AngularFirestore,
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

  uploadFile() {
    this.myFileBtn.nativeElement.click()
  }

  createPost() {

    const image = this.imageURL;
    const activeEffect = this.activeEffect
    const desc = this.description;

    this.afstore.doc(`users/${this.user.getUID()}`).update({
      posts: firestore.firestore.FieldValue.arrayUnion(`${image}/${activeEffect}`)
    })

    this.afstore.doc(`posts/${image}`).set({
      desc,
      author: this.user.getEmail().split("@")[0],
      effect: activeEffect,
      likes: []
    }).then(() => this.router.navigate(['/feed']).then(() => {
      this.loading.changeStatus(true)
    }))

  }


  fileChanged(event) {

    const files = event.target.files;

    const data = new FormData();
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', 'e0b9c34c13347c16e6f9')


    this.http.post('https://upload.uploadcare.com/base/', data).
      subscribe(event => {
        console.log(event)
        this.imageURL = event["file"]
      })
    
  }


  setFilter(effect: string) {
    this.activeEffect = effect
  }

}
