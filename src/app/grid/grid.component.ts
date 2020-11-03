import {
  Component,
  OnInit,
  Injectable,
  Renderer2,
  RendererFactory2,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  ngOnInit(): void {
    this.createDivsOnLoad();
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  formTemplate = new FormGroup({
    colSize: new FormControl(''),
  });

  onSubmit(form: FormGroup) {
    var newForm = this.formTemplate.value;
    var colSize = newForm.colSize;

    console.log('column size');
    console.log(colSize);

    this.createTwoDivs(colSize);
  }

  createElementWithClass(elementName: string, className: string) {
    var elClass = document.createElement(elementName);
    elClass.className = className;

    return elClass;
  }

  createDivsOnLoad() {
    console.log('creating divs on load');
    //Create container
    var divContainer = this.renderer.createElement('div');
    // makes div into container
    this.renderer.addClass(divContainer, 'container-fluid');
    //Set id to container
    this.renderer.setProperty(divContainer, 'id', 'new-div-container');
    //Create row
    var divRow = this.renderer.createElement('div');

    //Set id to row
    this.renderer.setProperty(divRow, 'id', 'new-div-row');

    //Append row to container
    divContainer.appendChild(divRow);

    //Append container to wrapper

    document.getElementById('div-wrapper').appendChild(divContainer);
  }

  createTwoDivs(colSize: number) {
    //Create container
    var divContainer = this.createElementWithClass('div', 'container-fluid');
    //Set id to container
    this.renderer.setProperty(divContainer, 'id', 'new-div-container');
    //Create row
    var divRow = this.createElementWithClass('div', 'row');
    //Create Columns
    var divCol1 = this.createElementWithClass('div', 'col-' + colSize);
    var divCol2 = this.createElementWithClass('div', 'col-' + colSize);
    var divCol3 = this.createElementWithClass('div', 'col-' + colSize);

    //Create test text
    const text1 = this.renderer.createText('hello');
    const text2 = this.renderer.createText('how are you?');
    const text3 = this.renderer.createText('good bye');

    //Append test text to each column
    this.renderer.appendChild(divCol1, text1);
    this.renderer.appendChild(divCol2, text2);
    this.renderer.appendChild(divCol3, text3);

    //Append row to container
    divContainer.appendChild(divRow);

    //Append columns to row
    divRow.appendChild(divCol1);
    divRow.appendChild(divCol2);
    divRow.appendChild(divCol3);

    //Append container to wrapper

    document.getElementById('div-wrapper').appendChild(divContainer);
  }

  divContainer() {
    console.log('creating div container');
    //Creates div
    const div = this.renderer.createElement('div');
    // makes div into container
    this.renderer.addClass(div, 'container-fluid');

    //Set the id of the container
    this.renderer.setProperty(div, 'id', 'new-div-container');

    // appeneds div to DOM
    this.renderer.appendChild(this.el.nativeElement, div);
  }

  divRow() {
    //Creates div
    const div = this.renderer.createElement('div');
    // makes div into row
    this.renderer.addClass(div, 'row');

    //Set the id of the container
    this.renderer.setProperty(div, 'id', 'new-div-row');

    // appeneds div to DOM
    this.renderer.appendChild(this.el.nativeElement, div);
  }

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

    //Appends class to div
    this.renderer.addClass(div, 'blue');

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
