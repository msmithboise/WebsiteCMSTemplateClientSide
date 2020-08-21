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
    private route: ActivatedRoute
  ) {}

  customPageArray: CustomPage[];
  pageIdSnapshot: number;
  imagesByPageIdArray: CustomImage[];
  textByPageIdArray: CustomText[];
  selectedPageId: number;
  filteredImageArray: CustomImage[];

  ngOnInit(): void {
    this.callCustomPageService();
    this.takePageIdSnapshot();
    this.grabAllImagesByPageId();
    this.grabAllTextByPageId();

    this.grabTextDataFromService();
  }

  populateTextModalOnLoad() {
    this.customTextService.textFormData = {
      TextId: this.textByPageIdArray[0].TextId,
      PageId: this.textByPageIdArray[0].PageId,
      color: this.textByPageIdArray[0].color,
      fontSize: this.textByPageIdArray[0].fontSize,
      textAlign: this.textByPageIdArray[0].textAlign,
      paddingTop: this.textByPageIdArray[0].paddingTop,
      paddingBottom: this.textByPageIdArray[0].paddingBottom,
      paddingLeft: this.textByPageIdArray[0].paddingLeft,
      paddingRight: this.textByPageIdArray[0].paddingRight,
      marginTop: this.textByPageIdArray[0].marginTop,
      marginBottom: this.textByPageIdArray[0].marginBottom,
      marginLeft: this.textByPageIdArray[0].marginLeft,
      marginRight: this.textByPageIdArray[0].marginRight,
      lineHeight: this.textByPageIdArray[0].lineHeight,
      fontFamily: this.textByPageIdArray[0].fontFamily,
      border: this.textByPageIdArray[0].border,
      borderStyle: this.textByPageIdArray[0].borderStyle,
      isText: this.textByPageIdArray[0].isText,
      TextBody: this.textByPageIdArray[0].TextBody,
      borderBottom: this.textByPageIdArray[0].borderBottom,
      borderBottomColor: this.textByPageIdArray[0].borderBottomColor,
      borderBottomStyle: this.textByPageIdArray[0].borderBottomStyle,
      borderBottomWidth: this.textByPageIdArray[0].borderBottomWidth,
      borderColor: this.textByPageIdArray[0].borderColor,
      borderLeftStyle: this.textByPageIdArray[0].borderLeftStyle,
      borderLeftColor: this.textByPageIdArray[0].borderLeftColor,
      borderLeftWidth: this.textByPageIdArray[0].borderLeftWidth,
      borderRight: this.textByPageIdArray[0].borderRight,
      borderRightColor: this.textByPageIdArray[0].borderRightColor,
      borderRightStyle: this.textByPageIdArray[0].borderRightStyle,
      borderTop: this.textByPageIdArray[0].borderTop,
      borderTopColor: this.textByPageIdArray[0].borderTopColor,
      borderTopStyle: this.textByPageIdArray[0].borderTopStyle,
      borderTopWidth: this.textByPageIdArray[0].borderTopWidth,
      borderWidth: this.textByPageIdArray[0].borderWidth,
      clear: this.textByPageIdArray[0].clear,
      clip: this.textByPageIdArray[0].clip,
      cursor: this.textByPageIdArray[0].cursor,
      font: this.textByPageIdArray[0].font,
      fontVariant: this.textByPageIdArray[0].fontVariant,
      fontWeight: this.textByPageIdArray[0].fontWeight,
      height: this.textByPageIdArray[0].height,
      left: this.textByPageIdArray[0].left,
      letterSpacing: this.textByPageIdArray[0].letterSpacing,
      listStyle: this.textByPageIdArray[0].listStyle,
      listStyleImage: this.textByPageIdArray[0].listStyleImage,
      listStyleType: this.textByPageIdArray[0].listStyleType,
      margin: this.textByPageIdArray[0].margin,
      pageBreakAfter: this.textByPageIdArray[0].pageBreakAfter,
      pageBreakBefore: this.textByPageIdArray[0].pageBreakBefore,
      position: this.textByPageIdArray[0].position,
      strokeDasharray: this.textByPageIdArray[0].strokeDasharray,
      strokeDashoffset: this.textByPageIdArray[0].strokeDashoffset,
      strokeWidth: this.textByPageIdArray[0].strokeWidth,
      textDecoration: this.textByPageIdArray[0].textDecoration,
      textIndent: this.textByPageIdArray[0].textIndent,
      textTransform: this.textByPageIdArray[0].textTransform,
      top: this.textByPageIdArray[0].top,
      right: this.textByPageIdArray[0].right,
      bottom: this.textByPageIdArray[0].bottom,
      verticalAlign: this.textByPageIdArray[0].verticalAlign,
      visibility: this.textByPageIdArray[0].visibility,
      width: this.textByPageIdArray[0].width,
      zIndex: this.textByPageIdArray[0].zIndex,
      display: this.textByPageIdArray[0].display,
      cssFloat: this.textByPageIdArray[0].cssFloat,
      filter: this.textByPageIdArray[0].filter,
      backgroundColor: this.textByPageIdArray[0].backgroundColor,
      backgroundPosition: this.textByPageIdArray[0].backgroundPosition,
      backgroundRepeat: this.textByPageIdArray[0].backgroundRepeat,
      lineBreak: this.textByPageIdArray[0].lineBreak,
      opacity: this.textByPageIdArray[0].opacity,
      outline: this.textByPageIdArray[0].outline,
      outlineColor: this.textByPageIdArray[0].outlineColor,
      outlineOffset: this.textByPageIdArray[0].outlineOffset,
      outlineStyle: this.textByPageIdArray[0].outlineStyle,
      outlineWidth: this.textByPageIdArray[0].outlineWidth,
      padding: this.textByPageIdArray[0].padding,
      paddingBlock: this.textByPageIdArray[0].paddingBlock,
      paddingBlockEnd: this.textByPageIdArray[0].paddingBlockEnd,
      paddingBlockStart: this.textByPageIdArray[0].paddingBlockStart,
      paddingInlineEnd: this.textByPageIdArray[0].paddingInlineStart,
      paddingInlineStart: this.textByPageIdArray[0].paddingInlineStart,
      pageBreakInside: this.textByPageIdArray[0].pageBreakInside,
      rotate: this.textByPageIdArray[0].rotate,
      textAlignLast: this.textByPageIdArray[0].textAlignLast,
      textCombineUpright: this.textByPageIdArray[0].textCombineUpright,
      textDecorationColor: this.textByPageIdArray[0].textDecorationColor,
      textDecorationLine: this.textByPageIdArray[0].textDecorationLine,
      textDecorationSkipInk: this.textByPageIdArray[0].textDecorationSkipInk,
      textDecorationStyle: this.textByPageIdArray[0].textDecorationStyle,
      textDecorationThickness: this.textByPageIdArray[0]
        .textDecorationThickness,
      textEmphasis: this.textByPageIdArray[0].textEmphasis,
      textEmphasisColor: this.textByPageIdArray[0].textEmphasisColor,
      textEmphasisPosition: this.textByPageIdArray[0].textEmphasisPosition,
      textEmphasisStyle: this.textByPageIdArray[0].textEmphasisStyle,
      textJustify: this.textByPageIdArray[0].textJustify,
      textOrientation: this.textByPageIdArray[0].textOrientation,
      textOverflow: this.textByPageIdArray[0].textOverflow,
      textRendering: this.textByPageIdArray[0].textRendering,
      textShadow: this.textByPageIdArray[0].textShadow,
      textUnderlineOffset: this.textByPageIdArray[0].textUnderlineOffset,
      textUnderlinePosition: this.textByPageIdArray[0].textUnderlinePosition,
      transformBox: this.textByPageIdArray[0].transformBox,
      transformOrigin: this.textByPageIdArray[0].transformOrigin,
      transition: this.textByPageIdArray[0].transition,
      transitionDelay: this.textByPageIdArray[0].transitionDelay,
      transitionDuration: this.textByPageIdArray[0].transitionDuration,
      transitionProperty: this.textByPageIdArray[0].transitionProperty,
      transitionTimingFunction: this.textByPageIdArray[0]
        .transitionTimingFunction,
      translate: this.textByPageIdArray[0].translate,
      whiteSpace: this.textByPageIdArray[0].whiteSpace,
      wordBreak: this.textByPageIdArray[0].wordBreak,
      wordSpacing: this.textByPageIdArray[0].wordSpacing,
      wordWrap: this.textByPageIdArray[0].wordWrap,
      writingMode: this.textByPageIdArray[0].writingMode,
      flex: this.textByPageIdArray[0].flex,
      alignContent: this.textByPageIdArray[0].alignContent,
      alignItems: this.textByPageIdArray[0].alignItems,
      alignSelf: this.textByPageIdArray[0].alignSelf,
      animation: this.textByPageIdArray[0].animation,
      customField: this.textByPageIdArray[0].customField,
    };
  }

  onSubmit(form: NgForm) {
    //Submit for homepage content
    this.appendPageId();
    this.insertTextRecord(form);
    console.log('We are inserting this form: ');

    console.log(form);
  }

  appendPageId() {
    console.log('appending page id...');
  }

  insertTextRecord(form: NgForm) {
    this.customTextService
      .postSubmittedTextByPageId(form.value)
      .subscribe((res) => {
        //this.resetForm(form);
        this.grabAllTextByPageId();
      });
  }

  //calls a get() and sets data to this.customTextService.customTextArray
  grabTextDataFromService() {
    this.customTextService.setTextDataToArray(this.pageIdSnapshot);
  }

  grabAllImagesByPageId() {
    this.customImageService
      .getImagesByPageId(this.pageIdSnapshot)
      .subscribe((res: CustomImage[]) => {
        this.imagesByPageIdArray = res;
        // console.log('Here is the images based on page id: ');
        // console.log(this.imagesByPageIdArray);
      });
  }

  grabAllTextByPageId() {
    this.customTextService
      .getTextByPageId(this.pageIdSnapshot)
      .subscribe((res: CustomText[]) => {
        this.textByPageIdArray = res;
        // console.log('Here is the text based on page id: ');
        // console.log(this.textByPageIdArray);
      });
    this.populateTextModalOnLoad();
  }

  postTextByPageId() {
    this.customTextService
      .postTextByPageId(
        this.customTextService.textFormData,
        this.pageIdSnapshot
      )
      .subscribe((res: CustomText[]) => {
        this.textByPageIdArray = res;
      });
  }

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
      .createCustomPage(this.customPageService.customPageFormData)
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
}
