import { Injectable } from '@angular/core';
import { Webpage } from './webpage.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebpageService {
  formData: Webpage;
  readonly rootURL = 'http://localhost:54704/api';

  constructor(public http: HttpClient) {}

  postWebPageContent(formData: Webpage) {
    return this.http.post(this.rootURL + '/WebPage', formData);
  }
}
