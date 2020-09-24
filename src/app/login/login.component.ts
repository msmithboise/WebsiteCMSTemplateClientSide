import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { error } from 'console';
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
  public isLoggedIn: boolean;
  public alerts: IAlert[];

  constructor(
    private userService: UserService,
    public authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.grabAllUserData();
  }

  grabAllUserData() {
    this.userService.getUserData().subscribe((res: User[]) => {
      console.log(res);
      this.userService.userArray = res;

      // console.log('Here is the images based on page id: ');
      // console.log(this.imagesByPageIdArray);
    });
  }

  loginForm = new FormGroup({
    Username: new FormControl('', Validators.required),
    Hash: new FormControl(''),
  });
  Login() {
    let user = this.loginForm.value;
    this.isLoggedIn = false;
    this.authService.removeToken();
    this.alerts = [];
    console.log(user);
    this.authService.ValidateUser(user).subscribe(
      (result) => {
        this.globalResponse = result;
      },
      (error) => {
        //this is the error part
        console.log(error.message);
        this.alerts.push({
          id: 2,
          type: 'danger',
          message: 'Either user name or password is incorrect',
        });
      },
      () => {
        // this is Success part
        console.log(this.globalResponse);
        this.authService.storeToken(this.globalResponse.access_token);
        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'Login succesful!',
        });
        this.isLoggedIn = true;
      }
    );
  }

  // Login()
  //   {
  // let user=this.loginForm.value;
  // this.isLoggedIn=false;
  // this.authService.removeToken();
  // this.alerts=[];
  // console.log(user);
  //     this.authService.ValidateUser(user)
  //         .subscribe((result) => {
  //           this.globalResponse = result;
  //         },
  //         error => { //This is error part
  //           console.log(error.message);
  //           this.alerts.push({
  //             id: 2,
  //             type: 'danger',
  //             message: 'Either user name or password is incorrect.'
  //           });
  //         },
  //         () => {
  //             //  This is Success part
  //             console.log(this.globalResponse);
  //             this.authService.storeToken(this.globalResponse.access_token);
  //             this.alerts.push({
  //               id: 1,
  //               type: 'success',
  //               message: 'Login successful. Now you can close and proceed further.',
  //             });
  //             this.isLoggedIn=true;
  //             this.GetClaims();

  //             }
  //           )
  //         }
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
