import { Component, Input, OnInit } from '@angular/core';
import { WebStructureService } from '../web-structure.service';

@Component({
  selector: 'app-row-view',
  templateUrl: './row-view.component.html',
  styleUrls: ['./row-view.component.css'],
})
export class RowViewComponent implements OnInit {
  //@Input() rowId: number;
  constructor(public webStructureService: WebStructureService) {}

  ngOnInit(): void {}
}
