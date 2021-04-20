import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

import autoScroll from 'dom-autoscroller';
import * as dragula from 'dragula';

@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.css'],
})

//@ViewChild('autoscroll') autoscroll: ElementRef;
export class EditModeComponent implements OnInit {
  public characters = [
    { id: 1, firstName: `Text` },
    { id: 2, firstName: `Background Image` },
    { id: 3, firstName: `Button` },
    { id: 4, firstName: `Audio` },
    { id: 5, firstName: `Video` },
  ];

  selectedCharacters = [];

  constructor(private dragulaService: DragulaService) {}

  ngOnInit(): void {
    // this.createDragulaGroup();
    this.dragulaInit();
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
