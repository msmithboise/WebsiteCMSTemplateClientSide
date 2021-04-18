import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomPage } from '../models/custom-page.model';
import { Subpage } from '../models/subpage.model';
import { CustomPageService } from '../services/custom-page.service';
import { SubpageService } from '../services/subpage.service';
import { WebStructureService } from '../web-structure.service';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css'],
})
export class DashboardSidebarComponent implements OnInit {
  @Input() colorFour: string;
  @Input() colorFive: string;
  @Input() colorSix: string;
  @Input() FontFamily: string;

  public pageDescription: string;
  public pageId: number;

  constructor(
    private route: ActivatedRoute,
    public customPageService: CustomPageService,
    public router: Router,
    public subPageService: SubpageService,
    public webStructureService: WebStructureService
  ) {}

  ngOnInit(): void {
    this.callCustomPageService();
    this.callCustomSubPageService();
  }

  openNavBarSettings() {
    this.router.navigate(['/navbar-settings/']);
  }

  callCustomSubPageService() {
    this.subPageService.getSubPages().subscribe((res: Subpage[]) => {
      console.log('custom-page: callCustomSubPageService');
      this.webStructureService.getRequests++;
      this.subPageService.subPageArray = res;
    });
  }

  callCustomPageService() {
    this.customPageService.getCustomPageContent();
    console.log('dashboard-sidebar: callCustomPageService');
    this.webStructureService.getRequests++;
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
  }

  subPageNav(
    pageDescription: string,
    pageId: number,
    subPageDescription: string,
    subPageId: number
  ) {
    this.router.navigate([
      pageDescription +
        '/' +
        pageId +
        '/' +
        subPageDescription +
        '/' +
        subPageId,
    ]);
  }
  dashboardMainNav(pageDescription: string, pageId: number) {
    this.router.navigate(['dashboard/' + pageDescription + '/' + pageId]);
  }

  mainPageNav(pageDescription: string, pageId: number) {
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
    this.router.navigate(['/edit-page/']);
  }
}
