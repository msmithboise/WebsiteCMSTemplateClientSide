import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

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
      console.log('You are not authorized to view this page');
      return false;
    }
    return true;
  }
}
