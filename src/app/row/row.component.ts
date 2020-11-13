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
    // console.log('before the get call:', this.rowId);
    this.webStructureService
      .getColumnLists(this.rowId)
      .subscribe((res: Column) => {
        this.columnLists = res[0];
        // console.log('columns by rowId array', this.rowId);

        // console.log(this.columnLists);
        // console.log('before the for loop');
        for (let i = 0; i < this.columnLists.length; i++) {
          const column = this.columnLists[i];

          // console.log('columnlist rowid: ', column.RowId);
          // console.log('passed in rowid: ', this.rowId);

          this.newColumnList = this.columnLists;
          console.log('getting list of columns');
          console.log(this.newColumnList);
        }
      });
  }

  onColumnSubmit(form: FormGroup) {
    // console.log('column submitted!');
    // console.log('form on submit', form);
    // console.log('pageid', pageId);
    // console.log('rowId', rowId);
    // this.addColumn(form, pageId, rowId);
  }

  addColumn(form: FormGroup) {
    // console.log('adding column...');
    // console.log(form);
    // console.log('rowId', rowId);
    // console.log('pageId', pageId);

    var newColumn = this.columnFormTemplate.value;
    newColumn.pageId = this.webContentService.pageIdSnapshot;
    newColumn.columnId += newColumn.columnId++;
    // newColumn.rowId = rowId;

    // console.log('newColumn', newColumn);

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
