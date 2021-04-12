import { Injectable } from '@angular/core';
import { Webpage } from './webpage.model';
import { HttpClient } from '@angular/common/http';
import { NgForOf } from '@angular/common';
import { kMaxLength } from 'buffer';
import { HomeComponent } from '../home/home.component';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { Textbox } from '../textbox.model';
import { WebStructureService } from '../web-structure.service';

@Injectable({
  providedIn: 'root',
})
export class WebpageService {
  formData: Webpage;
  webContentList: Webpage[];
  textBoxOneContent: Textbox[];
  webContent: [];

  readonly rootURL = this.webStructureService.globalApi;
  imageUrl: string;

  constructor(
    public http: HttpClient,
    public webStructureService: WebStructureService
  ) {}

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
    console.log('webpage service: getWebPageContent');
    this.webStructureService.getRequests++;
  }

  getTextBoxOneContent() {
    this.http
      .get(this.rootURL + '/TextBoxOne')
      .toPromise()
      .then((res) => (this.textBoxOneContent = res as Textbox[]));
    console.log('webpage service: getTextBoxOneContent');
    this.webStructureService.getRequests++;
  }

  //Get for imageUrl
  getContent(): Observable<Webpage[]> {
    console.log('webpage service: getContent');
    this.webStructureService.getRequests++;
    return this.http.get<Webpage[]>(this.rootURL + '/HomePage');
  }

  //Put
  putWebPageContent(formData: Webpage) {
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
