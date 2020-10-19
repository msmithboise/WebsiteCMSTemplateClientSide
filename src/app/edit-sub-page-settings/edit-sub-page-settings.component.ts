import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Subpage } from '../models/subpage.model';
import { SubpageService } from '../services/subpage.service';

@Component({
  selector: 'app-edit-sub-page-settings',
  templateUrl: './edit-sub-page-settings.component.html',
  styleUrls: ['./edit-sub-page-settings.component.css'],
})
export class EditSubPageSettingsComponent implements OnInit {
  pageDescription: string;
  pageId: number;

  selectedDescription;
  constructor(
    public subPageService: SubpageService,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.pageDescription = this.route.snapshot.paramMap.get('pageDescription');
    console.log(this.pageDescription);
    this.pageId = Number(this.route.snapshot.paramMap.get('pageId'));
    console.log(this.pageId);
  }

  addNewSubPage(form: NgForm) {
    this.subPageService
      .createSubPage(form.value)
      .subscribe((res: Subpage[]) => {
        this.subPageService.subPageArray = res;
        this.getSubPages();
        this.toastr.success('Page created!');
        console.log('is this being calleD?');
      });
  }

  getSubPages() {
    this.subPageService.getSubPages().subscribe((res: Subpage[]) => {
      this.subPageService.subPageArray = res;

      console.log(this.subPageService.subPageArray);
    });
  }
}
