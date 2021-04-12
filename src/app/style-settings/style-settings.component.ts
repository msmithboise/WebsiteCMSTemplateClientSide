import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomImageService } from '../services/custom-image.service';
import { WebStructureService } from '../web-structure.service';
import { Webcontent } from '../WebContent/webcontent.model';
import { WebcontentService } from '../WebContent/webcontent.service';

@Component({
  selector: 'app-style-settings',
  templateUrl: './style-settings.component.html',
  styleUrls: ['./style-settings.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StyleSettingsComponent implements OnInit {
  public textId = +this.route.snapshot.paramMap.get('textId');
  public pageDescription: string;
  public pageId: number;
  public subPageDescription: string;
  public subPageId: number;
  public columnId: number;

  constructor(
    public webContentService: WebcontentService,
    public webStructureService: WebStructureService,
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
        console.log('style-settings: grabAllContentByTextId');
        this.webStructureService.getRequests++;
        this.webContentService.webContentByIdArray = res;
      });
  }

  navigateToPageSettings() {
    this.router.navigate(['/edit-page/']);
  }

  onEditSubmit(form: NgForm) {
    this.insertEditSettings(form);
  }

  insertEditSettings(form: NgForm) {
    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
      this.pageDescription = params.pageDescription;
      this.subPageDescription = params.subPageDescription;
      this.subPageId = params.subPageId;
      this.columnId = params.columnId;
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
      });
  }
}
