import { Component, OnInit } from '@angular/core';
import { WebpageService } from '../shared/webpage.service';
import { NgForm } from '@angular/forms';
import { Webpage } from '../shared/webpage.model';
import { NgForOf } from '@angular/common';
import { from, Observable } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  WebContentArray: string[];

  constructor(public service: WebpageService) {}

  ngOnInit(): void {
    this.resetForm();
    this.service.getWebPageContent();
    this.setWebContentToArray();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      UserID: null,
      Header: '',
      HeroImageURL: '',
      Textbox1: '',
      Textbox2: '',
      Textbox3: '',
      Textbox4: '',
      Textbox5: '',
      Textbox6: '',
      GalleryImageURL: '',
      Footer: '',
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.UserID == null) this.insertRecord(form);
    else this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postWebPageContent(form.value).subscribe((res) => {
      this.resetForm(form);
      this.service.getWebPageContent();
    });
  }

  populateForm(item: Webpage) {
    //this.service.formData = item;
    this.service.formData = Object.assign({}, item);
  }

  updateRecord(form: NgForm) {
    this.service.putWebPageContent(form.value).subscribe((res) => {
      this.resetForm(form);
      this.service.getWebPageContent();
    });
  }

  onDelete(id: number) {
    this.service.deleteWebPageContent(id).subscribe((res) => {
      this.service.getWebPageContent();
    });
  }

  // newHeroImage = this.setWebContentToArray();

  myHeroImage = {
    height: '1000px',
    //   width: '1500px',
    //   'background-image': this.newHeroImage,
    //   'background-attachment': 'fixed',
  };

  setWebContentToArray() {
    this.service.getWebPageHeroImage().subscribe((res) => {
      this.WebContentArray = res as string[];

      var webContent = this.WebContentArray.map(function (item) {
        return item['HeroImageURL'];
      });
      console.log(webContent);
    });
  }
}
