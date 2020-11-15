import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebcontentService } from '../WebContent/webcontent.service';

@Component({
  selector: 'app-button-panel',
  templateUrl: './button-panel.component.html',
  styleUrls: ['./button-panel.component.css'],
})
export class ButtonPanelComponent implements OnInit {
  @Input() columnId: number;
  constructor(public webContentService: WebcontentService) {}

  ngOnInit(): void {}

  //To submit text body data
  submitNewTextData(form: FormGroup) {
    console.log('columnId', this.columnId);
    this.insertTextRecord(form);
  }

  textFormTemplate = new FormGroup({
    TextBody: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    columnId: new FormControl(''),
  });

  insertTextRecord(form: FormGroup) {
    var newForm = this.textFormTemplate.value;
    newForm.pageId = this.webContentService.pageIdSnapshot;
    newForm.columnId = this.columnId;

    this.webContentService.postWebContentByPageId(newForm).subscribe((res) => {
      //this.resetForm(form);
      //this.grabAllContentByPageId();
    });
  }
}
