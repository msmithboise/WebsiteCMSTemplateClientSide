import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { CookieService } from 'ngx-cookie-service';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { LoggedInUser } from '../models/logged-in-user.model';
import { User } from '../models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { CustomPageService } from '../services/custom-page.service';
import { UserService } from '../services/user.service';
import { WebStructureService } from '../web-structure.service';

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
    private router: Router,
    public webStructureService: WebStructureService,
    public cookie: CookieService,
    public customPageService: CustomPageService
  ) {}

  ngOnInit(): void {
    this.grabAllUserData();
  }

  grabAllUserData() {
    this.userService.getUserData().subscribe((res: User[]) => {
      this.userService.userArray = res;
    });
  }

  resetForm() {
    this.loginForm.reset();
  }

  loginForm = new FormGroup({
    Username: new FormControl('', Validators.required),
    Hash: new FormControl(''),
    ClientId: new FormControl('', Validators.required),
  });

  currentUserLoginForm = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Hash: new FormControl(''),
  });

  createCookie() {
    this.cookie.set('token', this.webStructureService.token);
  }

  Login() {
    let user = this.loginForm.value;
    user.isLoggedIn = false;
    this.authService.removeToken();
    this.alerts = [];

    this.authService.ValidateUser(user).subscribe(
      (result) => {
        this.globalResponse = result;
      },
      (error) => {
        //this is the error part
        this.toastr.error('Invalid username or password!');

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

        this.authService.storeToken(this.globalResponse.access_token);
        this.userToken = this.globalResponse.access_token.toString();

        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'Login succesful!',
        });
        user.Token = this.userToken;
        this.webStructureService.token = this.userToken;

        user.isLoggedIn = true;

        localStorage.setItem('userToken', this.userToken.toString());
        this.createCookie();

        this.customPageService.getCustomPageContent();

        //Add method that navigates to the first route in the page array

        this.router.navigate(['Home/' + this.customPageService.trueHomeId]);
        this.userService.getUserData().subscribe((res: User[]) => {
          this.userService.userArray = res;
        });
        this.userService.postLoginData(user).subscribe((res: User[]) => {
          this.userService.getUserData();
        });

        this.loginForm.reset();
      }
    );
  }

  setLoginUserData() {
    let currentUser = this.currentUserLoginForm.value;
    this.userService
      .postCurrentUserData(currentUser)
      .subscribe((res: LoggedInUser[]) => {
        this.userService.loggedInUserArray = res;
      });
  }
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
