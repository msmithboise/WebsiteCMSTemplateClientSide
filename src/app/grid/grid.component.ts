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
  webContent = [];
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  refresh(newSomething: any) {}

  addElement(newElement: string) {
    this.elements.push(newElement);
  }

  addColumn(newColumn: string) {
    this.columns.push(newColumn);
  }

  addContent(newContent: string) {
    this.webContent.push(newContent);
  }

  addRow() {
    return 'new row added!';
  }
}
