import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../restapi.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../..//service/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  invalidLogin = false;
  constructor(
    private router: Router,
    private loginservice: AuthenticationService
  ) {}

  ngOnInit(): void {}
  checkLogin() {
    this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['customers']);
        this.invalidLogin = false;
      },
      error => {
        alert('Username of Password are wrong');
        this.invalidLogin = true;
      }
    );
  }
}
