import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email:string ='';
  password:string='';

  constructor(private auth: AuthService, private router: Router, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }


  //login() is called when clicked, login() checks if the email and password is filled, if yes then it calls login in Auth(from auth.service)
  // If the login is successful, it captures the user's UID and proceeds
  login(){
    if(this.email == ''){
      alert('Please enter email');
      return;
    }
    if(this.password == ''){
      alert('Please enter password');
      return;
    }

    this.afAuth
      .signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential: { user: any; }) => {
        const user = userCredential.user;
        const uid = user.uid;
        console.log('User UID:', uid);
      })
      .catch((error) => {
        alert(error.message);
      });

    this.auth.login(this.email, this.password);
    // this.email='';
    // this.password='';
  }
}
