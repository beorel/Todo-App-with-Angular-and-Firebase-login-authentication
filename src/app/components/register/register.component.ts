import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router'; // Make sure to import Router
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router: Router) { }
  ngOnInit(): void {
  }
//register function checks if the email or pswd field is empty and if not call the register function from authService.
// once succesful then go to login page. it clears the email& pswd field empty
  register(event: Event) {
    //event.prevent default is telling the browser not to perform it default action associated with form submission etc
    event.preventDefault();
    if (this.username == '') {
      alert('Please enter username');
      return;
    }
    if (this.email == '') {
      alert('Please enter email');
      return;
    }
    if (this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.register(this.email, this.password).then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      alert('registration Not Succesful')
    });
    this.username =''
    this.email = '';
    this.password = '';
  }
}
