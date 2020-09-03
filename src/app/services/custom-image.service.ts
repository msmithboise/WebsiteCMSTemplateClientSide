import { Injectable } from '@angular/core';
import { CustomImage } from '../models/custom-image.model';
import { Observable, pairs } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomImageService {
  readonly webApi = 'http://localhost:54704/api';
  public customImageArray: CustomImage[];

  constructor(private http: HttpClient) {}

  //Get Image array
  getCustomImageContent(): Observable<CustomImage[]> {
    return this.http.get<CustomImage[]>(this.webApi + '/CustomImages');
  }

  //Get Images by page id
  getWebContentByPageId(pageId: number) {
    console.log('pageId: ');
    console.log(pageId);
    return this.http.get<CustomImage[]>(this.webApi + '/WebContent/' + pageId);
  }
}
