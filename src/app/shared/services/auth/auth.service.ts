import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { LocalstorageService } from '../localstorage/localstorage.service';
import { User } from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    private localStorageService: LocalstorageService,
    public firestore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
    ) {
      this.fireAuth.authState.subscribe((user) => {
        if(user) {
          this.userData = user;
          this.localStorageService.setStorageItem('user', this.userData);
          this.localStorageService.getStorageItem('user');
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
      } else {
        // this.localStorageService.setStorageItem('user','null');
        this.localStorageService.getStorageItem('user');
      }
    });

  }

  get isLoggedIn(): boolean {
    const user = this.localStorageService.getStorageItem('user');
    return !!user;
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
      this.localStorageService.clearStorage();
      console.log(this.localStorageService.getStorageItem('user'));
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
