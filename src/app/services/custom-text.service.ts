import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomText } from '../models/custom-text.model';

@Injectable({
  providedIn: 'root',
})
export class CustomTextService {
  readonly webApi = 'http://localhost:54704/api';
  public customImageArray: CustomText[];

  constructor(private http: HttpClient) {}

  getImagesByPageId(pageId: number) {
    console.log('pageId: ');
    console.log(pageId);
    return this.http.get<CustomText[]>(this.webApi + '/CustomText/' + pageId);
  }
}
