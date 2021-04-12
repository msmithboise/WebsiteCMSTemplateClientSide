import { syntaxError } from '@angular/compiler';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WebStructureService } from '../web-structure.service';
import { Webcontent } from '../WebContent/webcontent.model';
import { WebcontentService } from '../WebContent/webcontent.service';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  bounceInOnEnterAnimation,
  rubberBandAnimation,
  bounceAnimation,
  slideInUpAnimation,
  slideInUpOnEnterAnimation,
  heartBeatAnimation,
  heartBeatOnEnterAnimation,
  bounceInAnimation,
  slideInLeftOnEnterAnimation,
  slideInRightOnEnterAnimation,
  pulseAnimation,
  jelloAnimation,
  hueRotateAnimation,
  headShakeAnimation,
  zoomInAnimation,
  flipAnimation,
  flashAnimation,
} from 'angular-animations';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.css'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    rubberBandAnimation(),
    bounceAnimation(),
    slideInUpAnimation(),
    slideInUpOnEnterAnimation(),
    slideInLeftOnEnterAnimation(),
    slideInRightOnEnterAnimation(),

    heartBeatAnimation(),
    heartBeatOnEnterAnimation(),
    bounceInOnEnterAnimation(),
    pulseAnimation(),
    jelloAnimation(),
    hueRotateAnimation(),

    headShakeAnimation(),
    zoomInAnimation(),
    flipAnimation(),
    flashAnimation(),
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate(2000)]),
    ]),
    trigger('openSesame', [
      transition('void <=> *', [
        animate(
          '1s',
          keyframes([
            style({ opacity: 0.1, offset: 0.1 }),
            style({ opacity: 0.6, offset: 0.2 }),
            style({ opacity: 1, offset: 0.5 }),
            style({ opacity: 0.2, offset: 0.7 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class ContentViewComponent implements OnInit {
  @Input() columnId: number;
  contentList = [];
  newContentList: Webcontent[];
  filteredContentList = [];
  public screenWidth: number;
  public screenHeight: number;
  public fontAwesomeIcon: string;
  public innerWidth: number;
  public hover: boolean;
  public buttonStyles: Webcontent;
  public originalButtonColor: string;
  public originalButtonFontSize: string;
  public defaultButtonTextColor: string;
  public defaultButtonText: string;
  public defaultButtonLetterSpacing: string;
  public defaultButtonFontSize: string;
  public animation: string;
  public animationTwo: string;
  public animationState: boolean;
  public animationWithState: boolean;

  constructor(
    public webStructureService: WebStructureService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getContentListsByColumnId();
    this.getScreenSize();
    this.isMobile();
    this.setFontAwesomeIcon();
    this.setAnimation();
  }

  setAnimation() {
    //this.animation = 'fadeInOnEnter';
    this.animation = 'slideInUp';
    this.animationTwo = 'heartBeat';
  }

  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
      this.animationWithState = !this.animationWithState;
    }, 1);
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
      backgroundColor: content.backgroundColor,

      color: content.color,
      fontSize: content.fontSize,
      fontFamily: content.fontFamily,
      letterSpacing: content.letterSpacing,
      transitionDuration: content.transitionDuration,
    };
    return styles;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  buttonNonHover(content: Webcontent) {
    this.hover == false;

    return (
      (content.backgroundColor = this.originalButtonColor),
      (content.fontSize = this.originalButtonFontSize),
      (content.color = this.defaultButtonTextColor),
      (content.buttonText = this.defaultButtonText),
      (content.letterSpacing = this.defaultButtonLetterSpacing),
      (content.fontSize = this.defaultButtonFontSize)
    );
  }

  buttonHover(content: Webcontent) {
    this.originalButtonColor = content.backgroundColor;
    this.originalButtonFontSize = content.fontSize;
    this.defaultButtonTextColor = content.color;
    this.defaultButtonText = content.buttonText;
    this.defaultButtonLetterSpacing = content.letterSpacing;
    this.defaultButtonFontSize = content.fontSize;

    return (
      (content.backgroundColor = content.buttonHoverBgColor),
      // (content.fontSize = '50px'),
      (content.color = content.buttonHoverTextColor),
      (content.buttonText = content.buttonHoverText),
      (content.letterSpacing = content.buttonHoverImageOverlay),
      (content.fontSize = content.customField)
    );
  }

  // 320px - 768px
  isMobile() {
    if (window.innerWidth <= 768) {
      return true;
    }
  }

  //my screen 1920px
  // 2560px >
  isDesktop() {
    if (window.innerWidth > 1400) {
      return true;
    }
  }

  //768px - 1024px
  isTablet() {
    if (window.innerWidth > 768 && window.innerWidth <= 1024) {
      return true;
    }
  }

  // 1024px - 2560px
  isLaptop() {
    if (window.innerWidth > 1024 && window.innerWidth <= 1400) {
      return true;
    }
  }

  getScreenRes() {}

  getScreenSize() {
    this.screenWidth = window.innerWidth;

    this.screenHeight = window.innerHeight;
  }

  getContentListsByColumnId() {
    if (this.contentList.length <= 0) {
      this.webStructureService
        .getContentLists(this.columnId)
        .subscribe((res: Webcontent) => {
          this.webStructureService.getRequests++;
          console.log('content-view: getContentListsByColumnId');

          //debugger;
          this.contentList = res[0];

          console.log('content list:  ', this.contentList);

          for (let i = 0; i < this.contentList.length; i++) {
            const content = this.contentList[i];
            // EX: its saying that contentId: 3743

            // if the column id of the content.ColumnId: 3790 does NOT equal this.columnId 3790
            //it doesn't  Then continue to the next content
            // if (content.ColumnId != this.columnId) {
            //   continue;
            // }
            //it does..

            //then if the contentId isnt null, meaning the object exists...

            //take the ENTIRE list we brought back and add it to the newContentList

            if (content.ColumnId == this.columnId) {
              this.filteredContentList.push(content);
              console.log('adding to list..', this.filteredContentList);

              //this.newContentList = this.contentList;
              this.newContentList = this.filteredContentList;
            }
          }
        });
    }
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
