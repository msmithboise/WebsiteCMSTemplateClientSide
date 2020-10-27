import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Navbar } from '../models/navbar.model';
import { NavBarService } from '../services/nav-bar.service';

@Component({
  selector: 'app-navbar-settings',
  templateUrl: './navbar-settings.component.html',
  styleUrls: ['./navbar-settings.component.css'],
})
export class NavbarSettingsComponent implements OnInit {
  constructor(
    public navBarService: NavBarService,
    private route: ActivatedRoute,
    public toastr: ToastrService
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
    this.navBarService.postNavBarData(form.value).subscribe((res: Navbar[]) => {
      this.navBarService.navBarArray = res;
      console.log('navbar array');
      console.log(this.navBarService.navBarArray);
      this.toastr.success('Edited Navbar succesfully!');
      this.grabNavBarData();
    });
  }

  grabNavBarData() {
    this.navBarService.getNavBarData().subscribe((res) => {
      this.navBarService.navBarArray = res;
      console.log('navbar array');
      console.log(this.navBarService.navBarArray);
    });
  }

  onEditSubmit(form: NgForm) {
    this.insertEditSettings(form);
  }

  insertEditSettings(form: NgForm) {
    console.log('form and id:');
    console.log(form);

    // this.route.params.subscribe((params) => {
    //   this.pageId = params.pageId;
    //   this.pageDescription = params.pageDescription;
    // });
  }
}
