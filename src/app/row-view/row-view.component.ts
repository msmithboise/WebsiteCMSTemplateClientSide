import { Component, Input, OnInit } from '@angular/core';
import { WebStructureService } from '../web-structure.service';

@Component({
  selector: 'app-row-view',
  templateUrl: './row-view.component.html',
  styleUrls: ['./row-view.component.css'],
})
export class RowViewComponent implements OnInit {
  @Input() pageId: number;
  constructor(public webStructureService: WebStructureService) {}

  ngOnInit(): void {
    this.getRowsByPageId();
  }

  //Get Rows By PageId

  getRowsByPageId() {
    console.log('pageid', this.pageId);
    this.webStructureService.getRowsByPageId(this.pageId).subscribe((res) => {
      this.webStructureService.rowsByPageIdArray = res;
      console.log('getting rows in row view');
      console.log(this.webStructureService.rowsByPageIdArray);
    });
  }
}
