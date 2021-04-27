import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { WebStructureService } from '../web-structure.service';
import { WebcontentService } from '../WebContent/webcontent.service';

@Component({
  selector: 'app-row-view',
  templateUrl: './row-view.component.html',
  styleUrls: ['./row-view.component.css'],
})
export class RowViewComponent implements OnInit {
  public pageId: number;
  //@Input() rowId: number;
  constructor(
    public webStructureService: WebStructureService,
    public dragulaService: DragulaService,
    public webContentService: WebcontentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dragRowInit();
  }

  rowFormTemplate = new FormGroup({
    rowId: new FormControl(''),
    pageId: new FormControl(''),
  });

  dragRowInit() {
    this.dragulaService.createGroup('ROWS', {
      revertOnSpill: true,
      copy: true,
      copyItem: (row: string) => {
        return row;
      },
      // copy: (el, source) => {
      //   return source.id === '#left';
      // },
      accepts: (el, target, source, sibling) => {
        // To avoid dragging from right to left container
        return target.id !== 'left';
      },
    });

    this.dragulaService.drag('ROWS').subscribe((res) => {
      console.log('dragging row');
    });

    this.dragulaService.drop('ROWS').subscribe((res) => {
      console.log('dropped row');
      this.addRowByDrag();
    });
  }

  addRowByDrag() {
    var newRow = this.rowFormTemplate.value;
    newRow.pageId = this.webContentService.pageIdSnapshot;
    newRow.RowId += newRow.RowId++;

    this.webStructureService.postRowsByPageId(newRow).subscribe((res) => {
      this.refresh();
      //this.grabAllContentByPageId();
    });
  }

  refresh() {
    this.getRowsByPageId();
  }

  getRowsByPageId() {
    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
    });

    this.webStructureService.getRowsByPageId(this.pageId).subscribe((res) => {
      console.log('page-settings: getRowsByPageId');
      this.webStructureService.getRequests++;
      this.webStructureService.rowsByPageIdArray = res;
      // this.grabAllContentByPageId();
    });
  }
}
