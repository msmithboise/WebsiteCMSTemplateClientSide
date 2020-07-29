import { Component, OnInit, Injectable } from '@angular/core';
import { TextboxService } from 'src/app/shared/textbox.service';
import { Textbox } from 'src/app/textbox.model';
import { NgForm } from '@angular/forms';
import { HomeComponent } from 'src/app/home/home.component';
import { WebpageService } from 'src/app/shared/webpage.service';
import { Webpage } from 'src/app/shared/webpage.model';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css'],
})
@Injectable()
export class TextboxComponent implements OnInit {
  TextBoxContentArray: Textbox[];
  textBoxService: any;
  webPageService: WebpageService;
  constructor(public textBoxOneService: TextboxService) {
    // this.textBoxService = TextboxService;
  }

  ngOnInit(): void {
    //this.showTextBoxContentList();
    this.manageTextBoxStyling();
    this.populateTextBoxOneFormOnLoad();
  }

  showTextBoxContentList() {
    this.textBoxOneService
      .getTextBoxOneContent()
      .subscribe((res: Textbox[]) => {
        this.textBoxOneService.textBoxContentArray = res;
        console.log(
          'the data set to the textbox content array from within the textbox service'
        );
        console.log(this.textBoxOneService.textBoxContentArray);
      });
  }

  manageTextBoxStyling() {
    //Sets myTextBoxOne to TexBoxContentArray data
    this.editTextBoxOneStyling();
    //The form resets to whatever the user types in.
    this.populateTextBoxOneFormOnLoad();
  }

  editTextBoxOneStyling() {
    this.myTextBoxOne.color = this.textBoxOneService.textBoxContentArray[0].Color;

    this.myTextBoxOne.fontSize = this.textBoxOneService.textBoxContentArray[0].FontSize;
    this.myTextBoxOne.textAlign = this.textBoxOneService.textBoxContentArray[0].TextAlign;
    this.myTextBoxOne.paddingTop = this.textBoxOneService.textBoxContentArray[0].PaddingTop;
    this.myTextBoxOne.paddingBottom = this.textBoxOneService.textBoxContentArray[0].PaddingBottom;
    this.myTextBoxOne.paddingLeft = this.textBoxOneService.textBoxContentArray[0].PaddingLeft;
    this.myTextBoxOne.paddingRight = this.textBoxOneService.textBoxContentArray[0].PaddingRight;
    //this.myTextBoxOne.top = this.textBoxOneService.textBoxContentArray[0].top;
    this.myTextBoxOne.bottom = this.textBoxOneService.textBoxContentArray[0].Bottom;
    this.myTextBoxOne.left = this.textBoxOneService.textBoxContentArray[0].Left;
    this.myTextBoxOne.right = this.textBoxOneService.textBoxContentArray[0].Right;
    this.myTextBoxOne.marginTop = this.textBoxOneService.textBoxContentArray[0].MarginTop;
    this.myTextBoxOne.marginBottom = this.textBoxOneService.textBoxContentArray[0].MarginBottom;
    this.myTextBoxOne.marginLeft = this.textBoxOneService.textBoxContentArray[0].MarginLeft;
    this.myTextBoxOne.marginRight = this.textBoxOneService.textBoxContentArray[0].MarginRight;
    this.myTextBoxOne.lineHeight = this.textBoxOneService.textBoxContentArray[0].LineHeight;
    this.myTextBoxOne.fontFamily = this.textBoxOneService.textBoxContentArray[0].FontFamily;
    this.myTextBoxOne.border = this.textBoxOneService.textBoxContentArray[0].Border;
    this.myTextBoxOne.borderStyle = this.textBoxOneService.textBoxContentArray[0].BorderStyle;
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
      Id: this.textBoxOneService.textBoxContentArray[0].Id,
      Color: this.textBoxOneService.textBoxContentArray[0].Color,
      FontSize: this.textBoxOneService.textBoxContentArray[0].FontSize,
      TextAlign: this.textBoxOneService.textBoxContentArray[0].TextAlign,
      PaddingTop: this.textBoxOneService.textBoxContentArray[0].PaddingTop,
      PaddingBottom: this.textBoxOneService.textBoxContentArray[0]
        .PaddingBottom,
      PaddingLeft: this.textBoxOneService.textBoxContentArray[0].PaddingLeft,
      PaddingRight: this.textBoxOneService.textBoxContentArray[0].PaddingRight,
      Top: this.textBoxOneService.textBoxContentArray[0].Top,
      Bottom: this.textBoxOneService.textBoxContentArray[0].Bottom,
      Left: this.textBoxOneService.textBoxContentArray[0].Left,
      Right: this.textBoxOneService.textBoxContentArray[0].Right,
      MarginTop: this.textBoxOneService.textBoxContentArray[0].MarginTop,
      MarginBottom: this.textBoxOneService.textBoxContentArray[0].MarginBottom,
      MarginLeft: this.textBoxOneService.textBoxContentArray[0].MarginLeft,
      MarginRight: this.textBoxOneService.textBoxContentArray[0].MarginRight,
      LineHeight: this.textBoxOneService.textBoxContentArray[0].LineHeight,
      FontFamily: this.textBoxOneService.textBoxContentArray[0].FontFamily,
      Border: this.textBoxOneService.textBoxContentArray[0].Border,
      BorderStyle: this.textBoxOneService.textBoxContentArray[0].BorderStyle,
    };

    console.log('Here is your color:');
    console.log(this.textBoxOneService.textBoxOneFormData.Color);
    console.log('Here is your font size:');
    console.log(this.textBoxOneService.textBoxOneFormData.FontSize);
  }

  //Insert - TextBoxOne
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
