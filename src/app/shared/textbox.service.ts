import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Textbox } from '../textbox.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TextboxService {
  textBoxContent = [];
  textBoxOneFormData: Textbox;
  readonly rootURL = 'http://localhost:54704/api';

  constructor(public http: HttpClient) {}

  //Get
  getTextBoxOneContent(): Observable<Textbox[]> {
    return this.http.get<Textbox[]>(this.rootURL + '/TextBoxOne');
  }

  //Post
  postTextBoxOneContent(textBoxOneFormData: Textbox) {
    return this.http.post(this.rootURL + '/TextBoxOne', textBoxOneFormData);
  }

  //Update
  updateTextBoxOneContent(textBoxOneFormData: Textbox) {
    console.log(textBoxOneFormData);
    return this.http.post(
      this.rootURL + '/TextBoxOne/' + textBoxOneFormData.Id,
      this.textBoxOneFormData
    );
  }
}
