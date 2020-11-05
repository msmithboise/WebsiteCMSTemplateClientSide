import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Row } from './models/row.model';

@Injectable({
  providedIn: 'root',
})
export class WebStructureService {
  readonly webApi = 'http://localhost:54704/api';
  public rowsArray: Row[];
  public rowsByPageIdArray: Row[];

  constructor(private http: HttpClient) {}

  //Get Rows
  getRows() {
    return this.http.get<Row[]>(this.webApi + '/Row');
  }

  //Get Rows By PageId
  getRowsByPageId(pageId: number) {
    return this.http.get<Row[]>(this.webApi + '/Row/' + pageId);
  }

  //Post rows
  postRowsByPageId(formData: FormGroup) {
    return this.http.post(this.webApi + '/Row', formData);
  }
}
