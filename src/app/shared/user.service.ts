import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  saveUserData(userData: any) {
    // Get the user's UID after they log in.
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // Use the UID as the document ID in Firestore.
        const uid = user.uid;
        const userDoc = this.firestore.collection('users').doc(uid);

        // Save user-specific data to Firestore.
        userDoc.set(userData)
          .then(() => {
            console.log('User data saved in Firestore');
          })
          .catch((error) => {
            console.error('Error saving user data:', error);
          });
      }
    });
  }

  getUserData() {
    // Get the user's UID after they log in.
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          // Use the UID to fetch user-specific data from Firestore.
          const uid = user.uid;
          const userDoc = this.firestore.collection('users').doc(uid);
          return userDoc.valueChanges();
        } else {
          // Handle the case where the user is not logged in.
          return of(null);
        }
      })
    );
  }
}
