import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  createCharacter(data) {
    return this.firestore
    .collection('characters')
    .add(data);
  }

  getAllCharacters() {
    return this.firestore
    .collection('characters')
    .snapshotChanges();
  }

  getUserCharacters(userId) {
    return this.firestore
    .collection('characters', ref => ref.where('userId', '==', userId))
    .valueChanges();
  }

  updateCharacter(id, data) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`characters/${id}` );

    return userRef.update(data);
  }
}
