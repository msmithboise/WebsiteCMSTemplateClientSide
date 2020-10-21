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

  ngOnInit(): void {}

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

  postSubPageContentByIds(subTextContentForm: FormGroup) {
    var newForm = subTextContentForm.value;

    this.subPageService
      .getSubContentByIds(newForm)
      .subscribe((res: Webcontent[]) => {
        this.subPageService.subPageContentByIdsArray = res;

        // console.log('Here is the images based on page id: ');
        // console.log(this.imagesByPageIdArray);
      });
  }
}
