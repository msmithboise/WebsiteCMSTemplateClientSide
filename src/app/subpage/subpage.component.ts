import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SubpageService } from '../services/subpage.service';
import { Webcontent } from '../WebContent/webcontent.model';
import { WebcontentService } from '../WebContent/webcontent.service';

@Component({
  selector: 'app-subpage',
  templateUrl: './subpage.component.html',
  styleUrls: ['./subpage.component.css'],
})
export class SubpageComponent implements OnInit {
  constructor(
    public subPageService: SubpageService,
    public webContentService: WebcontentService
  ) {}

  ngOnInit(): void {
    this.getSubPageAllContent();
  }

  subTextContentForm = new FormGroup({
    SubPageId: new FormControl(''),
    PageId: new FormControl(''),
    TextBody: new FormControl(''),
  });

  getSubPageAllContent() {
    this.subPageService.getAllSubContent().subscribe((res: Webcontent[]) => {
      this.subPageService.subPageContentArray = res;
      console.log('getting all webcontent for sorting');
      console.log(res);
    });
  }

  getSubPageContentByIds(pageId: number, subPageId: number) {
    this.subPageService
      .getSubContentByIds(pageId, subPageId)
      .subscribe((res: Webcontent[]) => {
        this.subPageService.subPageContentArray = res;
        console.log('getting all webcontent for sorting');
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
