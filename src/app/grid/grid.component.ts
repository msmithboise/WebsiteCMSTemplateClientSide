import {
  Component,
  OnInit,
  Injectable,
  Renderer2,
  RendererFactory2,
  ElementRef,
} from '@angular/core';

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
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {}

  createDiv() {
    //Use Angular's Render2 to create the div element.
    const newDivContainer = this.renderer.createElement('div');

    //Set the id of the div
    this.renderer.setProperty(newDivContainer, 'id', 'new-div-container');

    //Append the created div to the body element

    this.renderer.appendChild(document.body, newDivContainer);

    this.renderer.createText('hello');

    return newDivContainer;
  }

  sayHello() {
    //Creates div
    const div = this.renderer.createElement('div');
    //Adds text to new div
    const text = this.renderer.createText('hello');

    //Appends text to div
    this.renderer.appendChild(div, text);
    // appeneds div to DOM
    this.renderer.appendChild(this.el.nativeElement, div);
  }

  hamsterGrid() {
    //number of items per row.. ex: 3
    var gridValue = '3';
    //User wants 3 elements in one row

    //

    for (let index = 0; index < this.hamsterArray.length; index++) {
      const hamster = this.hamsterArray[index];

      //At the first iteration.. what do we want to do?
      //Id like to create div, per element..
    }
    //12 returns each item in one huge column
    //return 'col-12';
    return 'col-4';
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
