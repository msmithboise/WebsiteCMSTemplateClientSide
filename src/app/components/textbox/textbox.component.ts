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
  constructor(public textBoxOneService: TextboxService) {}

  ngOnInit(): void {}

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
