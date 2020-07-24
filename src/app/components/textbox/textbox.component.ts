import { Component, OnInit } from '@angular/core';
import { TextboxService } from 'src/app/shared/textbox.service';
import { Textbox } from 'src/app/textbox.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css'],
})
export class TextboxComponent implements OnInit {
  TextBoxContentArray: Textbox[];
  constructor(public service: TextboxService) {}

  ngOnInit(): void {
    this.showTextBoxContentList();
  }

  showTextBoxContentList() {
    this.service.getTextBoxOneContent().subscribe((res: Textbox[]) => {
      this.TextBoxContentArray = res;
      console.log('the data set to the textbox content array');
      console.log(this.TextBoxContentArray);

      this.populateTextBoxOneFormOnLoad();
    });
  }

  editTextBoxOneStyling() {
    this.myTextBoxOne.color = this.TextBoxContentArray[0].color;
    this.myTextBoxOne.fontSize = this.TextBoxContentArray[0].fontSize;
    this.myTextBoxOne.textAlign = this.TextBoxContentArray[0].textAlign;
    this.myTextBoxOne.paddingTop = this.TextBoxContentArray[0].paddingTop;
    this.myTextBoxOne.paddingBottom = this.TextBoxContentArray[0].paddingBottom;
    this.myTextBoxOne.paddingLeft = this.TextBoxContentArray[0].paddingLeft;
    this.myTextBoxOne.paddingRight = this.TextBoxContentArray[0].paddingRight;
    //this.myTextBoxOne.top = this.TextBoxContentArray[0].top;
    this.myTextBoxOne.bottom = this.TextBoxContentArray[0].bottom;
    this.myTextBoxOne.left = this.TextBoxContentArray[0].left;
    this.myTextBoxOne.right = this.TextBoxContentArray[0].right;
    this.myTextBoxOne.marginTop = this.TextBoxContentArray[0].marginTop;
    this.myTextBoxOne.marginBottom = this.TextBoxContentArray[0].marginBottom;
    this.myTextBoxOne.marginLeft = this.TextBoxContentArray[0].marginLeft;
    this.myTextBoxOne.marginRight = this.TextBoxContentArray[0].marginRight;
    this.myTextBoxOne.lineHeight = this.TextBoxContentArray[0].lineHeight;
    this.myTextBoxOne.fontFamily = this.TextBoxContentArray[0].fontFamily;
    this.myTextBoxOne.border = this.TextBoxContentArray[0].border;
    this.myTextBoxOne.borderStyle = this.TextBoxContentArray[0].borderStyle;
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
    this.service.textBoxOneFormData = {
      Id: this.TextBoxContentArray[0].Id,
      color: this.TextBoxContentArray[0].color,
      fontSize: this.TextBoxContentArray[0].fontSize,
      textAlign: this.TextBoxContentArray[0].textAlign,
      paddingTop: this.TextBoxContentArray[0].paddingTop,
      paddingBottom: this.TextBoxContentArray[0].paddingBottom,
      paddingLeft: this.TextBoxContentArray[0].paddingLeft,
      paddingRight: this.TextBoxContentArray[0].paddingRight,
      top: this.TextBoxContentArray[0].top,
      bottom: this.TextBoxContentArray[0].bottom,
      left: this.TextBoxContentArray[0].left,
      right: this.TextBoxContentArray[0].right,
      marginTop: this.TextBoxContentArray[0].marginTop,
      marginBottom: this.TextBoxContentArray[0].marginBottom,
      marginLeft: this.TextBoxContentArray[0].marginLeft,
      marginRight: this.TextBoxContentArray[0].marginRight,
      lineHeight: this.TextBoxContentArray[0].lineHeight,
      fontFamily: this.TextBoxContentArray[0].fontFamily,
      border: this.TextBoxContentArray[0].border,
      borderStyle: this.TextBoxContentArray[0].borderStyle,
    };
  }

  insertTextBoxOneRecord(form: NgForm) {
    this.service.postTextBoxOneContent(form.value).subscribe((res) => {
      //this.resetForm(form);
      this.service.getTextBoxOneContent();
    });
  }

  onTextBoxOneSubmit(form: NgForm) {
    // if (form.value.UserID == null) this.insertTextBoxOneRecord(form);
    // else this.updateRecord(form);
    this.insertTextBoxOneRecord(form);
  }
}
