import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  public allContentWithRowId1 = [];
  public allContentWithRowId2 = [];

  public serviceArray = [];
  public localArray = [];

  constructor() {}

  ngOnInit(): void {
    this.getArrayOne();
  }

  getArrayOne() {
    //Simulating first getByRowId()
    var res = ['one', 'two', 'three'];
    this.serviceArray = res;

    this.localArray.push(res);

    this.getArrayTwo();
  }

  getArrayTwo() {
    var res = ['four', 'five', 'six'];
    this.serviceArray = res;

    this.localArray.push(res);
  }

  //The solution seems to have a get grab each array but push it into a new array and then ngFor that...
}
