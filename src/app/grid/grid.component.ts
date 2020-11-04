import {
  Component,
  OnInit,
  Injectable,
  Renderer2,
  RendererFactory2,
  ElementRef,
  ViewChild,
  Input,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  @ViewChild('myname') input: ElementRef;
  row = '';
  inputName = '';
  elements = [];
  columns = [];
  constructor() {}

  ngOnInit(): void {}

  addElement(newElement: string) {
    this.elements.push(newElement);
    console.log('element array');
    console.log(this.elements);
  }

  addColumn(newColumn: string) {
    this.columns.push(newColumn);
    console.log('column array');
    console.log(this.columns);
  }

  addRow() {
    return 'new row added!';
  }
}
