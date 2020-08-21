import { Component, OnInit, OnChanges } from '@angular/core';
import { WebpageService } from '../shared/webpage.service';
import { NgForm } from '@angular/forms';
import { Webpage } from '../shared/webpage.model';
import { NgForOf, JsonPipe } from '@angular/common';
import { from, Observable } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';
import { promise, Key } from 'protractor';
import { Console } from 'console';
import { parse } from 'path';
import { TextboxComponent } from '../components/textbox/textbox.component';
import { Textbox } from '../textbox.model';
import { TextboxService } from '../shared/textbox.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnChanges {
  WebContentArray: Webpage[];
  newHeroImageUrl: string;
  newHeader: string;
  textBoxOneInstance: any;
  TextBoxContentArray: Textbox[];

  ngOnChanges() {
    this.resetForm();
    this.service.getWebPageContent();
    this.showWebContentList();
    this.callTextBoxService();
    this.editContentCss();
  }

  //adding multiple services into constructor (dependency injection)
  //For each service added, it must be added to the home constructor to communicate with the component
  constructor(
    public service: WebpageService,
    public textBoxService: TextboxService
  ) {}

  ngOnInit(): void {
    this.resetForm();
    this.resetTextBoxOneForm();
    this.service.getWebPageContent();
    this.showWebContentList();
    this.callTextBoxService();
    this.editContentCss();
  }

  //TEXT BOX ONE METHODS
  //--------------------------------------------------------------------------------

  //example of how to call from one component to another
  //Call data from textboxOne Service
  oTextBox = new TextboxComponent(this.textBoxService);

  //Get Text box one
  callTextBoxService() {
    this.textBoxService.getTextBoxOneContent().subscribe((res: Textbox[]) => {
      this.textBoxService.textBoxContentArray = res;
      this.oTextBox.populateTextBoxOneFormOnLoad();
      this.editTextBoxOneStyling();
    });
  }

  // populateTextBoxForm(item: Textbox) {
  //   this.textBoxService.textBoxOneFormData = item;
  //   //this.service.formData = Object.assign({}, item);
  // }

  //Post text box one
  postTextBoxData() {
    this.textBoxService
      .postTextBoxOneContent(this.textBoxService.textBoxOneFormData)
      .subscribe((res: Textbox[]) => {
        this.textBoxService.textBoxContentArray = res;
        console.log(this.textBoxService.textBoxOneFormData);
      });
  }

  updateSubmitedTextBoxOneData() {
    this.textBoxService.getTextBoxOneData();
    this.editTextBoxOneStyling();
  }

  //Submit text box one
  submitTextBoxOneFormData(form: NgForm) {
    if (this.textBoxService.textBoxOneFormData.Id == null)
      this.oTextBox.insertTextBoxOneRecord(form);
    else this.oTextBox.updateTextBoxOneRecord(form);
  }

  //Sets TextBoxOne settings to the data retrieved from the textbox service get.
  editTextBoxOneStyling() {
    this.myTextBoxOne.color = this.textBoxService.textBoxContentArray[0].Color;

    this.myTextBoxOne.fontSize = this.textBoxService.textBoxContentArray[0].FontSize;
    this.myTextBoxOne.textAlign = this.textBoxService.textBoxContentArray[0].TextAlign;
    this.myTextBoxOne.paddingTop = this.textBoxService.textBoxContentArray[0].PaddingTop;
    this.myTextBoxOne.paddingBottom = this.textBoxService.textBoxContentArray[0].PaddingBottom;
    this.myTextBoxOne.paddingLeft = this.textBoxService.textBoxContentArray[0].PaddingLeft;
    this.myTextBoxOne.paddingRight = this.textBoxService.textBoxContentArray[0].PaddingRight;
    //this.myTextBoxOne.top = this.textBoxService.textBoxContentArray[0].top;
    this.myTextBoxOne.bottom = this.textBoxService.textBoxContentArray[0].Bottom;
    this.myTextBoxOne.left = this.textBoxService.textBoxContentArray[0].Left;
    this.myTextBoxOne.right = this.textBoxService.textBoxContentArray[0].Right;
    this.myTextBoxOne.marginTop = this.textBoxService.textBoxContentArray[0].MarginTop;
    this.myTextBoxOne.marginBottom = this.textBoxService.textBoxContentArray[0].MarginBottom;
    this.myTextBoxOne.marginLeft = this.textBoxService.textBoxContentArray[0].MarginLeft;
    this.myTextBoxOne.marginRight = this.textBoxService.textBoxContentArray[0].MarginRight;
    this.myTextBoxOne.lineHeight = this.textBoxService.textBoxContentArray[0].LineHeight;
    this.myTextBoxOne.fontFamily = this.textBoxService.textBoxContentArray[0].FontFamily;
    this.myTextBoxOne.border = this.textBoxService.textBoxContentArray[0].Border;
    this.myTextBoxOne.borderStyle = this.textBoxService.textBoxContentArray[0].BorderStyle;
  }

  resetTextBoxOneForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.textBoxService.textBoxOneFormData = {
      Id: null,
      Color: '',
      FontSize: '',
      TextAlign: '',
      PaddingTop: '',
      PaddingBottom: '',
      PaddingLeft: '',
      PaddingRight: '',
      Top: '',
      Bottom: '',
      Left: '',
      Right: '',
      MarginTop: '',
      MarginBottom: '',
      MarginLeft: '',
      MarginRight: '',
      LineHeight: '',
      FontFamily: '',
      Border: '',
      BorderStyle: '',
    };
  }

  //HOME PAGE METHODS
  //-----------------------------------------------------------------------------------------
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
    //Submit for homepage content
    if (form.value.UserID == null) this.insertRecord(form);
    else this.updateRecord(form);

    //Submit for textbox one content
    this.submitTextBoxOneFormData(form);
  }

  insertRecord(form: NgForm) {
    this.service.postWebPageContent(form.value).subscribe((res) => {
      //this.resetForm(form);
      this.service.getWebPageContent();
    });
  }

  populateForm(item: Webpage) {
    this.service.formData = item;
    //this.service.formData = Object.assign({}, item);
  }

  populateFormOnLoad() {
    this.service.formData = {
      UserID: this.WebContentArray[0].UserID,
      Header: this.WebContentArray[0].Header,
      HeroImageURL: this.WebContentArray[0].HeroImageURL,
      Textbox1: this.WebContentArray[0].Textbox1,
      Textbox2: this.WebContentArray[0].Textbox2,
      Textbox3: this.WebContentArray[0].Textbox3,
      Textbox4: this.WebContentArray[0].Textbox4,
      Textbox5: this.WebContentArray[0].Textbox5,
      Textbox6: this.WebContentArray[0].Textbox5,
      GalleryImageURL: this.WebContentArray[0].GalleryImageURL,
      Footer: this.WebContentArray[0].Footer,
    };
  }

  //use camel case instead of dashes.. example text-align would need to be textAlign

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

  myTextBoxTwo = {
    color: '',
    fontSize: '',
    textAlign: '',
    paddingTop: '',
    paddingBottom: '',
    bottom: '',
    left: '',
    right: '',
    lineHeight: '',
    fontFamily: '',
  };

  myHeroImage = {
    height: '',
    width: '',
    backgroundPosition: '',
    opacity: '',
    backgroundSize: '',
    position: '',
    background: '',
    boxShadow: '',
    backgroundAttachment: '',
    backgroundRepeat: '',
  };

  myHeader = {
    textAlign: '',
    position: '',
    top: '',
    left: '',
    transform: '',
    color: '',
    fontSize: '',
    fontFamily: '',
  };

  myGalleryImage = {
    height: '',
    width: '',
    backgroundPosition: '',
    opacity: '',
    backgroundSize: '',
    position: '',
    paddingBottom: '',
    paddingTop: '',
  };

  myGeneralSettings = {
    backgroundColor: '',
  };

  editContentCss() {
    //this.changeTextBoxOneStyling();
    //this.oTextBox.editTextBoxOneStyling();
    this.changeTextBoxTwoStyling();
    this.changeHeroImageStyling();
    this.changeHeaderStyling();
    this.changeGalleryImageStyling();
  }

  changeGeneralSettings() {
    this.myGeneralSettings.backgroundColor = '#f8f8ff';
  }

  //This will be a default setting
  // changeTextBoxOneStyling() {
  //   this.myTextBox.color = '#505049';
  //   this.myTextBox.fontSize = '28px';
  //   this.myTextBox.textAlign = 'center';
  //   this.myTextBox.paddingTop = '50px';
  //   this.myTextBox.lineHeight = 'normal';
  //   this.myTextBox.paddingBottom = '5px';
  //   this.myTextBox.fontFamily = 'Lucida Sans Unicode';
  // }

  changeTextBoxTwoStyling() {
    this.myTextBoxTwo.color = '#505049';
    this.myTextBoxTwo.fontSize = '20px';
    this.myTextBoxTwo.textAlign = 'center';
    this.myTextBoxTwo.paddingTop = '50px';
    this.myTextBoxTwo.lineHeight = 'normal';
    this.myTextBoxTwo.paddingBottom = '5px';
    this.myTextBoxTwo.fontFamily = 'Lucida Sans Unicode';
  }

  changeHeaderStyling() {
    this.myHeader.textAlign = 'center';
    this.myHeader.position = 'absolute';
    this.myHeader.top = '50%';
    this.myHeader.left = '50%';
    this.myHeader.transform = 'translate(-50%, -50%)';
    this.myHeader.color = '#f8f8ff';
    this.myHeader.fontSize = '60px';
    this.myHeader.fontFamily = 'Lucida Sans Unicode';
  }

  changeHeroImageStyling() {
    this.myHeroImage.height = '1000px';
    this.myHeroImage.width = '2000px';
    this.myHeroImage.backgroundAttachment = 'fixed';
    this.myHeroImage.backgroundPosition = 'center';
    this.myHeroImage.backgroundRepeat = 'no-repeat';
    this.myHeroImage.backgroundSize = 'cover';
    //this.myHeroImage.opacity = '0.9';
    // this.myHeroImage.position = 'center';
    this.myHeroImage.boxShadow = 'inset 0 0 0 2000px rgba(255, 0, 150, 0.3);';
  }

  changeGalleryImageStyling() {
    this.myGalleryImage.height = '600px';
    this.myGalleryImage.width = '2000px';
    this.myGalleryImage.backgroundPosition = 'center';
    //this.myHeroImage.opacity = '0.9';
    this.myGalleryImage.backgroundSize = 'cover';
    //this.myHeroImage.position = '';
    this.myGalleryImage.paddingBottom = '50px';
    this.myGalleryImage.paddingTop = '50px';
  }

  updateRecord(form: NgForm) {
    this.service.putWebPageContent(form.value).subscribe((res) => {
      //this.resetForm(form);
      this.service.getWebPageContent();
    });
  }

  onDelete(id: number) {
    this.service.deleteWebPageContent(id).subscribe((res) => {
      this.service.getWebPageContent();
      this.resetForm();
    });
  }

  showWebContentList() {
    this.service.getContent().subscribe((res: Webpage[]) => {
      this.WebContentArray = res;
      this.populateFormOnLoad();
    });
  }
}
