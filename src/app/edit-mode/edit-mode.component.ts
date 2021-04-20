import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.css'],
})
export class EditModeComponent implements OnInit {
  public testArray = [];
  public characters = [
    { id: 1, firstName: `Jeffry`, lastName: 'Houser' },
    { id: 2, firstName: `Annie`, lastName: 'Anderson' },
    { id: 3, firstName: `Bob`, lastName: 'Boberson' },
    { id: 4, firstName: `Candy`, lastName: 'Canderson' },
    { id: 5, firstName: `Davey`, lastName: 'Daverson' },
  ];

  constructor(private dragulaService: DragulaService) {}

  ngOnInit(): void {
    this.dragulaService.createGroup('DRAGULA_CONTAINER', {});
    this.setTestArray();
  }

  setTestArray() {
    this.testArray = ['one', 'two', 'three'];
    console.log(this.testArray);
  }
}
