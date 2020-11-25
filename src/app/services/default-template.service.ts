import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WebStructureService } from '../web-structure.service';
import { Webcontent } from '../WebContent/webcontent.model';

@Injectable({
  providedIn: 'root',
})
export class DefaultTemplateService {
  readonly webApi = this.webStructureService.globalApi;
  defaultTemplateArray: Webcontent[];
  constructor(
    public http: HttpClient,
    public webStructureService: WebStructureService
  ) {}

  //Get

  //Post

  setDefaultTemplate(defaultTemplate: FormGroup) {
    return this.http.post(this.webApi + '/DefaultTemplate', defaultTemplate);
  }

  //Delete
}
