import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubpageService } from '../services/subpage.service';
import { Webcontent } from '../WebContent/webcontent.model';
import { WebcontentService } from '../WebContent/webcontent.service';

@Component({
  selector: 'app-subpage',
  templateUrl: './subpage.component.html',
  styleUrls: ['./subpage.component.css'],
})
export class SubpageComponent implements OnInit {
  public pageDescription: string;
  public pageId: number;
  public subPageDescription: string;
  public subPageId: number;
  constructor(
    public subPageService: SubpageService,
    public webContentService: WebcontentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getSubPageAllContent();
    this.grabPageIdInfo();
  }

  grabPageIdInfo() {
    this.pageDescription = this.route.snapshot.paramMap.get('pageDescription');
    console.log(this.pageDescription);
    this.pageId = Number(this.route.snapshot.paramMap.get('pageId'));
    console.log(this.pageId);
    this.subPageDescription = this.route.snapshot.paramMap.get(
      'subPageDescription'
    );
    console.log(this.subPageDescription);
    this.subPageId = Number(this.route.snapshot.paramMap.get('subPageId'));
    console.log(this.subPageId);
  }

  subTextContentForm = new FormGroup({
    SubPageId: new FormControl(''),
    PageId: new FormControl(''),
    TextBody: new FormControl(''),
  });

  getContent() {
    this.getSubPageContentByIds(this.pageId, this.subPageId);
  }

  getSubPageAllContent() {
    this.subPageService.getAllSubContent().subscribe((res: Webcontent[]) => {
      this.subPageService.subPageContentArray = res;
      console.log('getting all webcontent for sorting');
      console.log(res);
    });
  }

  getSubPageContentByIds(pageId: number, subPageId: number) {
    pageId = this.pageId;
    subPageId = this.subPageId;
    console.log('making sure these are right');
    console.log('pageid');
    console.log(this.pageId);
    console.log('subpageid');
    console.log(this.subPageId);
    this.subPageService
      .getSubContentByIds(pageId, subPageId)
      .subscribe((res: Webcontent[]) => {
        this.subPageService.subPageContentArray = res;
        console.log('getting content by page and sub page id..');
        console.log(res);
      });
  }

  onSubmit(form: FormGroup) {
    console.log('form');
    console.log(form);
    this.postSubPageContentByIds(form);
  }

  postSubPageContentByIds(subTextContentForm: FormGroup) {
    var newForm = subTextContentForm.value;
    newForm.PageId = this.pageId;
    newForm.SubPageId = this.subPageId;

    console.log('newform:');
    console.log(newForm);

    this.subPageService
      .postSubContentByIds(newForm)
      .subscribe((res: Webcontent[]) => {
        this.subPageService.subPageContentByIdsArray = res;
        console.log(this.subPageService.subPageContentByIdsArray);
        // console.log('Here is the images based on page id: ');
        // console.log(this.imagesByPageIdArray);
      });
  }
}
