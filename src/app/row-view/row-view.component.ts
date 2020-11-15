import { Component, Input, OnInit } from '@angular/core';
import { WebStructureService } from '../web-structure.service';

@Component({
  selector: 'app-row-view',
  templateUrl: './row-view.component.html',
  styleUrls: ['./row-view.component.css'],
})
export class RowViewComponent implements OnInit {
  //@Input() rowId: number;
  constructor(public webStructureService: WebStructureService) {}

  ngOnInit(): void {}

  //get columns by row id and page id
  // getColumnsByRowId(rowId: number) {
  //   console.log('Getting columns by row id: ', rowId);
  //   // console.log('before the get call:', this.rowId);
  //   this.webStructureService
  //     .getColumnLists(this.rowId)
  //     .subscribe((res: Column) => {
  //       this.columnLists = res[0];
  //       // console.log('columns by rowId array', this.rowId);

  //       // console.log(this.columnLists);
  //       // console.log('before the for loop');
  //       // for (let i = 0; i < this.columnLists.length; i++) {
  //       //   const column = this.columnLists[i];

  //       // console.log('columnlist rowid: ', column.RowId);
  //       // console.log('passed in rowid: ', this.rowId);

  //       this.newColumnList = this.columnLists;
  //       // console.log('getting list of columns');
  //       // console.log(this.newColumnList);
  //       // }
  //     });
  // }
}
