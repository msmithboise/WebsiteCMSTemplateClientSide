import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Column } from '../models/column.model';
import { WebStructureService } from '../web-structure.service';

@Component({
  selector: 'app-column-view',
  templateUrl: './column-view.component.html',
  styleUrls: ['./column-view.component.css'],
})
export class ColumnViewComponent implements OnInit {
  @Input() rowId: number;
  public pageId: number;
  columnLists: Column[];
  newColumnList: Column[];
  constructor(
    public webStructureService: WebStructureService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getColumnsByRowId(this.rowId);
  }

  //get columns by row id and page id
  getColumnsByRowId(rowId: number) {
    console.log('Getting columns by row id: ', rowId);
    // console.log('before the get call:', this.rowId);
    this.webStructureService
      .getColumnLists(this.rowId)
      .subscribe((res: Column) => {
        this.columnLists = res[0];
        // console.log('columns by rowId array', this.rowId);

        // console.log(this.columnLists);
        // console.log('before the for loop');
        // for (let i = 0; i < this.columnLists.length; i++) {
        //   const column = this.columnLists[i];

        // console.log('columnlist rowid: ', column.RowId);
        // console.log('passed in rowid: ', this.rowId);

        this.newColumnList = this.columnLists;
        // console.log('getting list of columns');
        // console.log(this.newColumnList);
        // }
      });
  }
}
