import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { CustomPageService } from './services/custom-page.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public customPageService: CustomPageService,
    public route: ActivatedRoute
  ) {}

  // For each element in custom page array
  // if page entered does not match the page number within the array
  // redirect to a 404 page

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['pagenotfound']);
      return false;
    }

    return true;
  }
}
