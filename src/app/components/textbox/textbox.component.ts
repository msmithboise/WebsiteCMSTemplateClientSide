import { Component, OnInit, Injectable } from '@angular/core';
import { TextboxService } from 'src/app/shared/textbox.service';
import { Textbox } from 'src/app/textbox.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css'],
})
@Injectable()
export class TextboxComponent implements OnInit {
  TextBoxContentArray: Textbox[];
  textBoxService: any;
  constructor(public textBoxOneService: TextboxService) {
    // this.textBoxService = TextboxService;
  }

  ngOnInit(): void {
    this.showTextBoxContentList();
  }

  showTextBoxContentList() {
    this.textBoxOneService
      .getTextBoxOneContent()
      .subscribe((res: Textbox[]) => {
        this.TextBoxContentArray = res;
        console.log('the data set to the textbox content array');
        console.log(this.TextBoxContentArray);

        this.manageTextBoxStyling();
      });
  }

  manageTextBoxStyling() {
    this.populateTextBoxOneFormOnLoad();
    this.editTextBoxOneStyling();
  }

  editTextBoxOneStyling() {
    this.myTextBoxOne.color = this.TextBoxContentArray[0].Color;

    this.myTextBoxOne.fontSize = this.TextBoxContentArray[0].FontSize;
    this.myTextBoxOne.textAlign = this.TextBoxContentArray[0].TextAlign;
    this.myTextBoxOne.paddingTop = this.TextBoxContentArray[0].PaddingTop;
    this.myTextBoxOne.paddingBottom = this.TextBoxContentArray[0].PaddingBottom;
    this.myTextBoxOne.paddingLeft = this.TextBoxContentArray[0].PaddingLeft;
    this.myTextBoxOne.paddingRight = this.TextBoxContentArray[0].PaddingRight;
    //this.myTextBoxOne.top = this.TextBoxContentArray[0].top;
    this.myTextBoxOne.bottom = this.TextBoxContentArray[0].Bottom;
    this.myTextBoxOne.left = this.TextBoxContentArray[0].Left;
    this.myTextBoxOne.right = this.TextBoxContentArray[0].Right;
    this.myTextBoxOne.marginTop = this.TextBoxContentArray[0].MarginTop;
    this.myTextBoxOne.marginBottom = this.TextBoxContentArray[0].MarginBottom;
    this.myTextBoxOne.marginLeft = this.TextBoxContentArray[0].MarginLeft;
    this.myTextBoxOne.marginRight = this.TextBoxContentArray[0].MarginRight;
    this.myTextBoxOne.lineHeight = this.TextBoxContentArray[0].LineHeight;
    this.myTextBoxOne.fontFamily = this.TextBoxContentArray[0].FontFamily;
    this.myTextBoxOne.border = this.TextBoxContentArray[0].Border;
    this.myTextBoxOne.borderStyle = this.TextBoxContentArray[0].BorderStyle;
  }

  myTextBoxOne = {
    color: '',
    fontSize: '',
    textAlign: '',
    paddingTop: '',
    paddingBottom: '',
    paddingLeft: '',
    paddingRight: '',
    top,
    bottom: '',
    left: '',
    right: '',
    marginTop: '',
    marginBottom: '',
    marginLeft: '',
    marginRight: '',
    lineHeight: '',
    fontFamily: '',
    border: '',
    borderStyle: '',
  };

  populateTextBoxOneFormOnLoad() {
    this.textBoxOneService.textBoxOneFormData = {
      Id: this.TextBoxContentArray[0].Id,
      Color: this.TextBoxContentArray[0].Color,
      FontSize: this.TextBoxContentArray[0].FontSize,
      TextAlign: this.TextBoxContentArray[0].TextAlign,
      PaddingTop: this.TextBoxContentArray[0].PaddingTop,
      PaddingBottom: this.TextBoxContentArray[0].PaddingBottom,
      PaddingLeft: this.TextBoxContentArray[0].PaddingLeft,
      PaddingRight: this.TextBoxContentArray[0].PaddingRight,
      Top: this.TextBoxContentArray[0].Top,
      Bottom: this.TextBoxContentArray[0].Bottom,
      Left: this.TextBoxContentArray[0].Left,
      Right: this.TextBoxContentArray[0].Right,
      MarginTop: this.TextBoxContentArray[0].MarginTop,
      MarginBottom: this.TextBoxContentArray[0].MarginBottom,
      MarginLeft: this.TextBoxContentArray[0].MarginLeft,
      MarginRight: this.TextBoxContentArray[0].MarginRight,
      LineHeight: this.TextBoxContentArray[0].LineHeight,
      FontFamily: this.TextBoxContentArray[0].FontFamily,
      Border: this.TextBoxContentArray[0].Border,
      BorderStyle: this.TextBoxContentArray[0].BorderStyle,
    };

    console.log('Here is your color:');
    console.log(this.textBoxOneService.textBoxOneFormData.Color);
    console.log('Here is your font size:');
    console.log(this.textBoxOneService.textBoxOneFormData.FontSize);
  }

  //Insert
  insertTextBoxOneRecord(form: NgForm) {
    this.textBoxOneService
      .postTextBoxOneContent(form.value)
      .subscribe((res) => {
        //this.resetForm(form);
        this.textBoxOneService.getTextBoxOneContent();
      });
  }

  //Submit
  onTextBoxOneSubmit(form: NgForm) {
    if (this.textBoxOneService.textBoxOneFormData.Id == null)
      this.insertTextBoxOneRecord(form);
    else this.updateTextBoxOneRecord(form);
    this.insertTextBoxOneRecord(form);
  }

  updateTextBoxOneRecord(form: NgForm) {
    this.textBoxOneService
      .updateTextBoxOneContent(form.value)
      .subscribe((res) => {
        //this.resetForm(form);
        this.textBoxOneService.getTextBoxOneContent();
      });
  }
}
