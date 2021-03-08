import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomPage } from '../models/custom-page.model';
import { Navbar } from '../models/navbar.model';
import { WebStructureService } from '../web-structure.service';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  readonly webApi = this.webStructureService.globalApi;
  public navBarArray: Navbar[];
  public navBarByClientUrlArray: Navbar[];
  public navLinksByClientUrl: CustomPage[];
  public subPageNavLinks: CustomPage[] = [];
  public subPageLinks: CustomPage[] = [];
  public subPageChildLinks: CustomPage[] = [];

  constructor(
    public http: HttpClient,
    public webStructureService: WebStructureService
  ) {}

  //Get Navbar data byClient url
  getNavBarDataByClientUrl(url: string): Observable<Navbar[]> {
    return this.http.get<Navbar[]>(this.webApi + '/NavBarByClientUrl/' + url);
  }

  //postBy client url
  postNavBarDataByClientUrl(formData: Navbar) {
    return this.http.post(this.webApi + '/NavBarByClientUrl', formData);
  }

  //Get Navbar data
  getNavBarData(): Observable<Navbar[]> {
    return this.http.get<Navbar[]>(this.webApi + '/NavBar');
  }
  //post
  postNavBarData(formData: Navbar) {
    return this.http.post(this.webApi + '/NavBar', formData);
  }

  // get Nav Links

  getNavBarLinksFromPages(url: string) {
    return this.http.get<CustomPage[]>(
      this.webApi + '/PagesByClientUrl/' + url
    );
  }

  getSubPageLinks(id: number) {
    return this.http.get<CustomPage[]>(
      this.webApi + '/SubPagesByClientUrl/' + id
    );
  }
}
