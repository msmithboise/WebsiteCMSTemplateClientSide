import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { LoggedInUser } from '../models/logged-in-user.model';
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
  public userToken: string;

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

  currentUserLoginForm = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Hash: new FormControl(''),
  });
  Login() {
    let user = this.loginForm.value;
    user.isLoggedIn = false;
    this.authService.removeToken();
    this.alerts = [];
    // console.log(user);
    this.authService.ValidateUser(user).subscribe(
      (result) => {
        this.globalResponse = result;
        console.log(result);
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
        this.userToken = this.globalResponse.access_token.toString();
        console.log('userToken');
        console.log(this.userToken);
        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'Login succesful!',
        });
        user.Token = this.userToken;
        user.isLoggedIn = true;

        this.router.navigate(['customPage/:pageDescription/1']);
        this.userService.getUserData().subscribe((res: User[]) => {
          console.log('Here is the entire user array');
          console.log(res);
          this.userService.userArray = res;
        });
        this.userService.postLoginData(user).subscribe((res: User[]) => {
          this.userService.getUserData();
        });
        //this.setLoginUserData();
        this.loginForm.reset();
      }
    );
  }

  setLoginUserData() {
    let currentUser = this.currentUserLoginForm.value;
    this.userService
      .postCurrentUserData(currentUser)
      .subscribe((res: LoggedInUser[]) => {
        console.log('here is just the logged in user data: ');
        console.log(res);
        this.userService.loggedInUserArray = res;
      });
  }
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
