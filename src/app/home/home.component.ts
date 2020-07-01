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
  WebContentArray: string[];
  newHeroImageUrl: string;

  constructor(public service: WebpageService) {}

  ngOnInit(): void {
    this.resetForm();
    this.service.getWebPageContent();
    // this.asyncCall();
    this.getImageCall();
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

  //need to set await before properties are assigned to myHeroImage

  myHeroImage = {
    height: '1000px',
    //   width: '1500px',
    'background-image': '',
    'background-attachment': 'fixed',
  };

  async getImage() {
    //saying this newHeroImageUrl value will be set to the response that service.getHeroImageUrl() retrieves
    //'I am first (I get the data)');
    var data = await this.service.getHeroImageUrl();
    //console.log('Data before it is passed to assignVariable function:');
    //console.log(data);

    this.assignVariable(data);
  }

  assignVariable(data: Object) {
    // console.log('I am second (I assign the data to a property)');
    //console.log('Data after first being passed: ');
    //console.log(data);

    //console.log('Data after being stringified:');
    var parsedData = JSON.parse(JSON.stringify(data));

    // console.log('Attempting to access the array...');
    //console.log(parsedData.HeroImageURL);

    //console.log('Assigning variable...');
    this.newHeroImageUrl = parsedData.HeroImageURL;
  }
  async getImageCall() {
    await this.getImage();
    console.log('Here is the image url: ');
    console.log(this.newHeroImageUrl);

    //this.myHeroImage['background-image'] = this.newHeroImageUrl;
    this.myHeroImage['background-image'] =
      'https://images.unsplash.com/photo-1537301696988-4a82a4959466?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';

    console.log(this.myHeroImage['background-image']);

    //'background-image': 'url(' + this.newHeroImageUrl + ')',
    //might need to manipulate this string to remove "HeroImageURL": from it
  }
}
