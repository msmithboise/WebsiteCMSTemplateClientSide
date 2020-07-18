import { Component, OnInit } from '@angular/core';
import { TextboxService } from 'src/app/shared/textbox.service';
import { Textbox } from 'src/app/textbox.model';

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
    this.service.getContent().subscribe((res: Textbox[]) => {
      this.TextBoxContentArray = res;
      console.log('the data set to the textbox content array');
      console.log(this.TextBoxContentArray);
      //this.manageWebContentArray();
    });
  }
}
