import { Component, Input, OnInit } from '@angular/core';
import { WebStructureService } from '../web-structure.service';

@Component({
  selector: 'app-column-view',
  templateUrl: './column-view.component.html',
  styleUrls: ['./column-view.component.css'],
})
export class ColumnViewComponent implements OnInit {
  @Input() rowId: number;
  constructor(public webStructureService: WebStructureService) {}

  ngOnInit(): void {
    this.getColumnsByRowId();
  }

  getColumnsByRowId() {
    //RowId 21 and 22
    console.log('rowId input: ', this.rowId);
    //Should return Col-6 for 21 and col-12 for 22
    this.webStructureService.getColumnsByRowId(this.rowId).subscribe((res) => {
      this.webStructureService.columnsByIdArray = res;
      console.log('column view');
      console.log(this.webStructureService.columnsByIdArray);
    });
  }
}
