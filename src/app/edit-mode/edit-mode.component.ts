import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DragulaService, DrakeFactory } from 'ng2-dragula';

import autoScroll from 'dom-autoscroller';
import * as dragula from 'dragula';
import { WebStructureService } from '../web-structure.service';
import { FormControl, FormGroup } from '@angular/forms';
import { WebcontentService } from '../WebContent/webcontent.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.css'],
})

//@ViewChild('autoscroll') autoscroll: ElementRef;
export class EditModeComponent implements OnInit, OnDestroy {
  @Input() selectedRowId: string;
  public features = [
    { id: 1, text: `Text` },
    { id: 2, image: `Background Image` },
    { id: 3, button: `Button` },
    { id: 4, audio: `Audio` },
    { id: 5, video: `Video` },
  ];

  public rows = [{ id: 1 }, { id: 2 }, { id: 3 }];

  public dragContainer = [];

  public dragColumn = [];
  public pageId: number;

  constructor(
    private dragulaService: DragulaService,
    public webStructureService: WebStructureService,
    public webContentService: WebcontentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dragFeatureInit();
    this.dragRowInit();
    // this.createDragulaGroup();
    // this.dragulaInit();
  }

  onRowDrag() {
    console.log('row dragged/added!');
  }

  rowFormTemplate = new FormGroup({
    rowId: new FormControl(''),
    pageId: new FormControl(''),
  });

  addRowByDrag() {
    var parsedRowId = Number(this.selectedRowId);

    console.log('parsed row id;  ', parsedRowId);

    var newRow = this.rowFormTemplate.value;
    newRow.pageId = this.webContentService.pageIdSnapshot;
    newRow.rowId = parsedRowId++;

    this.webStructureService.postRowsByPageId(newRow).subscribe((res) => {
      this.refresh();
      //this.grabAllContentByPageId();
    });
  }

  refresh() {
    this.getRowsByPageId();
  }

  resetRowId() {
    this.selectedRowId = '0';
    console.log('reset row id', this.selectedRowId);
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

  ngOnDestroy() {
    this.dragulaService.destroy('FEATURES');
    this.dragulaService.destroy('ROWS');
  }

  onClick() {
    console.log('feature clicked!');
    console.log('new tool box', this.webStructureService.dragColumn);
  }

  getRowIdOnDrag() {
    console.log('getting row id on drag...');
    console.log('passed row id:  ', this.selectedRowId);
  }

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

    var newRowId;

    this.dragulaService.drag('ROWS').subscribe((res) => {});

    this.dragulaService.drop('ROWS').subscribe((res) => {
      console.log('dropped row');

      this.addRowByDrag();
    });
  }

  dragFeatureInit() {
    this.dragulaService.createGroup('FEATURES', {
      revertOnSpill: true,
      copy: true,
      copyItem: (feature: string) => {
        return feature;
      },
      // copy: (el, source) => {
      //   return source.id === '#left';
      // },
      accepts: (el, target, source, sibling) => {
        // To avoid dragging from right to left container
        return target.id !== 'left';
      },
    });

    this.dragulaService.drag('FEATURES').subscribe((res) => {
      console.log('dragging feature');
    });

    this.dragulaService.drop('FEATURES').subscribe((res) => {
      console.log('dropped feature');
    });
  }

  dragulaInit() {
    var drake = dragula([
      document.querySelector('#left'),
      document.querySelector('#right'),
    ]);

    var scroll = autoScroll(
      [
        window,
        document.querySelector('#list-container'),
        document.querySelector('#container2'),
      ],
      {
        margin: 20,
        autoScroll: function () {
          return this.down && drake.dragging;
        },
      }
    );
  }

  closeEditMode() {
    this.webStructureService.isEditMode = false;

    console.log('EDIT MODE OFF', this.webStructureService.isEditMode);
    document.getElementById('editModeNav').style.width = '0';
  }

  openEditMode() {
    this.webStructureService.isEditMode = true;
    console.log('EDIT MODE ON', this.webStructureService.isEditMode);
    document.getElementById('editModeNav').style.width = '250px';
  }
}
