import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Webcontent } from './webcontent.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class WebcontentService {
  readonly webApi = 'http://localhost:54704/api';
  public webContentArray: Webcontent[];
  public formData: Webcontent;
  imageDetailList: AngularFireList<any>;

  constructor(
    private http: HttpClient,
    private firebase: AngularFireDatabase
  ) {}

  getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }

  insertImageDetails(imageDetails) {
    this.imageDetailList.push(imageDetails);
  }

  //Get all content by page id
  getWebContentByPageId(pageId: number) {
    console.log('pageId: ');
    console.log(pageId);
    return this.http.get<Webcontent[]>(this.webApi + '/WebContent/' + pageId);
  }

  //Post webcontent
  postWebContentByPageId(formData: Webcontent) {
    return this.http.post(this.webApi + '/WebContent', formData);
  }

  postFile(fileToUpload: File) {
    const fd: FormData = new FormData();
    fd.append('Image', fileToUpload, fileToUpload.name);
    return this.http.post(this.webApi + '/UploadImage', fd);
  }
}
