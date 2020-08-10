import { Component, OnInit } from '@angular/core';
import { CustomImageService } from '../services/custom-image.service';
import { CustomImage } from '../models/custom-image.model';

@Component({
  selector: 'app-custom-image',
  templateUrl: './custom-image.component.html',
  styleUrls: ['./custom-image.component.css'],
})
export class CustomImageComponent implements OnInit {
  constructor(public customImageService: CustomImageService) {}

  ngOnInit(): void {
    this.callCustomImageService();
  }

  callCustomImageService() {
    this.customImageService
      .getCustomImageContent()
      .subscribe((res: CustomImage[]) => {
        this.customImageService.customImageArray = res;
        console.log('here is your custom image array: ');
        console.log(this.customImageService.customImageArray);
      });
  }
}
