import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  public rowId = '';
  public pageId: number;
  public pageDescription: string;

  constructor(
    public webStructureService: WebStructureService,
    private route: ActivatedRoute,
    public webContentService: WebcontentService,
    public customImageService: CustomImageService,
    public toastr: ToastrService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.grabAllContentByPageId();
    this.getRowsByPageId();
  }

  //Add row

  rowFormTemplate = new FormGroup({
    rowId: new FormControl(''),
    pageId: new FormControl(''),
  });

  getRows() {
    this.webStructureService.getRows().subscribe((res) => {
      this.webStructureService.rowsArray = res;

      console.log('getting rows');
      console.log(this.webStructureService.rowsArray);
    });
  }

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

  addRow() {
    console.log('Adding row');

    var newRow = this.rowFormTemplate.value;
    newRow.pageId = this.webContentService.pageIdSnapshot;
    newRow.RowId += newRow.RowId++;

    console.log('newRow', newRow);

    this.webStructureService.postRowsByPageId(newRow).subscribe((res) => {
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
        console.log('here are the page settings');
        console.log(res);
        this.webContentService.webContentArray = res;
      });
  }
}
