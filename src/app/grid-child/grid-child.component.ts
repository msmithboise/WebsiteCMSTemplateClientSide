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
  @Output() newElementEvent = new EventEmitter<string>();
  @Output() newColumnEvent = new EventEmitter<string>();
  @Output() newContentEvent = new EventEmitter<string>();
  @Output() refreshEvent = new EventEmitter<any>();

  constructor(private renderer: Renderer2) {}

  refreshPage() {
    console.log('clicking in child component');
    this.refreshEvent.next('refresh');
  }

  ngOnChanges() {
    this.logName();
  }

  addNewElement(value: string) {
    console.log('testing emit');

    //create div

    const div = this.renderer.createElement('div');

    this.newElementEvent.emit(value);
  }

  addNewColumn(value: string) {
    console.log('testing adding columns');

    //create div

    const div = this.renderer.createElement('div');

    //Add column class to div (size specified by input value)
    //this.renderer.addClass(div,'col-' + value)

    value = 'col-' + value;

    this.newColumnEvent.emit(value);
  }

  addNewContent(value: string) {
    console.log('testing adding content');

    //create div

    const div = this.renderer.createElement('div');

    //Add column class to div (size specified by input value)
    //this.renderer.addClass(div,'col-' + value)

    this.newContentEvent.emit(value);
  }

  logName() {
    return this.row;
  }
}
