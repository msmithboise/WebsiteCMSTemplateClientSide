import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomImageService } from '../services/custom-image.service';
import { DashboardPresetService } from '../services/dashboard-preset.service';
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
    public router: Router,
    public dashboardPresetService: DashboardPresetService
  ) {}

  ngOnInit(): void {
    this.grabAllContentByTextId();
    this.getAllPresets();
  }

  getAllPresets() {
    this.dashboardPresetService.getAllPresets().subscribe((res) => {
      console.log('getting presets...');

      this.dashboardPresetService.dashboardPresetArray = res;
      console.log(
        'presets:  ',
        this.dashboardPresetService.dashboardPresetArray
      );
    });
  }

  grabAllContentByTextId() {
    this.webContentService
      .getEditContentById(this.textId)
      .subscribe((res: Webcontent[]) => {
        console.log('style-settings: grabAllContentByTextId');
        this.webStructureService.getRequests++;
        this.webContentService.webContentByIdArray = res;
        console.log(
          'this.webContentByIdArray',
          this.webContentService.webContentByIdArray
        );
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
        console.log('style-settings: grabAllContentByPageId');
        this.webStructureService.getRequests++;
        this.webContentService.webContentArray = res;
        console.log(this.webContentService.webContentArray);
      });
  }
}
