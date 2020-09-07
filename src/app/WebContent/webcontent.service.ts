import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Webcontent } from './webcontent.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebcontentService {
  readonly webApi = 'http://localhost:54704/api';
  public webContentArray: Webcontent[];
  public formData: Webcontent;
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

  postUploadedImage(imageUrl: string) {
    const fd: FormData = new FormData();
    fd.append('imageUrl', imageUrl);
    console.log('here is the image url about to be posted: ');
    console.log(imageUrl);
    this.pageIdSnapshot = +this.route.snapshot.paramMap.get('pageId');
    console.log('here is the page id about to be posted');
    console.log(this.pageIdSnapshot.toString());
    fd.append('pageId', this.pageIdSnapshot.toString());
    return this.http.post(this.webApi + '/UploadImage', fd);
  }

  //Delete
  deleteWebPageContent(id: number) {
    return this.http.delete(this.webApi + '/WebContent/' + id);
  }
}
