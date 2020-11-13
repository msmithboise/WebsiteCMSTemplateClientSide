import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomImageService } from '../services/custom-image.service';
import { WebStructureService } from '../web-structure.service';
import { Webcontent } from '../WebContent/webcontent.model';
import { WebcontentService } from '../WebContent/webcontent.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  @Input() columnId: number;
  public pageId: number;
  public pageDescription: string;
  public contentList: Webcontent[];
  public newContentList: Webcontent[];

  constructor(
    public webStructureService: WebStructureService,
    public webContentService: WebcontentService,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    public customImageService: CustomImageService,
    public router: Router
  ) {}

  //This component gets all content by column id
  ngOnInit(): void {
    this.getContentListsByColumnId();
  }

  getContentByColumnId() {
    this.webStructureService
      .getContentByColumnId(this.columnId)
      .subscribe((res: Webcontent[]) => {
        this.webStructureService.contentByColumnIdArray = res;
        console.log('content by column array', this.columnId);
        console.log(this.webStructureService.contentByColumnIdArray);
      });
  }

  getContentListsByColumnId() {
    console.log('Getting content by column Id: ', this.columnId);

    this.webStructureService
      .getContentLists(this.columnId)
      .subscribe((res: Webcontent) => {
        this.contentList = res[0];

        for (let i = 0; i < this.contentList.length; i++) {
          const content = this.contentList[i];

          //if content.ColumnId != this.columnId - return

          if (content.ColumnId != this.columnId) {
            continue;
          }

          if (content.Id != null) {
            console.log('content');
            console.log(content);

            this.newContentList = this.contentList;
            console.log('list of content retreived(columnId)', this.columnId);
            console.log(this.newContentList);
          }
        }
      });
  }

  // //get columns by row id and page id
  // getColumnsByRowId(rowId: number) {
  //   // console.log('before the get call:', this.rowId);
  //   this.webStructureService
  //     .getColumnLists(this.rowId)
  //     .subscribe((res: Column) => {
  //       this.columnLists = res[0];
  //       // console.log('columns by rowId array', this.rowId);

  //       // console.log(this.columnLists);
  //       // console.log('before the for loop');
  //       for (let i = 0; i < this.columnLists.length; i++) {
  //         const column = this.columnLists[i];

  //         // console.log('columnlist rowid: ', column.RowId);
  //         // console.log('passed in rowid: ', this.rowId);

  //         this.newColumnList = this.columnLists;
  //         console.log('getting list of columns');
  //         console.log(this.newColumnList);
  //       }
  //     });
  // }

  getRowsByPageId() {
    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
    });

    this.webStructureService.getRowsByPageId(this.pageId).subscribe((res) => {
      this.webStructureService.rowsByPageIdArray = res;
      this.grabAllContentByPageId();
      console.log('getting rows by page id');
      console.log(this.webStructureService.rowsByPageIdArray);
    });
  }

  onContentSubmit(form: NgForm) {
    //Submit for homepage content
    this.insertContentRecord(form);
  }

  insertContentRecord(form: NgForm) {
    this.webContentService
      .postWebContentByPageId(form.value)
      .subscribe((res) => {
        //this.resetForm(form);
        this.grabAllContentByPageId();
      });
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
      console.log('columns array');
      console.log(this.webStructureService.columnsArray);
    });
  }

  //get columns by row id and page id
  getColumnsByRowId() {
    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
    });
  }

  onColumnSubmit(form: FormGroup) {
    console.log('column submitted!');
    console.log('form on submit', form);
    // console.log('pageid', pageId);
    // console.log('rowId', rowId);

    // this.addColumn(form, pageId, rowId);
  }

  addColumn(form: FormGroup) {
    console.log('adding column...');
    console.log(form);
    // console.log('rowId', rowId);
    // console.log('pageId', pageId);

    var newColumn = this.columnFormTemplate.value;
    newColumn.pageId = this.webContentService.pageIdSnapshot;
    newColumn.columnId += newColumn.columnId++;
    // newColumn.rowId = rowId;

    console.log('newColumn', newColumn);

    this.webStructureService.postColumnsByRowId(newColumn).subscribe((res) => {
      //this.resetForm(form);
      this.grabAllContentByPageId();
    });
  }

  deleteDialogue(id: number) {
    console.log('trying to delete..');
    if (confirm('Are you sure you want to delete this?')) {
      this.onDelete(id);
    }
  }

  onDelete(id: number) {
    this.webContentService.deleteWebPageContent(id).subscribe((res) => {
      this.grabAllContentByPageId();
    });
    this.toastr.error('Content deleted!');
  }

  //Grab all webcontent to display for editing
  grabAllContentByPageId() {
    this.webContentService.pageIdSnapshot = +this.route.snapshot.paramMap.get(
      'pageId'
    );

    this.customImageService
      .getWebContentByPageId(this.webContentService.pageIdSnapshot)
      .subscribe((res: Webcontent[]) => {
        console.log('here are the page settings');
        console.log(res);
        this.webContentService.webContentArray = res;
      });
  }

  selectItemToEdit(textId: number) {
    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
      this.pageDescription = params.pageDescription;

      //console.log(this.pageId);

      //console.log(this.subPageId);
    });
    // { path: 'style-settings/:pageDescription/:pageId/:textId', component: StyleSettingsComponent },
    this.router.navigate([
      '/style-settings/' +
        this.pageDescription +
        '/' +
        this.pageId +
        '/' +
        textId,
    ]);
    console.log('item to edit');
    console.log(textId);
    this.webContentService
      .getEditContentById(textId)
      .subscribe((res: Webcontent[]) => {
        this.webContentService.webContentByIdArray = res;
        console.log('res');
        console.log(res);
        // console.log('Here is the images based on page id: ');
        // console.log(this.imagesByPageIdArray);
      });
  }
}
