//NB- Observing Authentication States: It observes if a user is authenticated or not.
//Conditional Navigation: It allows or restricts navigation based on the authentication state.
//The AuthGuard class acts as a guard on routes, determining whether a user should be allowed to
//navigate to a particular route based on their authentication state, using the AngularFireAuth service to make that determination.


import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

//afAuth short form of AngularFireAuth
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): boolean | Promise<boolean> {
    return new Promise((resolve) => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}
