import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SubpageService } from '../services/subpage.service';
import { Webcontent } from '../WebContent/webcontent.model';
import { WebcontentService } from '../WebContent/webcontent.service';

@Component({
  selector: 'app-subpage',
  templateUrl: './subpage.component.html',
  styleUrls: ['./subpage.component.css'],
})
export class SubpageComponent implements OnInit {
  public pageDescription: string;
  public pageId: number;
  public subPageDescription: string;
  public subPageId: number;
  public loadPage: {};
  public sub: {};
  public resizeButtonToggled: boolean = false;
  constructor(
    public subPageService: SubpageService,
    public webContentService: WebcontentService,
    private route: ActivatedRoute,
    public router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.checkIfRouteChanged();
    this.subscribeToRoute();
    //this.refreshRoute();
    this.initializeRouteParams();
    this.getSubPageContentByIds(this.pageId, this.subPageId);
    //this.grabPageIdInfo();
  }

  getSubPageContentByIds(pageId: number, subPageId: number) {
    pageId = this.pageId;
    subPageId = this.subPageId;

    this.subPageService
      .getSubContentByIds(pageId, subPageId)
      .subscribe((res: Webcontent[]) => {
        this.subPageService.subPageContentArray = res;
        // console.log('getting content by page and sub page id..');
        // console.log(res);
      });
  }

  resizeToggled() {
    this.resizeButtonToggled = !this.resizeButtonToggled;
    // console.log('button toggled');
  }

  setYouTubeEmbed(embedLink) {
    if (embedLink != null) {
      var url = embedLink;
      url = url.replace('youtu.be', 'youtube.com/embed');
      var embed = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      return embed;
    }
  }

  checkIfRouteChanged() {
    this.route.params.subscribe((params) => {
      var activeSubPageId = params['subPageId'];
      // console.log(activeSubPageId);
      var activePageId = params['pageId'];
      // console.log(activePageId);
    });

    //if subpage id or page id does not match what is in route, initializeRouteParams()
  }

  openSubPageDashboard() {
    //  console.log('opened page settings.');

    this.router.navigate([
      'dashboard/' +
        this.pageDescription +
        '/' +
        this.pageId +
        '/subPage/' +
        this.subPageDescription +
        '/' +
        this.subPageId,
    ]);

    //this is the correct route http://localhost:4200/settings/Home/1/subPage/Campus/1
    // this is what im getting                       /settings/Home/1/subPage/Campus/1

    console.log(
      'dashboard/' +
        this.pageDescription +
        '/' +
        this.pageId +
        '/subPage/' +
        this.subPageDescription +
        '/' +
        this.subPageId
    );
  }

  subscribeToRoute() {
    this.sub = this.route.params.subscribe((params) => {
      this.subPageId = params['subPageId'];
      //   console.log(this.subPageId);
      this.pageId = params['pageId'];
      //   console.log(this.pageId);

      this.subPageService
        .getSubContentByIds(this.pageId, this.subPageId)
        .subscribe((res: Webcontent[]) => {
          //       console.log('subscribing to route');
          this.subPageService.subPageContentArray = res;
        });
    });
  }

  refreshRoute() {
    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      const refresh = paramMap.get('refresh');
      if (refresh) {
        this.initializeRouteParams();
        this.getSubPageContentByIds(this.pageId, this.subPageId);
      }
    });
  }

  initializeRouteParams() {
    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
      this.pageDescription = params.pageDescription;
      this.subPageDescription = params.subPageDescription;
      //console.log(this.pageId);
      this.subPageId = params.subPageId;
      //console.log(this.subPageId);
    });
  }

  grabPageIdInfo() {
    this.pageDescription = this.route.snapshot.paramMap.get('pageDescription');
    //console.log(this.pageDescription);
    this.pageId = Number(this.route.snapshot.paramMap.get('pageId'));
    //console.log(this.pageId);
    this.subPageDescription = this.route.snapshot.paramMap.get(
      'subPageDescription'
    );
    //console.log(this.subPageDescription);
    this.subPageId = Number(this.route.snapshot.paramMap.get('subPageId'));
    //console.log(this.subPageId);
  }

  subTextContentForm = new FormGroup({
    SubPageId: new FormControl(''),
    PageId: new FormControl(''),
    TextBody: new FormControl(''),
  });

  getContent() {
    this.getSubPageContentByIds(this.pageId, this.subPageId);
  }

  getSubPageAllContent() {
    this.subPageService.getAllSubContent().subscribe((res: Webcontent[]) => {
      this.subPageService.subPageContentArray = res;
      //console.log('getting all webcontent for sorting');
      //console.log(res);
    });
  }

  onSubmit(form: FormGroup) {
    //console.log('form');
    // console.log(form);
    this.postSubPageContentByIds(form);
  }

  postSubPageContentByIds(subTextContentForm: FormGroup) {
    var newForm = subTextContentForm.value;
    newForm.PageId = this.pageId;
    newForm.SubPageId = this.subPageId;

    //console.log('newform:');
    //console.log(newForm);

    this.subPageService
      .postSubContentByIds(newForm)
      .subscribe((res: Webcontent[]) => {
        this.subPageService.subPageContentByIdsArray = res;
        // console.log(this.subPageService.subPageContentByIdsArray);
        // console.log('Here is the images based on page id: ');
        // console.log(this.imagesByPageIdArray);
      });
  }
  setAudioUrl(audioUrl: string) {
    var audio = new Audio();
    audio.src = audioUrl;

    // will need to santitize this
    //.trustAsResourceUrl(path + audioFile);

    if (audioUrl) {
      var cleanAudio = this.sanitizer.bypassSecurityTrustResourceUrl(audioUrl);
      return cleanAudio;
    }

    // var audio = document.getElementById('player');
    // console.log('audio');
    // console.log(audio);
    // console.log('passed in audio url');
    // console.log(audioUrl);
  }
}
