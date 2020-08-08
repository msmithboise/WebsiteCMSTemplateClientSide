import { Component, OnInit } from '@angular/core';
import { CustomPageService } from 'src/app/services/custom-page.service';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.css'],
})
export class CustomPageComponent implements OnInit {
  constructor(public service: CustomPageService) {}

  ngOnInit(): void {}
}
