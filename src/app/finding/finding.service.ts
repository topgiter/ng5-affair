import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

import { Finding } from './Finding';
import { ActionPlan } from './ActionPlan';
import { forkJoin } from 'rxjs/observable/forkJoin';

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

  public getActionPlans(inspectionId) {
    const uri = this.apiUrl + '/actionPlans';

    return this
      .http
      .get(uri)
      .map((res: ActionPlan[]) => {
        return res;
      });
  }

  public getFinding(findingId) {
    const uri = this.apiUrl + '/findings/' + findingId;

    return this
      .http
      .get(uri)
      .map((finding: Finding) => {
        return finding;
      });
  }

  public getActionPlan(apId) {
    const uri = this.apiUrl + '/actionPlans/' + apId;

    return this
      .http
      .get(uri)
      .map((res: ActionPlan) => {
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

  public updateFinding(id, params) {
    const uri = this.apiUrl + '/findings/' + id;

    return this
      .http
      .put(uri, params)
      .map((finding: Finding) => {
        return finding;
      });
  }

  public updateActionPlan(id, params) {
    const uri = this.apiUrl + '/actionPlans/' + id;

    return this
      .http
      .put(uri, params)
      .map((res: ActionPlan) => {
        return res;
      });
  }

  public deleteFinding(id) {
    const uri = this.apiUrl + '/findings/' + id;

    return this
      .http
      .delete(uri)
      .map((res: any) => {
        return res;
      });
  }

  public deleteActionPlan(id) {
    const uri = this.apiUrl + '/actionPlans/' + id;

    return this
      .http
      .delete(uri)
      .map((res: any) => {
        return res;
      });
  }

  public searchFinding(params) {
    const uri = this.apiUrl + '/findings';
    let searchParams = new HttpParams();

    Object.keys(params).forEach((key) => {
      searchParams = searchParams.append(key, params[key]);
    });

    return this
      .http
      .get(uri, { params })
      .map((res: Finding[]) => {
        return res;
      });
  }

  public searchActionPlan(params) {
    const uri = this.apiUrl + '/actionPlans';
    let searchParams = new HttpParams();

    Object.keys(params).forEach((key) => {
      searchParams = searchParams.append(key, params[key]);
    });

    return this
      .http
      .get(uri, { params })
      .map((res: ActionPlan[]) => {
        return res;
      });
  }

  public getInspectionAndFindings(inspectionId) {
    const inspection = this.http.get(this.apiUrl + '/inspections/' + inspectionId);
    const findings = this.http.get(this.apiUrl + '/findings');
    const actionPlans = this.http.get(this.apiUrl + '/actionPlans');

    return forkJoin([inspection, findings, actionPlans]);
  }

}
