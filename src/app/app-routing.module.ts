import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomPageComponent } from './customPage/custom-page/custom-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'customPage/:pageDescription/:pageId',
    component: CustomPageComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  //for adding auth guard:
  // {path:"admin", component: AdminComponent, canActivate:[AuthGuardComponent]}
];

// const AppRouting: Routes = [
//   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'users', loadChildren: () => UsersModule  }
//   { path: '**', component: DashboardComponent }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
