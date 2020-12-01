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
    this.webStructureService
      .getColumnLists(this.rowId)
      .subscribe((res: Column) => {
        this.columnLists = res[0];

        this.newColumnList = this.columnLists;
      });
  }
}
