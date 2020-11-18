import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Duplex } from 'stream';
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
  }

  getRowId() {
    console.log('add column row id');
    console.log(this.rowId);
    localStorage.setItem('passedRowId', this.rowId.toString());
  }

  getRowIdToDelete() {
    console.log('delete row id');
    console.log(this.rowId);
    localStorage.setItem('passedRowId', this.rowId.toString());

    this.deleteRowDialogue(this.rowId);
  }

  deleteRowDialogue(rowId: number) {
    // console.log('trying to delete..');
    if (confirm('Are you sure you want to delete this row?')) {
      this.onRowDelete(rowId);
    }
  }

  onRowDelete(id: number) {
    this.webStructureService.deleteRowByPageId(id).subscribe((res) => {
      this.grabAllContentByPageId();
      //this.resetForm();
    });
    this.toastr.error('Content deleted!');
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
      this.webStructureService.columnsArray = res;
      this.grabAllContentByPageId();
      // console.log('columns array');
      // console.log(this.webStructureService.columnsArray);
    });
  }

  //get columns by row id and page id
  getColumnsByRowId(rowId: number) {
    //console.log('Getting columns by row id: ', rowId);
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

  onColumnSubmit(form: FormGroup) {
    this.addColumn(form);
  }

  addColumn(form: FormGroup) {
    var newRowId = Number(localStorage.getItem('passedRowId'));

    console.log('new row id');
    console.log(newRowId);

    var newColumn = this.columnFormTemplate.value;
    newColumn.pageId = this.webContentService.pageIdSnapshot;
    newColumn.columnId += newColumn.columnId++;
    newColumn.rowId = newRowId;
    // newColumn.rowId = rowId;

    //console.log('newColumn', newColumn);

    this.webStructureService.postColumnsByRowId(newColumn).subscribe((res) => {
      //this.resetForm(form);
      this.grabAllContentByPageId();
    });
  }

  //Grab all webcontent to display for editing
  grabAllContentByPageId() {
    this.webContentService.pageIdSnapshot = +this.route.snapshot.paramMap.get(
      'pageId'
    );

    this.customImageService
      .getWebContentByPageId(this.webContentService.pageIdSnapshot)
      .subscribe((res: Webcontent[]) => {
        // console.log('here are the page settings');
        // console.log(res);
        this.webContentService.webContentArray = res;
      });
  }
}
