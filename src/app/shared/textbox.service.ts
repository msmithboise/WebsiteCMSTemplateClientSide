import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Textbox } from '../textbox.model';
import { Observable } from 'rxjs';
import { WebStructureService } from '../web-structure.service';

@Injectable({
  providedIn: 'root',
})
export class TextboxService {
  textBoxContentArray = [];
  textBoxOneFormData: Textbox;
  readonly rootURL = this.webStructureService.globalApi;

  constructor(
    public http: HttpClient,
    public webStructureService: WebStructureService
  ) {}

  //Get
  getTextBoxOneContent(): Observable<Textbox[]> {
    return this.http.get<Textbox[]>(this.rootURL + '/TextBoxOne');
  }

  //Get all

  getTextBoxOneData() {
    this.http
      .get(this.rootURL + '/TextBoxOne')
      .toPromise()
      .then((res) => (this.textBoxContentArray = res as Textbox[]));
  }

  //Post
  postTextBoxOneContent(textBoxOneFormData: Textbox) {
    return this.http.post(this.rootURL + '/TextBoxOne', textBoxOneFormData);
  }

  //Update
  updateTextBoxOneContent(textBoxOneFormData: Textbox) {
    return this.http.post(
      this.rootURL + '/TextBoxOne/' + textBoxOneFormData.Id,
      this.textBoxOneFormData
    );
  }
}
