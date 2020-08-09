import { Component, OnInit } from '@angular/core';
import { CustomPageService } from '../services/custom-page.service';
import { CustomPage } from '../models/custom-page.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public customPageService: CustomPageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  customPageArray: CustomPage[];

  ngOnInit(): void {
    //grab custom page data on navbar load
    this.callCustomPageService();
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
