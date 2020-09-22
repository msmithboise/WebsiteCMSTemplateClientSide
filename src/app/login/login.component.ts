import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService) {}

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
}
