import {Observable} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {IClass} from '../../../shared/models/class.model';

@Injectable({providedIn: 'root'})
export class ClassService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = environment.apiUrl + "/classes";

  getAll(): Observable<IClass[]> {
    return this.httpClient.get<IClass[]>(this.apiUrl, {withCredentials: true});
  }
}
