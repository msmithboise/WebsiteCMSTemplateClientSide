import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Row } from './models/row.model';

@Injectable({
  providedIn: 'root',
})
export class WebStructureService {
  readonly webApi = 'http://localhost:54704/api';
  public rowsArray: Row[];
  constructor(private http: HttpClient) {}

  //Get Rows
  getRows() {
    return this.http.get<Row[]>(this.webApi + '/Row');
  }
}
