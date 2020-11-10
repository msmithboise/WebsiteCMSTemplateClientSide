import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    public webStructureService: WebStructureService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getContentByColumnId(this.columnId);
  }

  getContentByColumnId(columnId: number) {
    this.webStructureService
      .getContentByColumnId(columnId)
      .subscribe((res: Webcontent[]) => {
        this.webStructureService.contentByColumnIdArray = res;
        console.log(
          'In content view:  Getting all content by column ids: ',
          columnId
        );
        console.log(this.webStructureService.contentByColumnIdArray);
      });
  }

  createLink(hyperLink: string) {
    return hyperLink;
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
