import { Component, OnInit } from '@angular/core';
import { WebpageService } from '../shared/webpage.service';
import { NgForm } from '@angular/forms';
import { Webpage } from '../shared/webpage.model';
import { NgForOf, JsonPipe } from '@angular/common';
import { from, Observable } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';
import { promise, Key } from 'protractor';
import { Console } from 'console';
import { parse } from 'path';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  WebContentArray: Webpage[];
  newHeroImageUrl: string;
  newHeader: string;

  constructor(public service: WebpageService) {}

  ngOnInit(): void {
    this.resetForm();
    this.service.getWebPageContent();
    this.showWebContentList();
    //this.populateFormOnLoad();
    //this.manageWebContentArray();
    this.editContentCss();
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
      //this.resetForm(form);
      this.service.getWebPageContent();
    });
  }

  populateForm(item: Webpage) {
    this.service.formData = item;
    //this.service.formData = Object.assign({}, item);
  }

  populateFormOnLoad() {
    this.service.formData = {
      UserID: this.WebContentArray[0].UserID,
      Header: this.WebContentArray[0].Header,
      HeroImageURL: this.WebContentArray[0].HeroImageURL,
      Textbox1: this.WebContentArray[0].Textbox1,
      Textbox2: this.WebContentArray[0].Textbox2,
      Textbox3: this.WebContentArray[0].Textbox3,
      Textbox4: this.WebContentArray[0].Textbox4,
      Textbox5: this.WebContentArray[0].Textbox5,
      Textbox6: this.WebContentArray[0].Textbox5,
      GalleryImageURL: this.WebContentArray[0].GalleryImageURL,
      Footer: this.WebContentArray[0].Footer,
    };
  }

  //use camel case instead of dashes.. example text-align would need to be textAlign

  myTextBox = {
    color: '',
    fontSize: '',
    textAlign: '',
  };

  myHeroImage = {
    height: '',
    width: '',
    backgroundPosition: '',
    opacity: '',
    backgroundSize: '',
    position: '',
  };

  editContentCss() {
    this.changeTextBoxOneStyling();
    this.changeHeroImageStyling();
  }

  changeTextBoxOneStyling() {
    this.myTextBox.color = 'blue';
    this.myTextBox.fontSize = '40px';
    this.myTextBox.textAlign = 'center';
  }

  changeHeroImageStyling() {
    //this.myHeroImage.height = '1000px';
    //this.myHeroImage.width = '3000px';
    //this.myHeroImage.backgroundPosition = 'center';
    //this.myHeroImage.opacity = '0.9';
    //this.myHeroImage.backgroundSize = 'cover';
    this.myHeroImage.position = 'relative';
  }

  updateRecord(form: NgForm) {
    this.service.putWebPageContent(form.value).subscribe((res) => {
      //this.resetForm(form);
      this.service.getWebPageContent();
    });
  }

  onDelete(id: number) {
    this.service.deleteWebPageContent(id).subscribe((res) => {
      this.service.getWebPageContent();
    });
  }

  showWebContentList() {
    this.service.getContent().subscribe((res: Webpage[]) => {
      this.WebContentArray = res;
      console.log('the data set to the web content array');
      console.log(this.WebContentArray);
      this.manageWebContentArray();
    });
  }

  manageWebContentArray() {
    console.log('should be filled with properties');
    console.log(this.WebContentArray[0].Header);

    this.populateFormOnLoad();
  }
}
