import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //used to inject dependencies into the service
  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  //login method
  //it uses the sign in method provided by firebase auth. then if the sign in is suucesful it stores a token in the localstorage
  //which will be to indicate a user is signin, afterwards takes us to the todo page
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      // console.log(x)
      localStorage.setItem('token', 'true');
      this.router.navigate(['/todo']);
    }, err => {
      alert("Email invalid not Registered");
      this.router.navigate(['/login']);
    })
  }

  //register method
  register(email: string, password: string): Promise<void> {
    //createUserWithEmailAndPassword is a method that comes with firebase auth, it checks if the user is not already in use if yes it will retun an error
    //if not it creates a new acct, it returns a promise that resolves if the user is suuceesful, if there is an error the promise will be rejected.
    return new Promise((resolve, reject) => {
      this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
        alert('Registration Successful');
        resolve();
      }, err => {
        alert("Invalid email or password");
        reject(err);
      });
    });
  }

  //sign out
  //calls the sign out method, then removes tje token and redirect them to the login page
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login'])
    }, err => {
      alert(err.message);
    })
  }
}
