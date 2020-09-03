import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WebpageService } from './shared/webpage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent, TextboxComponent, CustomPageComponent, CustomImageComponent, CustomTextComponent, CustomTextModalComponent, WebcontentComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [WebpageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
