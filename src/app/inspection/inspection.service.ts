import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { environment } from '../../environments/environment';

import { Inspection } from './Inspection';
import { Document } from './Document';

@Injectable()
export class InspectionService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  public getInspections() {
    const uri = this.apiUrl + '/inspections';
    return this
      .http
      .get(uri)
      .map((res: Inspection[]) => {
        return res;
      });
  }

  public createInspection(params) {
    const uri = this.apiUrl + '/inspections';

    return this
      .http
      .post(uri, params)
      .map((res: Inspection) => {
        return res;
      });
  }

  public getInspection(id) {
    const uri = this.apiUrl + '/inspections/' + id;
    return this
      .http
      .get(uri)
      .map((res: Inspection) => {
        return res;
      });
  }

  public getOptionsForEdit(id) {
    const inspection = this.http.get(this.apiUrl + '/inspections/' + id);
    const inspectionResults = this.http.get(this.apiUrl + '/inspectionResults');
    const degreeProgress = this.http.get(this.apiUrl + '/degreeProgress');

    return forkJoin([inspection, inspectionResults, degreeProgress]);
  }

  public updateInspection(id, params) {
    const uri = this.apiUrl + '/inspections/' + id;

    return this
      .http
      .put(uri, params)
      .map((res: Inspection) => {
        return res;
      });
  }

  public searchInspection(params) {
    const uri = this.apiUrl + '/inspections';
    let searchParams = new HttpParams();

    Object.keys(params).forEach((key) => {
      searchParams = searchParams.append(key, params[key]);
    });

    return this
      .http
      .get(uri, { params })
      .map((res: Inspection[]) => {
        return res;
      });
  }

  public getRelatedDocuments(id) {
    const uri = this.apiUrl + '/documents/';
    return this
      .http
      .get(uri)
      .map((res: Document[]) => {
        return res;
      });
  }
}
