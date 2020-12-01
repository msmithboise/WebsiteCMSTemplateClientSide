import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ColumnListVm } from './models/column-list-vm.model';
import { Column } from './models/column.model';
import { Row } from './models/row.model';
import { Webcontent } from './WebContent/webcontent.model';

@Injectable({
  providedIn: 'root',
})
export class WebStructureService {
  //For Production:
  // public globalApi = 'http://api.riveroflifeidaho.com/api';
  //For Testing:
  public globalApi = 'http://localhost:54704/api';

  readonly webApi = this.globalApi;
  public rowsArray: Row[];
  public rowsByPageIdArray: Row[];
  public columnsArray: Column[];
  public columnsByIdArray: Column[];
  public contentByColumnIdArray: Webcontent[];
  public combinedRowsByPageId = [];
  public combinedColumnsByRowId = [];
  public hasToken: boolean = false;
  constructor(private http: HttpClient) {}

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
