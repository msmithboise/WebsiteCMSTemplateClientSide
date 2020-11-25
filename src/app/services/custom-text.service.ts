import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomText } from '../models/custom-text.model';
import { WebStructureService } from '../web-structure.service';

@Injectable({
  providedIn: 'root',
})
export class CustomTextService {
  readonly webApi = this.webStructureService.globalApi;
  public customTextArray: CustomText[];
  public textFormData: CustomText;

  constructor(
    private http: HttpClient,
    public webStructureService: WebStructureService
  ) {}

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
