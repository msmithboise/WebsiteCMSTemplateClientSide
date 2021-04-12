import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { WebStructureService } from '../web-structure.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user: User;
  constructor(
    public userService: UserService,
    public router: Router,
    public toastr: ToastrService,
    public webStructureService: WebStructureService
  ) {}

  ngOnInit(): void {
    this.resetForm();
    this.grabAllUserData();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.reset();
    this.user = {
      Id: null,
      Username: '',
      FirstName: '',
      LastName: '',
      EmailAddress: '',
      Organization: '',
      Hash: '',
      Salt: '',
      HashByte: null,
      Token: '',
      isLoggedIn: false,
      timeLoggedIn: null,
      timeLoggedOut: null,
      isLoggedInString: '',
      isPasswordHashed: false,
    };
  }

  onSubmit(form: NgForm) {
    this.postNewRegistration(form);
  }
  getAllUserData() {
    this.userService.setUserDataToUserArray();
    console.log('signup: getAllUserData');
    this.webStructureService.getRequests++;
  }

  grabAllUserData() {
    this.userService.getUserData().subscribe((res: User[]) => {
      console.log('signup: grabAllUserData');
      this.webStructureService.getRequests++;
      this.userService.userArray = res;
    });
  }
  postNewRegistration(form: NgForm) {
    this.userService
      .postRegistrationData(form.value)
      .subscribe((res: User[]) => {
        this.userService.userArray = res;
        this.router.navigate(['portal']);
        this.toastr.success('Registration Succesful!');
        this.resetForm();
      });
  }
}
