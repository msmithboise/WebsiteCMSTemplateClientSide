import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomPageComponent } from './customPage/custom-page/custom-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';
import { PageSettingsComponent } from './page-settings/page-settings.component';
import { StyleSettingsComponent } from './style-settings/style-settings.component';
import { EditPageSettingsComponent } from './edit-page-settings/edit-page-settings.component';
import { EditSubPageSettingsComponent } from './edit-sub-page-settings/edit-sub-page-settings.component';
import { SubpageComponent } from './subpage/subpage.component';
import { SubpageDashboardComponent } from './subpage-dashboard/subpage-dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'customPage/:pageDescription/:pageId',
    component: CustomPageComponent,
  },
  {
    path: ':pageDescription/:pageId',
    component: CustomPageComponent,
  },

  { path: 'portal', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'edit-page', component: EditPageSettingsComponent },
  {
    path: 'edit-sub-page/:pageDescription/:pageId',
    component: EditSubPageSettingsComponent,
  },
  { path: 'style-settings/:textId', component: StyleSettingsComponent },
  {
    path: 'style-settings/:pageDescription/:pageId/:textId',
    component: StyleSettingsComponent,
  },
  {
    path: 'settings/:pageId',
    component: PageSettingsComponent,
  },
  {
    path: 'settings/:pageDescription/:pageId',
    component: PageSettingsComponent,
  },
  {
    path:
      'settings/:pageDescription/:pageId/:subPage/:subPageDescription/:subPageId',
    component: SubpageDashboardComponent,
  },
  {
    path: 'subPage/:subPageDescription/:subPageId',
    component: SubpageComponent,
  },

  {
    path:
      'customPage/:pageDescription/:pageId/:subPage/:subPageDescription/:subPageId',
    component: SubpageComponent,
  },

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
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
