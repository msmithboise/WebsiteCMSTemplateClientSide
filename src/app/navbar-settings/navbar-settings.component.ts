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

  // insertEditSettings(form: NgForm) {

  //   this.webContentService.postEditContentById(form.value).subscribe((res) => {
  //     //this.resetForm(form);
  //     this.toastr.success('Edited content succesfully!');
  //     this.grabAllContentByPageId();
  //
  //   });
  // }

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
    var url = this.webStructureService.FinalProdUrl;
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
