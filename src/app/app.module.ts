import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FeedComponent } from './feed/feed.component';
import { UploadComponent } from './upload/upload.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { PostComponent } from './post/post.component';
import { LoadingComponent } from './loading/loading.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FeedComponent,
    UploadComponent,
    ProfileComponent,
    PostComponent,
    LoadingComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
