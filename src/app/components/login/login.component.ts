import { Component, OnInit } from '@angular/core';
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

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  navigateToRegister() {
    this.router.navigate(['/register']);
  }


  //login() is called when clicked, login() checks if the email and password is filled, if yes then it calls login in Auth(from auth.service)
  // to check if the login is successful if yes, it clears the email and password fields
  login(){
    if(this.email == ''){
      alert('Please enter email');
      return;
    }
    if(this.password == ''){
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email, this.password);
    this.email='';
    this.password='';
  }
}
