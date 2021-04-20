import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
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
import { TestComponent } from './test/test.component';
import { ColumnViewComponent } from './column-view/column-view.component';
import { RowViewComponent } from './row-view/row-view.component';
import { ContentViewComponent } from './content-view/content-view.component';
import { ButtonPanelComponent } from './button-panel/button-panel.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './auth-guard.service';
import { NullPageGuardService } from './null-page-guard.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SettingsTabsComponent } from './settings-tabs/settings-tabs.component';
import { EditModeComponent } from './edit-mode/edit-mode.component';
import { DragulaModule } from 'ng2-dragula';

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
    TestComponent,
    ColumnViewComponent,
    RowViewComponent,
    ContentViewComponent,
    ButtonPanelComponent,
    NewsComponent,
    PageNotFoundComponent,
    SidenavComponent,
    SettingsTabsComponent,
    EditModeComponent,
  ],
  imports: [
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    DragulaModule.forRoot(),
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,

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
  providers: [
    WebpageService,
    SafePipe,
    AuthGuardComponent,
    AuthGuardService,
    NullPageGuardService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
