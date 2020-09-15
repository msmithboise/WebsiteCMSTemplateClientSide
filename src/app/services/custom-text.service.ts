import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomText } from '../models/custom-text.model';

@Injectable({
  providedIn: 'root',
})
export class CustomTextService {
  readonly webApi = 'http://localhost:54704/api';
  public customTextArray: CustomText[];
  public textFormData: CustomText;

  constructor(private http: HttpClient) {}

  //Get text by page id
  getTextByPageId(pageId: number) {
    return this.http.get<CustomText[]>(this.webApi + '/CustomText/' + pageId);
  }

  //Get all

  setTextDataToArray(pageId: number) {
    this.http
      .get(this.webApi + '/CustomText/' + pageId)
      .toPromise()
      .then((res) => (this.customTextArray = res as CustomText[]));
  }

  //post text by page id
}
