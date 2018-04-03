import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

import { Finding } from './Finding';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { User } from '../users/User';

@Injectable()
export class FindingService {
  public apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  public getFindings(inspectionId) {
    const uri = this.apiUrl + '/findings';

    return this
      .http
      .get(uri)
      .map((res: Finding[]) => {
        return res;
      });
  }

  public createFinding(params) {
    const uri = this.apiUrl + '/findings';

    return this
      .http
      .post(uri, params)
      .map((finding: Finding) => {
        return finding;
      });
  }

  public getInspectionAndFindings(inspectionId) {
    const inspection = this.http.get(this.apiUrl + '/inspections/' + inspectionId);
    const findings = this.http.get(this.apiUrl + '/findings');

    return forkJoin([inspection, findings]);
  }

}
