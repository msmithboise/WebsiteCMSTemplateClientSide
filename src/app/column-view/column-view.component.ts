import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Column } from '../models/column.model';
import { WebStructureService } from '../web-structure.service';

@Component({
  selector: 'app-column-view',
  templateUrl: './column-view.component.html',
  styleUrls: ['./column-view.component.css'],
})
export class ColumnViewComponent implements OnInit {
  @Input() rowId: number;
  public pageId: number;
  columnLists: Column[];
  newColumnList: Column[];
  innerWidth: number;

  constructor(
    public webStructureService: WebStructureService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getColumnsByRowId(this.rowId);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;

    console.log(this.innerWidth);
  }

  // 320px - 768px
  isMobile() {
    if (window.innerWidth <= 768) {
      return true;
    }
  }

  //my screen 1920px
  // 2560px >
  isDesktop() {
    if (window.innerWidth > 1400) {
      return true;
    }
  }

  //768px - 1024px
  isTablet() {
    if (window.innerWidth > 768 && window.innerWidth <= 1024) {
      return true;
    }
  }

  // 1024px - 2560px
  isLaptop() {
    if (window.innerWidth > 1024 && window.innerWidth <= 1400) {
      return true;
    }
  }

  //get columns by row id and page id
  getColumnsByRowId(rowId: number) {
    this.webStructureService
      .getColumnLists(this.rowId)
      .subscribe((res: Column) => {
        this.columnLists = res[0];

        this.newColumnList = this.columnLists;
      });
  }
}
