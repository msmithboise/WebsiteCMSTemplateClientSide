import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomImageService } from '../services/custom-image.service';
import { Webcontent } from '../WebContent/webcontent.model';
import { WebcontentService } from '../WebContent/webcontent.service';

@Component({
  selector: 'app-style-settings',
  templateUrl: './style-settings.component.html',
  styleUrls: ['./style-settings.component.css'],
})
export class StyleSettingsComponent implements OnInit {
  public textId = +this.route.snapshot.paramMap.get('textId');

  constructor(
    public webContentService: WebcontentService,
    public customImageService: CustomImageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.grabAllContentByTextId();
  }

  grabAllContentByTextId() {
    this.webContentService
      .getEditContentById(this.textId)
      .subscribe((res: Webcontent[]) => {
        this.webContentService.webContentByIdArray = res;
        console.log('res by using text id');
        console.log(res);
        // console.log('Here is the images based on page id: ');
        // console.log(this.imagesByPageIdArray);
      });
  }

  onEditSubmit(form: NgForm) {
    this.insertEditSettings(form);
  }

  insertEditSettings(form: NgForm) {
    console.log('form and id:');
    console.log(form);

    this.webContentService.postEditContentById(form.value).subscribe((res) => {
      //this.resetForm(form);
      this.grabAllContentByPageId();
    });
  }

  grabAllContentByPageId() {
    this.customImageService
      .getWebContentByPageId(this.webContentService.pageIdSnapshot)
      .subscribe((res: Webcontent[]) => {
        this.webContentService.webContentArray = res;
        console.log('here is the content array:');
        console.log(this.webContentService.webContentArray);

        // console.log('Here is the images based on page id: ');
        // console.log(this.imagesByPageIdArray);
      });
  }
}
