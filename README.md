# RoundApp

This project was build with `Angular` version 11.2.8, `Firebase` (Firestore, Fireauth), `Uploadcare` (to store the images) and represents a social web app.
The name of the project is representative (round up), therefore, its icon with a round shape. The colors were chosen from the classic parties where you were supposed to have a bracelet with glowing colors:
- `green` = single
- `yellow` = complicated
- `red` = taken / relationship.

The application is similar to instagram.

#### Pages / Components :
- Login Page `/login`
- Register Page `/register`
- Feed Page `/feed`
- Profile Page `/profile`
- Edit Profile Page `/edit-profile`
- Upload Page `/upload`
- Post Page `/post/:id`

#### Services :
- User Service `sets/gets, authentication`
- Auth Service `canActivate (user logged pages) (course 10)`
- Loading Service `Behavior Subject (course 10)`

### Features :
- [x] Firebase Config
- [x] Uploadcare ( strore the images + scale_crop / filer functions direct from url )
- [x] Login + Register (email + password)
- [x] Nav Bar
- [x] Profile
- [x] Upload
- [x] Post Page ( by  click-ing on post in `feed` or in `profile` )
- [x] Like/Flames Implementation ( can be done just in `/post/:id/`)
- [x] Feed
- [x] Router Guards (course 10)
- [x] Edit Profile
- [x] PipeData ( just lowercase for username in `/profile`, course 9 )
- [x] Loading Service
- [x] Animations
- [ ] Search Page
- [ ] Login ( social login )
- [ ] Testing
- [ ] Custom pipe


---
## Login Page `/login`
The Login Page is simple, with email and password login. 
The inputs are verified and alerts the user in case of errors. 
From login the user is redirected either to Feed Page `/feed` (in case of success) or to Register Page `/register` (in case of no account)

---
## Register Page `/register`
The Register Page lets the user to create an account. 
The inputs are verified (email type, passwords match, strong password) and alerts the user in cases of errors. 
From this page the user is redirected to Feed Page `/feed`, or, if he has already an  account, to Login Page `/login`.

---
## Navigation Bar
The navigation bar it is shown only if the user is logged in. The bar can navigate the user to:
- `/feed`
- `/upload`
- `/profile`.

---
## Feed Page `/feed`
The Feed Page takes all the posts from the database (Firebase) and show them to the logged user.
The page isn't available if not logged (Router Guards). 
Each post has a user, image, description and number of likes (flames) and also an individual page (if clicked) `/post/:id`.

---
## Post Page `/post/:id`
The individual post page has the user who created the post, image, description and a like/flame button which turns to red if the current user likes the post and actualize the post's number of likes/flames.

---
## Profile Page `/profile` + Edit Profile Page `/edit-profile`
The profile page illustrates the user's data. 
Initially, it has only username and email, but if he goes to edit profile `/edit-profile`, he can update his profile image, username, status (creates an image border corresponding to those 3 colors) and bio.
Also, it is shown in a grid his own posts.

---
## Upload Page `/upload`
The upload page consists of a button which lets the user upload an image. 
Once the image is selected, the user can select a filter for that particular image, add a description and post it.

---
## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

---
## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

---
## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
 
---
## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

---
## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

---
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
