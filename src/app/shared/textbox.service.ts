import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Textbox } from '../textbox.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TextboxService {
  textBoxContentArray = [];
  textBoxOneFormData: Textbox;
  readonly rootURL = 'http://localhost:54704/api';

  constructor(public http: HttpClient) {}

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
