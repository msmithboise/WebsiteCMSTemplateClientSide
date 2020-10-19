import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selectedDescription;
  constructor(
    public subPageService: SubpageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.pageDescription = this.route.snapshot.paramMap.get('pageDescription');
    console.log(this.pageDescription);
  }

  getSubPages(pageId: number, pageDescription: string) {
    this.subPageService.getSubPages().subscribe((res: Subpage[]) => {
      this.subPageService.subPageArray = res;

      console.log(this.subPageService.subPageArray);
    });
  }
}
