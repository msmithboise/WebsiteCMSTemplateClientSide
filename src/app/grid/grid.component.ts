import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  public gridControl: string;
  public gridItem1 = 'col-3';
  public gridItem2 = 'col-3';
  public gridItem3 = 'col-3';
  public hamsterOne =
    'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80';
  public hamsterTwo =
    'https://images.unsplash.com/photo-1584553421349-3557471bed79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1329&q=80';
  public hamsterThree =
    'https://images.unsplash.com/photo-1548412342-98d0d2a49205?ixlib=rb-1.2.1&auto=format&fit=crop&w=1225&q=80';
  public hamsterArray = [this.hamsterOne, this.hamsterTwo, this.hamsterThree];
  constructor() {}

  ngOnInit(): void {}

  hamsterGrid() {
    return 'col-3';
  }

  gridSystem1() {
    return this.gridItem1;
  }

  gridSystem2() {
    return this.gridItem2;
  }

  gridSystem3() {
    return this.gridItem3;
  }
}
