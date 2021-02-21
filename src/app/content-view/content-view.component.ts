import { syntaxError } from '@angular/compiler';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WebStructureService } from '../web-structure.service';
import { Webcontent } from '../WebContent/webcontent.model';
import { WebcontentService } from '../WebContent/webcontent.service';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  rubberBandAnimation,
  bounceAnimation,
  slideInUpAnimation,
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
  contentList: Webcontent[];
  newContentList: Webcontent[];
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
    this.animation = 'bounce';
  }

  animate() {
    console.log('animating...');
    console.log('selected animation:', this.animation);
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
