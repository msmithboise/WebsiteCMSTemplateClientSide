import { Component, OnInit } from '@angular/core';
import { CustomPageService } from 'src/app/services/custom-page.service';
import { CustomPage } from 'src/app/models/custom-page.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomImageService } from 'src/app/services/custom-image.service';
import { CustomImage } from 'src/app/models/custom-image.model';
import { Key } from 'protractor';
import { CustomTextService } from 'src/app/services/custom-text.service';
import { CustomText } from 'src/app/models/custom-text.model';
import { WebcontentService } from 'src/app/WebContent/webcontent.service';
import { Webcontent } from 'src/app/WebContent/webcontent.model';
import { Console } from 'console';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.css'],
})
export class CustomPageComponent implements OnInit {
  constructor(
    public customPageService: CustomPageService,
    public customImageService: CustomImageService,
    public customTextService: CustomTextService,
    public webContentService: WebcontentService,
    private route: ActivatedRoute
  ) {}

  customPageArray: CustomPage[];
  pageIdSnapshot: number;

  webContentByPageIdArray: Webcontent[];
  selectedPageId: number;
  filteredImageArray: CustomImage[];
  public show: boolean = false;
  public buttonName: any = 'Show';

  ngOnInit(): void {
    this.callCustomPageService();
    this.takePageIdSnapshot();
    this.grabAllContentByPageId();
    this.getAllStyleSettings();
  }

  toggleAddButton() {
    this.show = !this.show;
    console.log('adding text...');
  }

  onSubmit(form: NgForm) {
    //Submit for homepage content
    console.log('submitting...');
    console.log(form);
    this.insertRecord(form);
  }

  submitNewTextData(form: NgForm) {
    console.log('got yo hamster son....');
    console.log(form.value);

    this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    console.log('hamster should be here in insertRecord..');
    console.log(form.value);
    this.webContentService
      .postWebContentByPageId(form.value)
      .subscribe((res) => {
        //this.resetForm(form);
        this.grabAllContentByPageId();
      });
  }

  grabAllContentByPageId() {
    this.webContentService.pageIdSnapshot = this.pageIdSnapshot;
    console.log('webcontentservice pg id snapshot');
    console.log(this.webContentService.pageIdSnapshot);
    this.customImageService
      .getWebContentByPageId(this.pageIdSnapshot)
      .subscribe((res: Webcontent[]) => {
        this.webContentService.webContentArray = res;
        this.getAllStyleSettings();
        // console.log('Here is the images based on page id: ');
        // console.log(this.imagesByPageIdArray);
      });
  }

  // postWebContentByPageId() {
  //   this.webContentService
  //     .postWebContentByPageId(
  //       this.webContentService.formData,
  //       this.pageIdSnapshot
  //     )
  //     .subscribe((res: CustomText[]) => {
  //       this.textByPageIdArray = res;
  //     });
  // }

  takePageIdSnapshot() {
    this.pageIdSnapshot = +this.route.snapshot.paramMap.get('pageId');

    this.customPageService
      .getPageById(this.pageIdSnapshot)
      .subscribe((res: CustomPage) => {
        this.customPageService.customPageArrayById = res;
      });
  }

  activatePagesById() {
    const pageId = this.route.snapshot.params['pageId'];
    this.selectedPageId = +this.getCustomPageById(pageId);
  }

  //Set Custom Page data to customPage service array
  callCustomPageService() {
    this.customPageService
      .getCustomPageContent()
      .subscribe((res: CustomPage[]) => {
        this.customPageService.customPageArray = res;
      });
  }

  //Post text box one
  postCustomPageData() {
    this.customPageService
      .createCustomPage(this.customPageService.pageFormData)
      .subscribe((res: CustomPage[]) => {
        this.customPageService.customPageArray = res;
      });
  }

  insertCustomPageRecord(form: NgForm) {
    this.customPageService.createCustomPage(form.value).subscribe((res) => {
      //this.resetForm(form);
      this.customPageService.getCustomPageContent();
    });
  }

  onCustomPageSubmit(form: NgForm) {
    //Submit for custom page content
    this.insertCustomPageRecord(form);
    console.log('hee hee that tickles!');
  }

  getCustomPageById(pageId: number): CustomPage {
    return this.customPageService.customPageArray.find(
      (x) => x.PageId === pageId
    );
  }

  myContent: Webcontent = {
    Id: null,
    PageId: null,
    TextBody: '',
    ImageUrl: '',
    DateCreated: null,
    isText: '',
    isImage: '',
    TextId: null,
    ImageId: null,
    SettingsId: null,
    backgroundAttachment: '',
    backgroundClip: '',
    backgroundImage: '',
    backgroundOrigin: '',
    backgroundPosition: '',
    backgroundRepeat: '',
    backgroundSize: '',
    background: '',
    border: '',
    borderBottom: '',
    borderBottomColor: '',
    borderBottomLeftRadius: '',
    borderBottomRightRadius: '',
    borderBottomStyle: '',
    borderBottomWidth: '',
    borderColor: '',
    borderImage: '',
    borderImageOutset: '',
    borderImageRepeat: '',
    borderImageSlice: '',
    borderImageSource: '',
    borderImageWidth: '',
    borderLeft: '',
    borderLeftColor: '',
    borderLeftStyle: '',
    borderLeftWidth: '',
    borderStyle: '',
    borderTop: '',
    borderTopColor: '',
    borderTopLeftRadius: '',
    borderTopRightRadius: '',
    borderTopStyle: '',
    borderTopWidth: '',
    borderWidth: '',
    boxShadow: '',
    animation: '',
    color: '',
    fontSize: '',
    textAlign: '',
    paddingTop: '',
    paddingBottom: '',
    paddingLeft: '',
    paddingRight: '',
    marginTop: '',
    marginBottom: '',
    marginLeft: '',
    marginRight: '',
    lineHeight: '',
    fontFamily: '',
    clear: '',
    clip: '',
    cursor: '',
    font: '',
    fontVariant: '',
    fontWieght: '',
    height: '',
    left: '',
    letterSpacing: '',
    listStyle: '',
    listStyleImage: '',
    listStyleType: '',
    margin: '',
    pageBreakAfter: '',
    pageBreakBefore: '',
    position: '',
    strokeDasharray: '',
    strokeDashoffset: '',
    strokeWidth: '',
    textDecoration: '',
    textIndent: '',
    textTransform: '',
    top: '',
    right: '',
    bottom: '',
    verticalAlign: '',
    visibility: '',
    width: '',
    zIndex: '',
    display: '',
    cssFloat: '',
    filter: '',
    backgroundColor: '',
    lineBreak: '',
    opacity: '',
    outline: '',
    outlineColor: '',
    outlineOffset: '',
    outlineWidth: '',
    padding: '',
    paddingBlock: '',
    paddingBlockEnd: '',
    paddingBlockStart: '',
    paddingInLineEnd: '',
    paddingInLineStart: '',
    pageBreakInside: '',
    rotate: '',
    textAlignLast: '',
    textCombineUpright: '',
    textDecorationColor: '',
    textDecorationLine: '',
    textDecorationSkipInk: '',
    textDecorationStyle: '',
    textDecorationThickness: '',
    textEmphasis: '',
    textEmphasisColor: '',
    textEmphasisPosition: '',
    textEmphasisStyle: '',
    textJustify: '',
    textOrientation: '',
    textRendering: '',
    textShadow: '',
    textUnderLineOffset: '',
    textUnderLinePosition: '',
    transformBox: '',
    transformOrigin: '',
    transition: '',
    transitionDelay: '',
    transitionDuration: '',
    transitionProperty: '',
    transitionTimingFunction: '',
    translate: '',
    whiteSpace: '',
    wordBreak: '',
    wordSpacing: '',
    wordWrap: '',
    flex: '',
    alignContent: '',
    alignItems: '',
    alignSelf: '',
    customField: '',
    customFieldTwo: '',
    customFieldThree: '',
    customFieldFour: '',
    customFieldFive: '',
  };

  getAllStyleSettings() {
    console.log(this.webContentService.webContentArray);
    this.myContent.Id = this.webContentService.webContentArray[0].Id;
    //This is basically saying "Turn every object at whatever the color says in the zero array, which happens to be red" which is also causing all other text to be red as well
    this.myContent.color = this.webContentService.webContentArray[0].color;
    //How do we get it to say, look at the color within the object itself and turn it that color
    this.webContentService.webContentArray.forEach((contentObject) => {
      let newObject: Webcontent = {
        Id: null,
        PageId: null,
        TextBody: '',
        ImageUrl: '',
        DateCreated: null,
        isText: '',
        isImage: '',
        TextId: null,
        ImageId: null,
        SettingsId: null,
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundImage: '',
        backgroundOrigin: '',
        backgroundPosition: '',
        backgroundRepeat: '',
        backgroundSize: '',
        background: '',
        border: '',
        borderBottom: '',
        borderBottomColor: '',
        borderBottomLeftRadius: '',
        borderBottomRightRadius: '',
        borderBottomStyle: '',
        borderBottomWidth: '',
        borderColor: '',
        borderImage: '',
        borderImageOutset: '',
        borderImageRepeat: '',
        borderImageSlice: '',
        borderImageSource: '',
        borderImageWidth: '',
        borderLeft: '',
        borderLeftColor: '',
        borderLeftStyle: '',
        borderLeftWidth: '',
        borderStyle: '',
        borderTop: '',
        borderTopColor: '',
        borderTopLeftRadius: '',
        borderTopRightRadius: '',
        borderTopStyle: '',
        borderTopWidth: '',
        borderWidth: '',
        boxShadow: '',
        animation: '',
        color: '',
        fontSize: '',
        textAlign: '',
        paddingTop: '',
        paddingBottom: '',
        paddingLeft: '',
        paddingRight: '',
        marginTop: '',
        marginBottom: '',
        marginLeft: '',
        marginRight: '',
        lineHeight: '',
        fontFamily: '',
        clear: '',
        clip: '',
        cursor: '',
        font: '',
        fontVariant: '',
        fontWieght: '',
        height: '',
        left: '',
        letterSpacing: '',
        listStyle: '',
        listStyleImage: '',
        listStyleType: '',
        margin: '',
        pageBreakAfter: '',
        pageBreakBefore: '',
        position: '',
        strokeDasharray: '',
        strokeDashoffset: '',
        strokeWidth: '',
        textDecoration: '',
        textIndent: '',
        textTransform: '',
        top: '',
        right: '',
        bottom: '',
        verticalAlign: '',
        visibility: '',
        width: '',
        zIndex: '',
        display: '',
        cssFloat: '',
        filter: '',
        backgroundColor: '',
        lineBreak: '',
        opacity: '',
        outline: '',
        outlineColor: '',
        outlineOffset: '',
        outlineWidth: '',
        padding: '',
        paddingBlock: '',
        paddingBlockEnd: '',
        paddingBlockStart: '',
        paddingInLineEnd: '',
        paddingInLineStart: '',
        pageBreakInside: '',
        rotate: '',
        textAlignLast: '',
        textCombineUpright: '',
        textDecorationColor: '',
        textDecorationLine: '',
        textDecorationSkipInk: '',
        textDecorationStyle: '',
        textDecorationThickness: '',
        textEmphasis: '',
        textEmphasisColor: '',
        textEmphasisPosition: '',
        textEmphasisStyle: '',
        textJustify: '',
        textOrientation: '',
        textRendering: '',
        textShadow: '',
        textUnderLineOffset: '',
        textUnderLinePosition: '',
        transformBox: '',
        transformOrigin: '',
        transition: '',
        transitionDelay: '',
        transitionDuration: '',
        transitionProperty: '',
        transitionTimingFunction: '',
        translate: '',
        whiteSpace: '',
        wordBreak: '',
        wordSpacing: '',
        wordWrap: '',
        flex: '',
        alignContent: '',
        alignItems: '',
        alignSelf: '',
        customField: '',
        customFieldTwo: '',
        customFieldThree: '',
        customFieldFour: '',
        customFieldFive: '',
      };
      //Created a new object per array

      // Need to assign a value to new object
      newObject.color = contentObject.color;

      // Now that each object has an array, need to somehow assign that objects value to each piece of content on load
    });
  }
}
