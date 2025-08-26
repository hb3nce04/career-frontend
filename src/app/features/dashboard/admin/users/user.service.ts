import {Observable} from 'rxjs';
import {IUser} from '../../../../shared/models/user.model';
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class UserService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = environment.apiUrl + "/users";

  getAll(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.apiUrl, {withCredentials: true});
  }
}
