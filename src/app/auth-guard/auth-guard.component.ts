import { Component, Injectable, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
@Component({
  selector: 'app-auth-guard',
  templateUrl: './auth-guard.component.html',
  styleUrls: ['./auth-guard.component.css'],
})
export class AuthGuardComponent implements CanActivate {
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      console.log('user not authenticated');
      //this.router.navigate(['**']);
      return false;
    }
    console.log('they are authenticated!');
    return true;
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   //If user shows a token, and that token matches the token stored for them, return true
  //   return false;
  // }
}
