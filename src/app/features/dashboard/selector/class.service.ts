import {Observable} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ClassDto} from '../../../shared/dtos/class.dto';

@Injectable({providedIn: 'root'})
export class ClassService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = environment.apiUrl + "/classes";

  getAll(): Observable<ClassDto[]> {
    return this.httpClient.get<ClassDto[]>(this.apiUrl, {withCredentials: true});
  }
}
