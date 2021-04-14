import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardPreset } from '../models/dashboard-preset.model';
import { WebStructureService } from '../web-structure.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardPresetService {
  readonly webApi = this.webStructureService.globalApi;
  public dashboardPresetArray: DashboardPreset[];

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
}
