import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomPage } from '../models/custom-page.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomPageService {
  constructor(public http: HttpClient) {}

  public customPageArray: CustomPage[];
  readonly webApi = 'http://localhost:54704/api';
  customPageFormData: CustomPage;

  // //Get form data
  // getCustomPageData() {
  //   this.http
  //     .get(this.webApi + '/CustomPages')
  //     .toPromise()
  //     .then((res) => (this.customPageArray = res as CustomPage[]));
  //   console.log(this.customPageArray);
  // }

  //Get
  getCustomPageContent(): Observable<CustomPage[]> {
    return this.http.get<CustomPage[]>(this.webApi + '/CustomPages');
  }

  //Post/Update
  //Put
  createCustomPage(customPageFormData: CustomPage) {
    return this.http.post(
      this.webApi + '/CustomPages/' + customPageFormData.PageId,
      customPageFormData
    );
  }

  //Delete
}
