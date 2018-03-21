import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Inspection } from './Inspection';

@Injectable()
export class InspectionService {

  constructor(private http: HttpClient) {}

  public getInspections() {
    const uri = 'http://localhost:3001/inspections';
    return this
      .http
      .get(uri)
      .map((res: Inspection[]) => {
        return res;
      });
  }

  public getInspection(id) {
    const uri = 'http://localhost:3001/inspections/' + id;
    return this
      .http
      .get(uri)
      .map((res: Inspection) => {
        return res;
      });
  }

  public updateInspection(id, params) {
    const uri = 'http://localhost:3001/inspections/' + id;

    return this
      .http
      .put(uri, params)
      .map((res: Inspection) => {
        return res;
      });
  }
}
