import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { WebStructureService } from '../web-structure.service';
import { WebcontentService } from '../WebContent/webcontent.service';

@Component({
  selector: 'app-row-view',
  templateUrl: './row-view.component.html',
  styleUrls: ['./row-view.component.css'],
})
export class RowViewComponent implements OnInit {
  public pageId: number;
  //@Input() rowId: number;
  constructor(
    public webStructureService: WebStructureService,
    public dragulaService: DragulaService,
    public webContentService: WebcontentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
