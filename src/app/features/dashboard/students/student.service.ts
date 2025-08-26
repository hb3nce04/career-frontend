import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {IStudent} from './student.model';

@Injectable({providedIn: 'root'})
export class StudentService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = environment.apiUrl + "/students";

  getAll(): Observable<IStudent[]> {
    return this.httpClient.get<IStudent[]>(this.apiUrl, {withCredentials: true});
  }
}
