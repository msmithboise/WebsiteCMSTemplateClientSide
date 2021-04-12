import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SubpageService } from '../services/subpage.service';
import { WebStructureService } from '../web-structure.service';
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
    private sanitizer: DomSanitizer,
    public webStructureService: WebStructureService
  ) {}

  ngOnInit(): void {
    this.checkIfRouteChanged();
    this.subscribeToRoute();
    //this.refreshRoute();
    this.initializeRouteParams();
    this.getSubPageContentByIds(this.pageId, this.subPageId);
    //this.grabPageIdInfo();
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

  getSubPageContentByIds(pageId: number, subPageId: number) {
    pageId = this.pageId;
    subPageId = this.subPageId;

    this.subPageService
      .getSubContentByIds(pageId, subPageId)
      .subscribe((res: Webcontent[]) => {
        console.log('subpage: getSubPageContentByIds');
        this.webStructureService.getRequests++;
        this.subPageService.subPageContentArray = res;
      });
  }

  resizeToggled() {
    this.resizeButtonToggled = !this.resizeButtonToggled;
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

      var activePageId = params['pageId'];
    });

    //if subpage id or page id does not match what is in route, initializeRouteParams()
  }

  openSubPageDashboard() {
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
  }

  subscribeToRoute() {
    this.sub = this.route.params.subscribe((params) => {
      this.subPageId = params['subPageId'];

      this.pageId = params['pageId'];

      this.subPageService
        .getSubContentByIds(this.pageId, this.subPageId)
        .subscribe((res: Webcontent[]) => {
          console.log('subpage: subscribeToRoute');
          this.webStructureService.getRequests++;
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

      this.subPageId = params.subPageId;
    });
  }

  grabPageIdInfo() {
    this.pageDescription = this.route.snapshot.paramMap.get('pageDescription');

    this.pageId = Number(this.route.snapshot.paramMap.get('pageId'));

    this.subPageDescription = this.route.snapshot.paramMap.get(
      'subPageDescription'
    );

    this.subPageId = Number(this.route.snapshot.paramMap.get('subPageId'));
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
      console.log('subpage: getSubPageAllContent');
      this.webStructureService.getRequests++;
      this.subPageService.subPageContentArray = res;
    });
  }

  onSubmit(form: FormGroup) {
    this.postSubPageContentByIds(form);
  }

  postSubPageContentByIds(subTextContentForm: FormGroup) {
    var newForm = subTextContentForm.value;
    newForm.PageId = this.pageId;
    newForm.SubPageId = this.subPageId;

    this.subPageService
      .postSubContentByIds(newForm)
      .subscribe((res: Webcontent[]) => {
        this.subPageService.subPageContentByIdsArray = res;
      });
  }
  setAudioUrl(audioUrl: string) {
    var audio = new Audio();
    audio.src = audioUrl;

    if (audioUrl) {
      var cleanAudio = this.sanitizer.bypassSecurityTrustResourceUrl(audioUrl);
      return cleanAudio;
    }
  }
}
