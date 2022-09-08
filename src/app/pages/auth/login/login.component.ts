import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_NAME_TOKEN } from 'src/app/shared/common/const';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginMode = true;
  email = '';
  password = '';
  rePassword = '';
  emailError = false;
  passwordError = false;
  rePasswordError = false;
  showPass = false;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  getI() {
    return 'eye' + (this.showPass ? '-off' : '') + '-outline';
  }

  submit() {
    if (!this.email) {
      this.emailError = true;
      return;
    }
    if (!this.password) {
      this.passwordError = true;
      return;
    }
    // if (!this.rePassword || this.rePassword !== this.password) {
    //   this.rePasswordError = true;
    //   return;
    // }
    if (this.loginMode) {
      this.userService.login(this.email, this.password)
        .subscribe(result => this.loggedIn(result.data as string));
    } else {
      this.userService.register(this.email, this.password, this.rePassword)
        .subscribe(result => this.loggedIn(result.data as string));
    }
  }
  loggedIn(token: string) {
    localStorage.setItem(APP_NAME_TOKEN, token);
    this.router.navigateByUrl('/tabs/home');
  }

  fb() { }

  google() { }
}
