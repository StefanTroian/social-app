import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
import { AuthService } from './auth.service';
import { PostComponent } from './post/post.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'feed', component: FeedComponent, canActivate: [AuthService]},
  { path: 'upload', component: UploadComponent, canActivate: [AuthService]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthService]},
  { path: 'post/:id', component: PostComponent, canActivate: [AuthService]},
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
