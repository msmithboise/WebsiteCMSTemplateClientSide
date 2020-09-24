import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public globalResponse: any;

  public alerts: IAlert[];

  constructor(
    private userService: UserService,
    public authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.grabAllUserData();
  }

  grabAllUserData() {
    this.userService.getUserData().subscribe((res: User[]) => {
      this.userService.userArray = res;

      // console.log('Here is the images based on page id: ');
      // console.log(this.imagesByPageIdArray);
    });
  }

  resetForm() {
    this.loginForm.reset();
  }

  loginForm = new FormGroup({
    Username: new FormControl('', Validators.required),
    Hash: new FormControl(''),
  });
  Login() {
    let user = this.loginForm.value;
    this.userService.isLoggedIn = false;
    this.authService.removeToken();
    this.alerts = [];
    // console.log(user);
    this.authService.ValidateUser(user).subscribe(
      (result) => {
        this.globalResponse = result;
      },
      (error) => {
        //this is the error part
        this.toastr.error('Invalid username or password!');
        //console.log(error.message);
        this.loginForm.reset();

        this.alerts.push({
          id: 2,
          type: 'danger',
          message: 'Either user name or password is incorrect',
        });
      },
      () => {
        // this is Success part
        this.toastr.success('Login succesful!');
        console.log(this.globalResponse);
        this.authService.storeToken(this.globalResponse.access_token);
        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'Login succesful!',
        });
        this.userService.isLoggedIn = true;
        this.router.navigate(['customPage/:pageDescription/1']);
        //this.userService.postLoginData(user).subscribe();
        this.loginForm.reset();
      }
    );
  }
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
