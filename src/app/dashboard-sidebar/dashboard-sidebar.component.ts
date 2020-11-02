import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomPage } from '../models/custom-page.model';
import { Subpage } from '../models/subpage.model';
import { CustomPageService } from '../services/custom-page.service';
import { SubpageService } from '../services/subpage.service';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css'],
})
export class DashboardSidebarComponent implements OnInit {
  public pageDescription: string;
  public pageId: number;

  constructor(
    private route: ActivatedRoute,
    public customPageService: CustomPageService,
    public router: Router,
    public subPageService: SubpageService
  ) {}

  ngOnInit(): void {
    this.callCustomPageService();
    this.callCustomSubPageService();
  }

  openNavBarSettings() {
    // console.log('navbar settings page');
    this.router.navigate(['/navbar-settings/']);
  }

  callCustomSubPageService() {
    this.subPageService.getSubPages().subscribe((res: Subpage[]) => {
      this.subPageService.subPageArray = res;
      // console.log('subpages');
      // console.log(res);
    });
  }

  callCustomPageService() {
    this.customPageService
      .getCustomPageContent()
      .subscribe((res: CustomPage[]) => {
        this.customPageService.customPageArray = res;
      });
  }

  dashboardSubNav(
    pageDescription: string,
    pageId: number,
    subPageDescription: string,
    subPageId: number
  ) {
    this.router.navigate([
      '/dashboard/' +
        pageDescription +
        '/' +
        pageId +
        '/' +
        subPageDescription +
        '/' +
        subPageId,
    ]);
    console.log('subpage dashboard');
    console.log(
      'dashboard/' +
        pageDescription +
        '/' +
        pageId +
        '/' +
        subPageDescription +
        '/' +
        subPageId
    );
  }

  subPageNav(
    pageDescription: string,
    pageId: number,
    subPageDescription: string,
    subPageId: number
  ) {
    // console.log('sub id');
    // console.log(subPageId);

    this.router.navigate([
      pageDescription +
        '/' +
        pageId +
        '/' +
        subPageDescription +
        '/' +
        subPageId,
    ]);
    console.log('subpage navigation');
  }
  dashboardMainNav(pageDescription: string, pageId: number) {
    // console.log('main page nav');
    // console.log(pageDescription, pageId);

    this.router.navigate(['dashboard/' + pageDescription + '/' + pageId]);
  }

  mainPageNav(pageDescription: string, pageId: number) {
    // console.log('main page nav');
    // console.log(pageDescription, pageId);

    this.router.navigate([pageDescription + '/' + pageId]);
  }

  goBack() {
    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
      this.pageDescription = params.pageDescription;

      this.router.navigate([this.pageDescription + '/' + this.pageId]);
    });
  }

  openPageSettings() {
    // console.log('opened page settings.');

    this.router.navigate(['/edit-page/']);
  }
}
