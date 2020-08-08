import { Component, OnInit } from '@angular/core';
import { CustomPageService } from 'src/app/services/custom-page.service';
import { CustomPage } from 'src/app/models/custom-page.model';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.css'],
})
export class CustomPageComponent implements OnInit {
  constructor(public customPageService: CustomPageService) {}

  customPageArray: CustomPage[];

  ngOnInit(): void {
    this.callCustomPageService();
  }

  callCustomPageService() {
    this.customPageService
      .getCustomPageContent()
      .subscribe((res: CustomPage[]) => {
        this.customPageArray = res;
        console.log('here is your component array');
        console.log(this.customPageArray);
      });
  }
}
