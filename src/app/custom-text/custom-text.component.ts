import { Component, OnInit } from '@angular/core';
import { CustomTextService } from '../services/custom-text.service';

@Component({
  selector: 'app-custom-text',
  templateUrl: './custom-text.component.html',
  styleUrls: ['./custom-text.component.css'],
})
export class CustomTextComponent implements OnInit {
  constructor(public customTextService: CustomTextService) {}

  ngOnInit(): void {}
}
