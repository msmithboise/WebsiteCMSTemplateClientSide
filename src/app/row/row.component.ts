import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColumnComponent } from '../column/column.component';

import { ColumnListVm } from '../models/column-list-vm.model';
import { Column } from '../models/column.model';
import { CustomImageService } from '../services/custom-image.service';
import { WebStructureService } from '../web-structure.service';
import { Webcontent } from '../WebContent/webcontent.model';
import { WebcontentService } from '../WebContent/webcontent.service';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css'],
})
export class RowComponent implements OnInit {
  @Input() rowId: number;
  @Input() colorOne: string;
  @Input() colorTwo: string;
  @Input() colorFive: string;
  @Input() colorSix: string;
  @Input() colorSeven: string;
  @Input() colorEight: string;
  @Input() FontFamily: string;

  @Output() refreshEvent = new EventEmitter<any>();
  public pageId: number;
  public pageDescription: string;
  public columnId = '';
  public columnLists: Column[];
  public rowIdArray: number[];
  public list: Column;
  public newColumnList: Column[];

  constructor(
    public webStructureService: WebStructureService,
    private route: ActivatedRoute,
    public webContentService: WebcontentService,
    public customImageService: CustomImageService,
    public toastr: ToastrService,
    public router: Router
  ) {}

  //This component needs to grab all columns by Row Id
  ngOnInit(): void {
    this.getColumnsByRowId(this.rowId);
    this.test();
  }

  test() {
    console.log('font family: ', this.FontFamily);
  }

  //Invokes from page-settings (parent)
  refreshPage() {
    this.refreshEvent.next('refresh');
  }

  //Invoked from column.ts (child)
  refreshRows() {
    this.getColumnsByRowId(this.rowId);
  }

  getRowId() {
    localStorage.setItem('passedRowId', this.rowId.toString());
  }

  getRowIdToDelete() {
    localStorage.setItem('passedRowId', this.rowId.toString());

    this.deleteRowDialogue(this.rowId);
  }

  deleteRowDialogue(rowId: number) {
    if (confirm('Are you sure you want to delete this row?')) {
      this.onRowDelete(rowId);
    }
  }

  onRowDelete(id: number) {
    this.webStructureService.deleteRowByPageId(id).subscribe((res) => {
      this.grabAllContentByPageId();
      this.refreshPage();
    });
    this.toastr.error('Row Deleted!');
  }

  columnFormTemplate = new FormGroup({
    columnId: new FormControl(''),
    rowId: new FormControl(''),
    pageId: new FormControl(''),
    columnClass: new FormControl(''),
  });

  //Add column

  //get all columns
  getAllColumns() {
    this.webStructureService.getColumns().subscribe((res) => {
      console.log('row: getAllColumns');
      this.webStructureService.getRequests++;
      this.webStructureService.columnsArray = res;
      this.grabAllContentByPageId();
    });
  }

  //get columns by row id and page id
  getColumnsByRowId(rowId: number) {
    this.webStructureService
      .getColumnLists(this.rowId)
      .subscribe((res: Column) => {
        console.log('row: getAllColumnsByRowId');
        this.webStructureService.getRequests++;
        this.columnLists = res[0];

        this.newColumnList = this.columnLists;
      });
  }

  onColumnSubmit(form: FormGroup) {
    this.addColumn(form);
  }

  addColumn(form: FormGroup) {
    var newRowId = Number(localStorage.getItem('passedRowId'));

    var newColumn = this.columnFormTemplate.value;
    newColumn.pageId = this.webContentService.pageIdSnapshot;
    newColumn.columnId += newColumn.columnId++;
    newColumn.rowId = newRowId;
    var columnSize = '';
    var data = this.webStructureService
      .postColumnsByRowId(newColumn)
      .subscribe((res) => {
        this.getColumnsByRowId(this.rowId);
        this.grabAllContentByPageId();
        this.refreshPage();
      });
    this.toastr.success('Column Added!');
  }

  //Grab all webcontent to display for editing
  grabAllContentByPageId() {
    this.webContentService.pageIdSnapshot = +this.route.snapshot.paramMap.get(
      'pageId'
    );

    this.customImageService
      .getWebContentByPageId(this.webContentService.pageIdSnapshot)
      .subscribe((res: Webcontent[]) => {
        console.log('row: getWebContentByPageId');
        this.webStructureService.getRequests++;
        this.webContentService.webContentArray = res;
      });
  }
}
