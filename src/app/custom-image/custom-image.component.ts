import { Component, OnInit } from '@angular/core';
import { CustomImageService } from '../services/custom-image.service';
import { CustomImage } from '../models/custom-image.model';
import { ActivatedRoute } from '@angular/router';
import { WebStructureService } from '../web-structure.service';

@Component({
  selector: 'app-custom-image',
  templateUrl: './custom-image.component.html',
  styleUrls: ['./custom-image.component.css'],
})
export class CustomImageComponent implements OnInit {
  constructor(
    public customImageService: CustomImageService,
    public webStructureService: WebStructureService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.callCustomImageService();
  }

  callCustomImageService() {
    this.customImageService
      .getCustomImageContent()
      .subscribe((res: CustomImage[]) => {
        this.webStructureService.getRequests++;
        console.log('custom-image: callCustomImageService');

        this.customImageService.customImageArray = res;
      });
  }
}
