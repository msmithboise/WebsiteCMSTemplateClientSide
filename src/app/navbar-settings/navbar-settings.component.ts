import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Navbar } from '../models/navbar.model';
import { NavBarService } from '../services/nav-bar.service';
import { WebStructureService } from '../web-structure.service';

@Component({
  selector: 'app-navbar-settings',
  templateUrl: './navbar-settings.component.html',
  styleUrls: ['./navbar-settings.component.css'],
})
export class NavbarSettingsComponent implements OnInit {
  constructor(
    public navBarService: NavBarService,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public webStructureService: WebStructureService
  ) {}

  ngOnInit(): void {
    this.grabNavBarData();
  }

  grabUrl() {
    var fullUrl = window.location.href;
    console.log('window.location', fullUrl);

    var urlArray = fullUrl.split('/');
    console.log('fullUrl after split', urlArray);

    var myUrl = urlArray[2];
    console.log('url at [2]', myUrl);

    var prodUrl = myUrl.split('.');
    console.log('url after 2nd split', prodUrl);

    if (prodUrl[1] == 'com') {
      prodUrlFinal = prodUrl[0];
    }

    if (prodUrl[0] == 'com') {
      var prodUrlFinal = prodUrl[1];
    }

    console.log('final prodUrl', prodUrlFinal);

    var testUrl = 'localhost4200';

    if (myUrl == 'localhost:4200') {
      this.webStructureService.FinalProdUrl = testUrl;
      return testUrl;
    } else {
      this.webStructureService.FinalProdUrl = prodUrlFinal;
      return prodUrlFinal;
    }

    //If test myUrl = localHost
  }

  onSubmit(form: NgForm) {
    this.createNavBarData(form);
  }

  createNavBarData(form: NgForm) {
    this.navBarService
      .postNavBarDataByClientUrl(form.value)
      .subscribe((res: Navbar[]) => {
        this.navBarService.navBarByClientUrlArray = res;

        this.toastr.success('Edited Navbar succesfully!');
        this.grabNavBarData();
      });
  }

  grabNavBarData() {
    var url = this.grabUrl();
    console.log('url in navbar settings component: ', url);
    this.navBarService.getNavBarDataByClientUrl(url).subscribe((res) => {
      this.navBarService.navBarByClientUrlArray = res;
      console.log('getting navbar data...');
      console.log(res);
    });
  }

  onEditSubmit(form: NgForm) {
    this.insertEditSettings(form);
  }

  insertEditSettings(form: NgForm) {}
}
