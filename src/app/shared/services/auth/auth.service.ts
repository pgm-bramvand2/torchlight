import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public firestore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
    ) {
      this.fireAuth.authState.subscribe((user) => {
        if(user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user'));
      }
    });

  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null? true: false;
  }

  async signIn(email: string, password: string) {
    return this.fireAuth
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      this.setUserData(res.user);
      this.fireAuth.authState.subscribe((user) => {
        if(user) {
          this.router.navigate(['characters']);
        }
      });
    })
    .catch((error) => {
      window.alert(error.message);
    });
  };

  async signUp(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then((res) => {
      this.setUserData(res.user);
      this.fireAuth.authState.subscribe((user) => {
        if(user) {
          this.router.navigate(['characters']);
        }
      });
    })
    .catch((error) => {
      window.alert(error.message);
    });
  };

  async signOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
    });
  }

  setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${user.uid}`);

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(userData, {
      merge: true
    });
  }
}
