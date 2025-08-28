import {Observable} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {SchoolDto} from '../../../shared/dtos/school.dto';

@Injectable({providedIn: 'root'})
export class SchoolService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = environment.apiUrl + "/schools";

  getAll(): Observable<SchoolDto[]> {
    return this.httpClient.get<SchoolDto[]>(this.apiUrl, {withCredentials: true});
  }
}
