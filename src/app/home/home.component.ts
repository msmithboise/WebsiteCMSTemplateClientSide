import { Component, OnInit } from '@angular/core';
import { WebpageService } from '../shared/webpage.service';
import { NgForm } from '@angular/forms';
import { Webpage } from '../shared/webpage.model';
import { NgForOf } from '@angular/common';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public service: WebpageService) {}

  ngOnInit(): void {
    this.resetForm();
    this.service.refreshList();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      UserID: null,
      Header: '',
      HeroImageURL: '',
      Textbox1: '',
      Textbox2: '',
      Textbox3: '',
      Textbox4: '',
      Textbox5: '',
      Textbox6: '',
      GalleryImageURL: '',
      Footer: '',
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.UserID == null) this.insertRecord(form);
    else this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postWebPageContent(form.value).subscribe((res) => {
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  populateForm(item: Webpage) {
    //this.service.formData = item;
    this.service.formData = Object.assign({}, item);
  }

  updateRecord(form: NgForm) {
    this.service.putWebPageContent(form.value).subscribe((res) => {
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  onDelete(id: number) {
    this.service.deleteWebPageContent(id).subscribe((res) => {
      this.service.refreshList();
    });
  }
}
