import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { nanoid } from 'nanoid';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  constructor(
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) { }

  uploadData(collection: string, data: string) {
    const [fileType] = data.split(';base64');
    const fileSuffix = fileType.split(':image/');

    const filePath = `${collection}/${nanoid()}.${fileSuffix[1]}`;

    this.fireStorage.upload(filePath, data).snapshotChanges().pipe();
  }
}
