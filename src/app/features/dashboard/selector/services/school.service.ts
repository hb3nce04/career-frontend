import {Observable} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENVIRONMENT} from '../../../../../environments/environment';
import {SchoolModel} from '../../../../shared/models/school.model';

@Injectable({providedIn: 'root'})
export class SchoolService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = ENVIRONMENT.API_URL + "/schools";

  getAll(): Observable<SchoolModel[]> {
    return this.httpClient.get<SchoolModel[]>(this.apiUrl, {withCredentials: true});
  }
}
