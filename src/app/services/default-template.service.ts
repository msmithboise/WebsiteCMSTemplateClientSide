import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Webcontent } from '../WebContent/webcontent.model';

@Injectable({
  providedIn: 'root',
})
export class DefaultTemplateService {
  readonly webApi = 'http://localhost:54704/api';
  defaultTemplateArray: Webcontent[];
  constructor(public http: HttpClient) {}

  //Get

  //Post

  setDefaultTemplate(defaultTemplate: FormGroup) {
    return this.http.post(this.webApi + '/DefaultTemplate', defaultTemplate);
  }

  //Delete
}
