import { Injectable } from '@angular/core';
import { Webpage } from './webpage.model';
import { HttpClient } from '@angular/common/http';
import { NgForOf } from '@angular/common';
import { kMaxLength } from 'buffer';
import { HomeComponent } from '../home/home.component';

@Injectable({
  providedIn: 'root',
})
export class WebpageService {
  formData: Webpage;
  webContentList: Webpage[];

  readonly rootURL = 'http://localhost:54704/api';
  imageUrl: string;

  constructor(public http: HttpClient) {}

  //Post
  postWebPageContent(formData: Webpage) {
    return this.http.post(this.rootURL + '/HomePage', formData);
  }

  //Get All
  getWebPageContent() {
    this.http
      .get(this.rootURL + '/HomePage')
      .toPromise()
      .then((res) => (this.webContentList = res as Webpage[]));
  }

  // async getPrice(currency: string): Promise<number> {
  //   const response = await this.http.get(this.currentPriceUrl).toPromise();
  //   return response.json().bpi[currency].rate;
  // }

  //Get for imageUrl
  async getHeroImageUrl() {
    //console.log('(getting the data...)');
    const response = await this.http
      .get(this.rootURL + '/HomePage')
      .toPromise();
    //console.log('Response after get method:');
    //console.log(response);
    return response[0];
  }

  //Put
  putWebPageContent(formData: Webpage) {
    console.log(formData);
    return this.http.post(
      this.rootURL + '/HomePage/' + formData.UserID,
      formData
    );
  }

  //Delete
  deleteWebPageContent(id: number) {
    return this.http.delete(this.rootURL + '/HomePage/' + id);
  }
}
