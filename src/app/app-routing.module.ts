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
import { NavbarSettingsComponent } from './navbar-settings/navbar-settings.component';
import { GridComponent } from './grid/grid.component';
import { TestComponent } from './test/test.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { NullPageGuardService as NullPageGuard } from '../app/null-page-guard.service';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  //For test
  {
    path: '',
    redirectTo: '/Home/1031',
    pathMatch: 'full',
    canActivate: [NullPageGuard],
  },

  //for hindsitedevelopment
  // {
  //   path: '',
  //   redirectTo: '/Home/9',
  //   pathMatch: 'full',
  //   canActivate: [NullPageGuard],
  // },

  //for riveroflife
  // {
  //   path: '',
  //   redirectTo: '/Home/1',
  //   pathMatch: 'full',
  //   canActivate: [NullPageGuard],
  // },

  //for freedomstartsnow
  // {
  //   path: '',
  //   redirectTo: '/Home/13',
  //   pathMatch: 'full',
  //   canActivate: [NullPageGuard],
  // },
  {
    path: 'customPage/:pageDescription/:pageId',
    component: CustomPageComponent,
    canActivate: [NullPageGuard],
  },

  {
    path: ':pageDescription/:pageId',
    component: CustomPageComponent,
    canActivate: [NullPageGuard],
  },

  { path: 'portal', component: LoginComponent },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  {
    path: 'edit-page',
    component: EditPageSettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'news',
    component: NewsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'navbar-settings',
    component: NavbarSettingsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'grid', component: GridComponent },
  { path: 'test', component: TestComponent },

  {
    path: 'edit-sub-page/:pageDescription/:pageId',
    component: EditSubPageSettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'style-settings/:textId',
    component: StyleSettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path:
      'style-settings/:pageDescription/:pageId/:subPageDescription/:subPageId/:textId',
    component: StyleSettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'style-settings/:pageDescription/:pageId/:columnId/:textId',
    component: StyleSettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'style-settings/:pageDescription/:pageId/:textId',
    component: StyleSettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings/:pageId',
    component: PageSettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'navbar-settings/:pageDescription/:pageId',
    component: NavbarSettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings/:pageDescription/:pageId',
    component: PageSettingsComponent,
    canActivate: [AuthGuard],
  },

  {
    path:
      'dashboard/:pageDescription/:pageId/:subPage/:subPageDescription/:subPageId',
    component: SubpageDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path:
      'settings/:pageDescription/:pageId/:subPage/:subPageDescription/:subPageId',
    component: SubpageDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/:pageDescription/:pageId/:subPageDescription/:subPageId',
    component: SubpageDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'subPage/:subPageDescription/:subPageId',
    component: SubpageComponent,
  },

  {
    path: ':pageDescription/:pageId/:subPageDescription/:subPageId',
    component: SubpageComponent,
  },

  {
    path:
      'customPage/:pageDescription/:pageId/:subPage/:subPageDescription/:subPageId',
    component: SubpageComponent,
  },
  //for adding auth guard:
  {
    path: 'dashboard/:pageDescription/:pageId',
    component: PageSettingsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'pagenotfound', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page

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
