import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

import { User } from './User';

@Injectable()
export class UsersService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  public getUsers() {
    const uri = this.apiUrl + '/users';

    return this
      .http
      .get(uri)
      .map((res: User[]) => {
        return res;
      });
  }

  public createUser(params) {
    const uri = this.apiUrl + '/users';

    return this
      .http
      .post(uri, params)
      .map((res: User) => {
        return res;
      });
  }

  public getUser(id) {
    const uri = this.apiUrl + '/users/' + id;

    return this
      .http
      .get(uri)
      .map((user: User) => {
        return user;
      });
  }

  public updateUser(id, params) {
    const uri = this.apiUrl + '/users/' + id;

    return this
      .http
      .put(uri, params)
      .map((user: User) => {
        return user;
      });
  }

  public deleteUser(id) {
    const uri = this.apiUrl + '/users/' + id;

    return this
      .http
      .delete(uri)
      .map((res: any) => {
        return res;
      });
  }
}
