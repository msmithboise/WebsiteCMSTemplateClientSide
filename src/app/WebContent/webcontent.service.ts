import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Webcontent } from './webcontent.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { WebStructureService } from '../web-structure.service';

@Injectable({
  providedIn: 'root',
})
export class WebcontentService {
  readonly webApi = this.webStructureService.globalApi;
  public webContentArray: Webcontent[];
  public webContentByIdArray: Webcontent[];
  public formData: Webcontent;
  public editFormData: Webcontent;
  imageDetailList: AngularFireList<any>;
  public pageIdSnapshot: number;
  public subPageIdSnapshot: number;
  public pageId: number;
  public subPageId: string;

  constructor(
    private http: HttpClient,
    private firebase: AngularFireDatabase,
    private route: ActivatedRoute,
    public webStructureService: WebStructureService
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

  postUploadedImage(imageUrl: string, isChecked: boolean) {
    const fd: FormData = new FormData();

    //If 400px is checked,
    if (isChecked) {
      var body = imageUrl;
      fd.append('body', body);
    } else {
      fd.append('imageUrl', imageUrl);
    }

    var colId = localStorage.getItem('passedId');
    fd.append('columnId', colId);
    this.pageIdSnapshot = +this.route.snapshot.paramMap.get('pageId');

    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;

      this.subPageId = params.subPageId;
    });

    fd.append('pageId', this.pageIdSnapshot.toString());
    //fd.append('subPageId', this.subPageId);
    // fd.append('backgroundImage', 'url(' + imageUrl + ')');
    return this.http.post(this.webApi + '/UploadImage', fd);
  }

  postUploadedSubPageImage(imageUrl: string) {
    const fd: FormData = new FormData();
    fd.append('imageUrl', imageUrl);

    this.pageIdSnapshot = +this.route.snapshot.paramMap.get('pageId');
    this.subPageIdSnapshot = +this.route.snapshot.paramMap.get('subPageId');

    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;

      this.subPageId = params.subPageId;
    });

    fd.append('pageId', this.pageIdSnapshot.toString());
    fd.append('subPageId', this.subPageId);
    //fd.append('subPageId', this.subPageId);
    // fd.append('backgroundImage', 'url(' + imageUrl + ')');
    return this.http.post(this.webApi + '/UploadSubPageImage', fd);
  }

  //Post audio upload
  postUploadedAudio(audioUrl: string) {
    const fd: FormData = new FormData();
    fd.append('audioUrl', audioUrl);
    var colId = localStorage.getItem('passedId');
    fd.append('columnId', colId);

    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;

      this.subPageId = params.subPageId;
    });

    fd.append('pageId', this.pageIdSnapshot.toString());
    //fd.append('subPageId', this.subPageId);

    return this.http.post(this.webApi + '/UploadAudio', fd);
  }

  //Post audio upload for subpages
  postUploadedSubPageAudio(audioUrl: string) {
    const fd: FormData = new FormData();
    fd.append('audioUrl', audioUrl);

    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;

      this.subPageId = params.subPageId;
    });

    fd.append('pageId', this.pageIdSnapshot.toString());
    fd.append('subPageId', this.subPageId);

    //fd.append('subPageId', this.subPageId);

    return this.http.post(this.webApi + '/SubPageAudioUpload', fd);
  }

  //Post audio upload for subpages
  postSubPageAudio(audioUrl: string) {
    const fd: FormData = new FormData();
    fd.append('audioUrl', audioUrl);

    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;

      this.subPageId = params.subPageId;
    });

    fd.append('pageId', this.pageId.toString());
    fd.append('subPageId', this.subPageId);

    return this.http.post(this.webApi + '/WebContent', fd);
  }

  //Post Google Map
  postGoogleMap(form: FormGroup) {
    const fd: FormData = new FormData();
    //fd.append('MapUrl', mapUrl);

    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;

      this.subPageId = params.subPageId;
    });

    fd.append('pageId', this.pageId.toString());
    // fd.append('subPageId', this.subPageId.toString());

    //fd.append('subPageId', this.subPageId);

    return this.http.post(this.webApi + '/WebContent', form);
  }

  //Delete
  deleteWebPageContent(id: number) {
    return this.http.delete(this.webApi + '/WebContent/' + id);
  }

  //Post uploaded gallery image
  postUploadedGalleryImage(imageUrl: string) {
    const fd: FormData = new FormData();
    fd.append('imageUrl', imageUrl);
    var colId = localStorage.getItem('passedId');
    fd.append('columnId', colId);
    this.pageIdSnapshot = +this.route.snapshot.paramMap.get('pageId');

    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;

      this.subPageId = params.subPageId;
    });

    fd.append('pageId', this.pageIdSnapshot.toString());
    //fd.append('subPageId', this.subPageId);

    return this.http.post(this.webApi + '/UploadGallery', fd);
  }
}
