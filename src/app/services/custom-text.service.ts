import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomText } from '../models/custom-text.model';

@Injectable({
  providedIn: 'root',
})
export class CustomTextService {
  readonly webApi = 'http://localhost:54704/api';
  public customTextArray: CustomText[];
  textFormData: CustomText;

  constructor(private http: HttpClient) {}

  //Get text by page id
  getTextByPageId(pageId: number) {
    console.log('pageId: ');
    console.log(pageId);
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

  postSubmittedTextByPageId(textFormData: CustomText) {
    return this.http.post(this.webApi + '/CustomText', textFormData);
  }

  postTextByPageId(textFormData: CustomText, textId: number) {
    return this.http.post(this.webApi + '/CustomText', textFormData);
  }

  // putWebPageContent(formData: Webpage) {
  //   console.log(formData);
  //   return this.http.post(
  //     this.rootURL + '/HomePage/' + formData.UserID,
  //     formData
  //   );
  // }
}
