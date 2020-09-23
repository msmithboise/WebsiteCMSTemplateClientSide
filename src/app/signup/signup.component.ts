import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user: User;
  constructor(public userService: UserService) {}

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
    };
  }

  onSubmit(form: NgForm) {
    console.log('submitting registration...');
    console.log(form);
    this.postNewRegistration(form);
  }
  getAllUserData() {
    this.userService.setUserDataToUserArray();
  }

  grabAllUserData() {
    this.userService.getUserData().subscribe((res: User[]) => {
      console.log(res);
      this.userService.userArray = res;

      // console.log('Here is the images based on page id: ');
      // console.log(this.imagesByPageIdArray);
    });
  }
  postNewRegistration(form: NgForm) {
    this.userService
      .postRegistrationData(form.value)
      .subscribe((res: User[]) => {
        this.userService.userArray = res;
        this.resetForm();
      });
  }
}
