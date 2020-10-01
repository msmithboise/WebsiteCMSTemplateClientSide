import { Component, OnInit } from '@angular/core';
import { CustomPageService } from '../services/custom-page.service';
import { CustomPage } from '../models/custom-page.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public url =
    'https://images.unsplash.com/photo-1584553421349-3557471bed79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1329&q=80';
  public photo = this.sanitizer.bypassSecurityTrustStyle('url(+ url +)');
  public testColor = 'green';

  constructor(
    public customPageService: CustomPageService,
    private router: Router,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {}

  customPageArray: CustomPage[];

  ngOnInit(): void {
    //grab custom page data on navbar load
    this.callCustomPageService();
    this.changePhoto();
  }

  navFontStyling = {
    color: this.testColor,
  };

  logoStyling = {
    backgroundImage: this.photo,
    width: '200px',
    height: '50px',
    backgroundSize: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  changePhoto() {
    this.photo =
      'https://images.unsplash.com/photo-1584553421349-3557471bed79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1329&q=80';
  }
  //Set Custom Page data to customPage service array
  callCustomPageService() {
    this.customPageService
      .getCustomPageContent()
      .subscribe((res: CustomPage[]) => {
        this.customPageService.customPageArray = res;
      });
  }

  onClick(pageId: string, pageDescription: string) {
    this.router.navigate(['/customPage', pageDescription, pageId]);

    this.customPageService.selectPageId(pageId);
  }
}
