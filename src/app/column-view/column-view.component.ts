import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebStructureService } from '../web-structure.service';

@Component({
  selector: 'app-column-view',
  templateUrl: './column-view.component.html',
  styleUrls: ['./column-view.component.css'],
})
export class ColumnViewComponent implements OnInit {
  @Input() rowId: number;
  public pageId: number;
  constructor(
    public webStructureService: WebStructureService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //this.getColumns();
    //this.getColumns();
  }

  // getColumnsByRowId() {
  //   //RowId 21 and 22
  //   console.log('rowId input: ', this.rowId);
  //   //Should return Col-6 for 21 and col-12 for 22
  //   this.webStructureService.getColumnsByRowId(this.rowId).subscribe((res) => {
  //     this.webStructureService.columnsByIdArray = res;
  //     console.log('column view');
  //     console.log(this.webStructureService.columnsByIdArray);
  //   });
  // }

  //First get all rows by page id

  // getColumns() {
  //   this.webStructureService.getColumnsByRowId(this.rowId).subscribe((res) => {
  //     this.webStructureService.columnsByIdArray = res;
  //     console.log(
  //       'In column view:  getting all columns by row ids: ',
  //       this.rowId
  //     );
  //     console.log(res);
  //   });
  // }
}
