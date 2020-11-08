import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WebpageService } from './shared/webpage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatSliderModule } from '@angular/material/slider';
import { NavbarComponent } from './navbar/navbar.component';
import { TextboxComponent } from './components/textbox/textbox.component';
import { CustomPageComponent } from './customPage/custom-page/custom-page.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomImageComponent } from './custom-image/custom-image.component';
import { CustomTextComponent } from './custom-text/custom-text.component';
import { CustomTextModalComponent } from './modals/custom-text-modal/custom-text-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WebcontentComponent } from './WebContent/webcontent/webcontent.component';
import { CustomPageModalComponent } from './modals/custom-page-modal/custom-page-modal.component';
import { EditContentModalComponent } from './modals/edit-content-modal/edit-content-modal.component';
import { SafePipe } from './safe.pipe';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';
import { ResizableDraggableComponent } from './resizable-draggable/resizable-draggable.component';
import { BackgroundFadeInDirective } from './background-fade-in.directive';
import { SubpageComponent } from './subpage/subpage.component';
import { PageSettingsComponent } from './page-settings/page-settings.component';
import { StyleSettingsComponent } from './style-settings/style-settings.component';
import { EditPageSettingsComponent } from './edit-page-settings/edit-page-settings.component';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';
import { EditSubPageSettingsComponent } from './edit-sub-page-settings/edit-sub-page-settings.component';
import { SubpageDashboardComponent } from './subpage-dashboard/subpage-dashboard.component';
import { NavbarSettingsComponent } from './navbar-settings/navbar-settings.component';
import { DashboardBaseComponent } from './dashboard-base/dashboard-base.component';
import { GridComponent } from './grid/grid.component';
import { GridChildComponent } from './grid-child/grid-child.component';
import { RowComponent } from './row/row.component';
import { ColumnComponent } from './column/column.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TextboxComponent,
    CustomPageComponent,
    CustomImageComponent,
    CustomTextComponent,
    CustomTextModalComponent,
    WebcontentComponent,
    CustomPageModalComponent,
    EditContentModalComponent,
    SafePipe,
    LoginComponent,
    SignupComponent,
    AuthGuardComponent,
    ResizableDraggableComponent,
    BackgroundFadeInDirective,
    SubpageComponent,
    PageSettingsComponent,
    StyleSettingsComponent,
    EditPageSettingsComponent,
    DashboardSidebarComponent,
    EditSubPageSettingsComponent,
    SubpageDashboardComponent,
    NavbarSettingsComponent,
    DashboardBaseComponent,
    GridComponent,
    GridChildComponent,
    RowComponent,
    ColumnComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [WebpageService, SafePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
