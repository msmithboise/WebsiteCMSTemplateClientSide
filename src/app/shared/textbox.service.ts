import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Textbox } from '../textbox.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TextboxService {
  textBoxContent = [];
  readonly rootURL = 'http://localhost:54704/api';

  constructor(public http: HttpClient) {}

  getContent(): Observable<Textbox[]> {
    return this.http.get<Textbox[]>(this.rootURL + '/TextBox');
  }
}
