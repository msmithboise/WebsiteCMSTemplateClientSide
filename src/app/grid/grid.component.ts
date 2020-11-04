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
  items = [];
  constructor() {}

  ngOnInit(): void {}

  addItem(newItem: string) {
    this.items.push(newItem);
  }

  addRow() {
    return 'new row added!';
  }
}
