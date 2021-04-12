import { Injectable } from '@angular/core';
import { CustomImage } from '../models/custom-image.model';
import { Observable, pairs } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WebStructureService } from '../web-structure.service';

@Injectable({
  providedIn: 'root',
})
export class CustomImageService {
  readonly webApi = this.webStructureService.globalApi;
  public customImageArray: CustomImage[];

  constructor(
    private http: HttpClient,
    public webStructureService: WebStructureService
  ) {}

  //Get Image array
  getCustomImageContent(): Observable<CustomImage[]> {
    return this.http.get<CustomImage[]>(this.webApi + '/CustomImages');
  }

  //Get Images by page id
  getWebContentByPageId(pageId: number) {
    return this.http.get<CustomImage[]>(this.webApi + '/WebContent/' + pageId);
  }
}
