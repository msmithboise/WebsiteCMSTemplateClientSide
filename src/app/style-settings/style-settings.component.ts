import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  public pageDescription: string;
  public pageId: number;
  public subPageDescription: string;
  public subPageId: number;

  constructor(
    public webContentService: WebcontentService,
    public customImageService: CustomImageService,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public router: Router
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

  navigateToPageSettings() {
    this.router.navigate(['/edit-page/']);
  }

  onEditSubmit(form: NgForm) {
    this.insertEditSettings(form);
  }

  insertEditSettings(form: NgForm) {
    console.log('form and id:');
    console.log(form);

    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
      this.pageDescription = params.pageDescription;
      this.subPageDescription = params.subPageDescription;
      this.subPageId = params.subPageId;
    });

    this.webContentService.postEditContentById(form.value).subscribe((res) => {
      //this.resetForm(form);
      this.toastr.success('Edited content succesfully!');
      this.grabAllContentByPageId();

      if (this.subPageId == null) {
        this.router.navigate([
          '/dashboard/' + this.pageDescription + '/' + this.pageId,
        ]);
      } else {
        this.router.navigate([
          '/dashboard/' +
            this.pageDescription +
            '/' +
            this.pageId +
            '/' +
            this.subPageDescription +
            '/' +
            this.subPageId,
        ]);
      }
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
