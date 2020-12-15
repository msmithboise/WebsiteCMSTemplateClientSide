import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() refreshEvent = new EventEmitter<any>();

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

  refreshRows() {
    this.refreshEvent.next('refreshRows');
  }

  refreshColumns() {
    this.getContentListsByColumnId();
  }

  getContentByColumnId() {
    this.webStructureService
      .getContentByColumnId(this.columnId)
      .subscribe((res: Webcontent[]) => {
        this.webStructureService.contentByColumnIdArray = res;
      });
  }

  getContentListsByColumnId() {
    this.webStructureService
      .getContentLists(this.columnId)
      .subscribe((res: Webcontent) => {
        this.contentList = res[0];

        for (let i = 0; i < this.contentList.length; i++) {
          const content = this.contentList[i];

          if (content.ColumnId != this.columnId) {
            continue;
          }

          if (content.Id != null) {
            this.newContentList = this.contentList;
          }
        }
      });
  }

  getRowsByPageId() {
    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
    });

    this.webStructureService.getRowsByPageId(this.pageId).subscribe((res) => {
      this.webStructureService.rowsByPageIdArray = res;
      this.grabAllContentByPageId();
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

  //delete column

  deleteColumnDialogue(columnId: number) {
    if (confirm('Are you sure you want to delete this column?')) {
      this.onColumnDelete(columnId);
    }
  }

  onColumnDelete(id: number) {
    this.webStructureService.deleteColumn(id).subscribe((res) => {
      this.grabAllContentByPageId();
      this.refreshRows();
    });
    this.toastr.error('Column deleted!');
  }

  //get all columns
  getAllColumns() {
    this.webStructureService.getColumns().subscribe((res) => {
      this.webStructureService.columnsArray = res;
      this.grabAllContentByPageId();
    });
  }

  //get columns by row id and page id
  getColumnsByRowId() {
    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
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

    this.webStructureService.postColumnsByRowId(newColumn).subscribe((res) => {
      this.refreshRows();
    });
  }

  deleteDialogue(id: number) {
    if (confirm('Are you sure you want to delete this?')) {
      this.onDelete(id);
    }
  }

  onDelete(id: number) {
    this.webContentService.deleteWebPageContent(id).subscribe((res) => {
      this.grabAllContentByPageId();
    });
    this.refreshRows();
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
        this.webContentService.webContentArray = res;
      });
  }

  selectItemToEdit(textId: number, columnId: number) {
    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
      this.pageDescription = params.pageDescription;
    });
    // { path: 'style-settings/:pageDescription/:pageId/:textId', component: StyleSettingsComponent },
    this.router.navigate([
      '/style-settings/' +
        this.pageDescription +
        '/' +
        this.pageId +
        '/' +
        columnId +
        '/' +
        textId,
    ]);

    this.webContentService
      .getEditContentById(textId)
      .subscribe((res: Webcontent[]) => {
        this.webContentService.webContentByIdArray = res;
      });
  }

  setIconHttp(icon: string) {
    var address = 'https://unpkg.com/simple-icons@v4/icons/facebook.svg';

    var newAddress = 'https://unpkg.com/simple-icons@v4/icons/' + icon + '.svg';

    return newAddress;
  }
}
