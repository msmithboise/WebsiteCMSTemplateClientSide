import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid-child',
  templateUrl: './grid-child.component.html',
  styleUrls: ['./grid-child.component.css'],
})
export class GridChildComponent implements OnChanges {
  @Input() row: string;
  @Input() bindName: string;
  @Output() newItemEvent = new EventEmitter<string>();
  constructor(private renderer: Renderer2) {}

  ngOnChanges() {
    this.logName();
  }

  addNewItem(value: string) {
    console.log('testing emit');

    //create div

    const div = this.renderer.createElement('div');

    this.newItemEvent.emit(value);
  }

  logName() {
    return this.row;
  }
}
