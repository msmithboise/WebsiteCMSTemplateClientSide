import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DragulaService, DrakeFactory } from 'ng2-dragula';

import autoScroll from 'dom-autoscroller';
import * as dragula from 'dragula';
import { WebStructureService } from '../web-structure.service';

@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.css'],
})

//@ViewChild('autoscroll') autoscroll: ElementRef;
export class EditModeComponent implements OnInit, OnDestroy {
  public toolbox = [
    { id: 1, feature: `Text` },
    { id: 2, feature: `Background Image` },
    { id: 3, feature: `Button` },
    { id: 4, feature: `Audio` },
    { id: 5, feature: `Video` },
  ];

  public newToolBox = [];

  constructor(
    private dragulaService: DragulaService,
    public webStructureService: WebStructureService
  ) {}

  ngOnInit(): void {
    this.dragInit();
    // this.createDragulaGroup();
    // this.dragulaInit();
  }

  ngOnDestroy() {
    this.dragulaService.destroy('FEATURES');
  }

  onClick() {
    console.log('feature clicked!');
    console.log('new tool box', this.webStructureService.newToolBox);
  }

  dragInit() {
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
}
