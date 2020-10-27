import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavBarService } from '../services/nav-bar.service';

@Component({
  selector: 'app-navbar-settings',
  templateUrl: './navbar-settings.component.html',
  styleUrls: ['./navbar-settings.component.css'],
})
export class NavbarSettingsComponent implements OnInit {
  constructor(
    public navBarService: NavBarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

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
