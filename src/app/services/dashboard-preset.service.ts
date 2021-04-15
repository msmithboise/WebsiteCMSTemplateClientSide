import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DashboardPreset } from '../models/dashboard-preset.model';
import { WebStructureService } from '../web-structure.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardPresetService {
  readonly webApi = this.webStructureService.globalApi;
  public dashboardPresetArray: DashboardPreset[];
  public globalFontFamly = 'Work Sans';

  constructor(
    public http: HttpClient,
    public webStructureService: WebStructureService
  ) {}

  //Get all dashboard presets
  getAllPresets() {
    return this.http.get<DashboardPreset[]>(this.webApi + '/Dashboards');
  }

  //Get all dashboard presets by clientUrl
  getAllPresetsByClientUrl(clientUrl: string) {
    return this.http.get<DashboardPreset[]>(
      this.webApi + '/Dashboards/' + clientUrl
    );
  }

  //Post Presets
  postPresets(formData: FormGroup) {
    return this.http.post(this.webApi + '/Dashboards', formData);
  }
}
