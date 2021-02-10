import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ColumnListVm } from './models/column-list-vm.model';
import { Column } from './models/column.model';
import { CustomPage } from './models/custom-page.model';
import { Row } from './models/row.model';
import { Webcontent } from './WebContent/webcontent.model';

@Injectable({
  providedIn: 'root',
})
export class WebStructureService {
  //For Production:
  // public globalApi = this.setProdApi();
  //For Testing:
  // public globalApi = this.setTestApi();

  // public globalApi = 'http://api.riveroflifeidaho.com/api';
  public globalApi = 'http://api.freedomstartsnow.com/api';

  readonly webApi = this.globalApi;
  public rowsArray: Row[];
  public rowsByPageIdArray: Row[];
  public columnsArray: Column[];
  public columnsByIdArray: Column[];
  public contentByColumnIdArray: Webcontent[];
  public combinedRowsByPageId = [];
  public combinedColumnsByRowId = [];
  public hasToken: boolean = false;
  public token: string;
  public baseUrl: string;
  public FinalProdUrl: string;
  public pagesByClientUrlArray: CustomPage[];
  public ClientUrl = this.findClientUrl();
  constructor(private http: HttpClient, public cookie: CookieService) {}

  setTestApi() {
    return 'http://localhost:54704/api';
  }

  findClientUrl() {
    var fullUrl = window.location.href;

    console.log('full url', fullUrl);

    var urlArray = fullUrl.split('/');
    console.log('urlArray when split', urlArray);

    var myUrl = urlArray[2];
    console.log('urlArray[2]', myUrl);

    var prodUrl = myUrl.split('.');

    console.log('prod url when split at .', prodUrl);

    if (prodUrl[0] == 'com') {
      var prodUrlFinal = prodUrl[1];
    }

    if (prodUrl[1] == 'com') {
      prodUrlFinal = prodUrl[0];
    }

    if (prodUrl[2] == 'com') {
      prodUrlFinal = prodUrl[1];
    }

    console.log('prodUrlFinal', prodUrlFinal);

    var testUrl = 'localhost4200';

    if (myUrl == 'localhost:4200') {
      this.FinalProdUrl = testUrl;
      return 'localhost4200';
    } else {
      this.FinalProdUrl = prodUrlFinal;
      console.log('finalProdUrl', this.FinalProdUrl);
      return prodUrlFinal;
    }
  }

  setProdApi() {
    var finalClientUrl = this.findClientUrl();

    var finalApi = 'http://api.' + finalClientUrl + '.com/api';

    return finalApi;
  }

  //Get Pages By Client URL

  //Get Rows
  getRows() {
    return this.http.get<Row[]>(this.webApi + '/Row');
  }

  //Get Rows By PageId
  getRowsByPageId(pageId: number) {
    return this.http.get<Row[]>(this.webApi + '/Row/' + pageId);
  }

  //Post rows
  postRowsByPageId(formData: FormGroup) {
    return this.http.post(this.webApi + '/Row', formData);
  }

  deleteRowByPageId(rowId: number) {
    return this.http.delete(this.webApi + '/Row/' + rowId);
  }

  deleteColumn(columnId: number) {
    return this.http.delete(this.webApi + '/Columns/' + columnId);
  }

  //Get Columns
  getColumns() {
    return this.http.get<Column[]>(this.webApi + '/Columns');
  }

  //Get Columns by PageId (and RowId)

  // getColumnsByRowId(rowId: number) {
  //   return this.http.get<Column[]>(this.webApi + '/Columns/' + rowId);
  // }

  //Post Columns
  postColumnsByRowId(formData: FormGroup) {
    return this.http.post(this.webApi + '/Columns', formData);
  }

  //Get content by columnid
  getContentByColumnId(columnId: number) {
    return this.http.get(this.webApi + '/Content/' + columnId);
  }

  // Get column lists
  getColumnLists(rowId: number) {
    return this.http.get<Column>(this.webApi + '/Columns/' + rowId);
  }

  // Get content lists
  getContentLists(columnId: number) {
    return this.http.get<Column>(this.webApi + '/Content/' + columnId);
  }
}
