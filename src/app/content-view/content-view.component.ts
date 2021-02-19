import { syntaxError } from '@angular/compiler';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WebStructureService } from '../web-structure.service';
import { Webcontent } from '../WebContent/webcontent.model';
import { WebcontentService } from '../WebContent/webcontent.service';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.css'],
})
export class ContentViewComponent implements OnInit {
  @Input() columnId: number;
  contentList: Webcontent[];
  newContentList: Webcontent[];
  public screenWidth: number;
  public screenHeight: number;
  public fontAwesomeIcon: string;
  public innerWidth: number;
  public hover: boolean;

  constructor(
    public webStructureService: WebStructureService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getContentListsByColumnId();
    this.getScreenSize();
    this.isMobile();
    this.setFontAwesomeIcon();
  }

  setFontAwesomeIcon() {
    this.fontAwesomeIcon = 'fab fa-facebook';
  }

  setIconHttp(icon: string) {
    var address = 'https://unpkg.com/simple-icons@v4/icons/facebook.svg';

    var newAddress = 'https://unpkg.com/simple-icons@v4/icons/' + icon + '.svg';

    return newAddress;
  }

  myButton(content: Webcontent) {
    var styles = {
      fontSize: content.fontSize,
      color: content.color,
      backgroundAttachment: content.backgroundAttachment,
      backgroundClip: content.backgroundClip,

      backgroundOrigin: content.backgroundOrigin,
      backgroundPosition: content.backgroundPosition,
      backgroundRepeat: content.backgroundRepeat,
      backgroundSize: content.backgroundSize,
      background: content.background,
      border: content.border,
      borderBottom: content.borderBottom,
      borderBottomColor: content.borderBottomColor,
      borderBottomLeftRadius: content.borderBottomLeftRadius,
      borderBottomRightRadius: content.borderBottomRightRadius,
      borderBottomStyle: content.borderBottomStyle,
      borderBottomWidth: content.borderBottomWidth,
      borderColor: content.borderColor,
      borderImage: content.borderImage,
      borderImageOutset: content.borderImageOutset,
      borderImageRepeat: content.borderImageRepeat,
      borderImageSlice: content.borderImageSlice,
      borderImageSource: content.borderImageSource,
      borderImageWidth: content.borderImageWidth,
      borderLeft: content.borderLeft,
      borderLeftColor: content.borderLeftColor,
      borderLeftStyle: content.borderLeftStyle,
      borderLeftWidth: content.borderLeftWidth,
      borderStyle: content.borderStyle,
      borderTop: content.borderTop,
      borderTopColor: content.borderTopColor,
      borderTopLeftRadius: content.borderTopLeftRadius,
      borderTopRightRadius: content.borderTopRightRadius,
      borderTopStyle: content.borderTopStyle,
      borderTopWidth: content.borderTopWidth,
      borderWidth: content.borderWidth,
      boxShadow: content.boxShadow,
      animation: content.animation,
      textAlign: content.textAlign,
      paddingTop: content.paddingTop,
      paddingBottom: content.paddingBottom,
      paddingLeft: content.paddingLeft,
      paddingRight: content.paddingRight,
      marginTop: content.marginTop,
      marginBottom: content.marginBottom,
      marginLeft: content.marginLeft,
      marginRight: content.marginRight,
      lineHeight: content.lineHeight,
      fontFamily: content.fontFamily,
      clear: content.clear,
      clip: content.clip,
      cursor: content.cursor,
      fontVariant: content.fontVariant,
      fontWeight: content.fontWieght,

      left: content.left,
      letterSpacing: content.letterSpacing,
      listStyle: content.listStyle,
      listStyleImage: content.listStyleImage,
      listStyleType: content.listStyleType,
      margin: content.margin,
      pageBreakAfter: content.pageBreakAfter,
      pageBreakBefore: content.pageBreakBefore,
      position: content.position,
      strokeDasharray: content.strokeDasharray,
      strokeDashoffset: content.strokeDashoffset,
      strokeWidth: content.strokeWidth,
      textDecoration: content.textDecoration,
      textIndent: content.textIndent,
      textTransform: content.textTransform,
      top: content.top,
      right: content.right,
      bottom: content.bottom,
      verticalAlign: content.verticalAlign,
      visibility: content.visibility,
      width: content.width,
      zIndex: content.zIndex,
      display: content.display,
      cssFloat: content.cssFloat,
      filter: content.filter,
      backgroundColor: content.backgroundColor,
      lineBreak: content.lineBreak,
      opacity: content.opacity,
      outline: content.outline,
      outlineColor: content.outlineColor,
      outlineOffset: content.outlineOffset,
      outlineWidth: content.outlineWidth,
      padding: content.padding,
      paddingBlock: content.paddingBlock,
      paddingBlockEnd: content.paddingBlockEnd,
      paddingBlockStart: content.paddingBlockStart,
      paddingInLineEnd: content.paddingInLineEnd,
      paddingInLineStart: content.paddingInLineStart,
      pageBreakInside: content.pageBreakInside,
      rotate: content.rotate,
      textAlignLast: content.textAlignLast,
      textCombineUpright: content.textCombineUpright,
      textDecorationColor: content.textDecorationColor,
      textDecorationLine: content.textDecorationLine,
      textDecorationSkipInk: content.textDecorationSkipInk,
      textDecorationStyle: content.textDecorationStyle,
      textDecorationThickness: content.textDecorationThickness,
      textEmphasis: content.textEmphasis,
      textEmphasisColor: content.textEmphasisColor,
      textEmphasisPosition: content.textEmphasisPosition,
      textEmphasisStyle: content.textEmphasisStyle,
      textJustify: content.textJustify,
      textOrientation: content.textOrientation,
      textRendering: content.textRendering,
      textShadow: content.textShadow,

      textUnderLinePosition: content.textUnderLinePosition,
      transformBox: content.transformBox,
      transformOrigin: content.transformOrigin,
      transition: content.transition,
      transitionDelay: content.transitionDelay,
      transitionDuration: content.transitionDuration,
      transitionProperty: content.transitionProperty,
      transitionTimingFunction: content.transitionTimingFunction,
      translate: content.translate,
      whiteSpace: content.whiteSpace,
      wordBreak: content.wordBreak,
      wordSpacing: content.wordSpacing,
      wordWrap: content.wordWrap,
      flex: content.flex,
      alignContent: content.alignContent,
      alignItems: content.alignItems,
      alignSelf: content.alignSelf,
    };
    return styles;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  buttonNonHover() {
    this.hover == false;
    console.log('button is NOT being hovered');
  }

  buttonHover() {
    this.hover == true;

    console.log('button is being hovered');
  }

  isMobile() {
    if (window.innerWidth < 600) {
      return true;
    }
  }

  getScreenRes() {}

  getScreenSize() {
    this.screenWidth = window.innerWidth;

    this.screenHeight = window.innerHeight;
  }

  getContentListsByColumnId() {
    this.webStructureService
      .getContentLists(this.columnId)
      .subscribe((res: Webcontent) => {
        this.contentList = res[0];

        for (let i = 0; i < this.contentList.length; i++) {
          const content = this.contentList[i];

          if (content.ColumnId != this.columnId) {
            continue;
          }

          if (content.Id != null) {
            this.newContentList = this.contentList;
          }
        }
      });
  }

  createLink(hyperLink: string) {
    return hyperLink;
  }

  setAudioUrl(audioUrl: string) {
    var audio = new Audio();
    audio.src = audioUrl;

    if (audioUrl) {
      var cleanAudio = this.sanitizer.bypassSecurityTrustResourceUrl(audioUrl);
      return cleanAudio;
    }
  }

  setYouTubeEmbed(embedLink) {
    if (embedLink != null) {
      var url = embedLink;
      url = url.replace('youtu.be', 'youtube.com/embed');
      var embed = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      return embed;
    }
  }

  createMapLink(mapSearch: string) {
    var base = 'https://www.google.com/maps/embed/v1/search?key=';
    var apiKey = 'AIzaSyBunkNh2PQkqdZqA9kSGo0rEjjlW0wZjL4';
    var testQuery = 'riveroflife+pocatello+idaho';
    var userQuery = mapSearch;
    var link = base + apiKey + '&q=' + userQuery;
    var cleanedLink = this.sanitizer.bypassSecurityTrustResourceUrl(link);

    return cleanedLink;
  }
}
