import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-child',
  templateUrl: './grid-child.component.html',
  styleUrls: ['./grid-child.component.css'],
})
export class GridChildComponent implements OnInit {
  @Input() item: string;
  constructor() {}

  ngOnInit(): void {}
}
