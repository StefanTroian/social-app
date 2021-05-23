import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

interface user {
    email: string,
    uid: string
}

@Injectable()
export class UserService {
    
    private user: user

    constructor(private afAuth: AngularFireAuth) { }

    async isAuthenticated() {
        if (this.user)  return true

        const user = await this.afAuth.authState.pipe(first()).toPromise()

        if (user) {
            this.setUser({
                email: user.email,
                uid: user.uid
            })
            return true
        }
        return false
    
    }

    setUser(user: user) {
        this.user = user
    }

    getUID() {
        return this.user.uid
    }

    getEmail() {
        return this.user.email
    }

}