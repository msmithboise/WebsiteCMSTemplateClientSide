import { Injectable } from '@angular/core';
import { Webpage } from './webpage.model';
import { HttpClient } from '@angular/common/http';
import { NgForOf } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WebpageService {
  formData: Webpage;
  webContentList: Webpage[];
  readonly rootURL = 'http://localhost:54704/api';
  imageUrl: string;

  constructor(public http: HttpClient) {}

  postWebPageContent(formData: Webpage) {
    return this.http.post(this.rootURL + '/HomePage', formData);
  }

  refreshList() {
    this.http
      .get(this.rootURL + '/HomePage')
      .toPromise()
      .then((res) => (this.webContentList = res as Webpage[]));
  }

  getImageUrl() {
    this.webContentList.forEach((element) => {
      this.imageUrl = element.HeroImageURL;
    });
  }

  putWebPageContent(formData: Webpage) {
    return this.http.put(
      this.rootURL + '/HomePage/' + formData.UserID,
      formData
    );
  }

  deleteWebPageContent(id: number) {
    return this.http.delete(this.rootURL + '/HomePage/' + id);
  }
}
