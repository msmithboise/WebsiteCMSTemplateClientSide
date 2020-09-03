import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Webcontent } from './webcontent.model';

@Injectable({
  providedIn: 'root',
})
export class WebcontentService {
  readonly webApi = 'http://localhost:54704/api';
  public webContentArray: Webcontent[];

  constructor(private http: HttpClient) {}

  getWebContentByPageId(pageId: number) {
    console.log('pageId: ');
    console.log(pageId);
    return this.http.get<Webcontent[]>(this.webApi + '/WebContent/' + pageId);
  }
}
