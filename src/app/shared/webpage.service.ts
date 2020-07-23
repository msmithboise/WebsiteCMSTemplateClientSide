import { Injectable } from '@angular/core';
import { Webpage } from './webpage.model';
import { HttpClient } from '@angular/common/http';
import { NgForOf } from '@angular/common';
import { kMaxLength } from 'buffer';
import { HomeComponent } from '../home/home.component';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebpageService {
  formData: Webpage;
  webContentList: Webpage[];
  webContent: [];

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

  //Get for imageUrl
  getContent(): Observable<Webpage[]> {
    //console.log('(getting the data...)');
    return this.http.get<Webpage[]>(this.rootURL + '/HomePage');
  }

  //console.log('Response after get method:');
  //console.log(response);
  //return response[0];

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

  // proxy() {
  //   const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  //   const url = 'http://localhost:54704/api/TextBox'; // site that doesn’t send Access-Control-*
  //   fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
  //     .then((response) => response.text())
  //     .then((contents) => console.log(contents))
  //     .catch(() =>
  //       console.log('Can’t access ' + url + ' response. Blocked by browser?')
  //     );
  // }
}
