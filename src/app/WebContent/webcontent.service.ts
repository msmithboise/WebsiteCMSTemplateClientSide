import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Webcontent } from './webcontent.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class WebcontentService {
  readonly webApi = 'http://localhost:54704/api';
  public webContentArray: Webcontent[];
  public webContentByIdArray: Webcontent[];
  public formData: Webcontent;
  public editFormData: Webcontent;
  imageDetailList: AngularFireList<any>;
  public pageIdSnapshot: number;

  constructor(
    private http: HttpClient,
    private firebase: AngularFireDatabase,
    private route: ActivatedRoute
  ) {}

  getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }

  insertImageDetails(imageDetails) {
    this.imageDetailList.push(imageDetails);
  }

  //Get all content by page id
  getWebContentByPageId(pageId: number) {
    return this.http.get<Webcontent[]>(this.webApi + '/WebContent/' + pageId);
  }

  //Get content by id

  getEditContentById(id: number) {
    return this.http.get<Webcontent[]>(this.webApi + '/EditContent/' + id);
  }

  //Post webcontent
  postWebContentByPageId(formData: FormGroup) {
    console.log('text form before post');
    console.log(formData);
    return this.http.post(this.webApi + '/WebContent', formData);
  }

  //Post image url and page id
  //Post webcontent

  //Post custom form data

  postImageFormDataByPageId(data: FormGroup) {
    return this.http.post(this.webApi + '/WebContent', data);
  }

  //Post content settings

  postEditContentById(editFormData: Webcontent) {
    return this.http.post(this.webApi + '/EditContent', editFormData);
  }

  postFile(fileToUpload: File) {
    const fd: FormData = new FormData();
    fd.append('Image', fileToUpload, fileToUpload.name);
    return this.http.post(this.webApi + '/UploadImage', fd);
  }

  postUploadedImage(imageUrl: string) {
    const fd: FormData = new FormData();
    fd.append('imageUrl', imageUrl);

    this.pageIdSnapshot = +this.route.snapshot.paramMap.get('pageId');

    fd.append('pageId', this.pageIdSnapshot.toString());
    fd.append('backgroundImage', 'url(' + imageUrl + ')');
    return this.http.post(this.webApi + '/UploadImage', fd);
  }

  //Delete
  deleteWebPageContent(id: number) {
    return this.http.delete(this.webApi + '/WebContent/' + id);
  }
}
