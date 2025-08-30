import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {ProfessionDto} from '../../../shared/dtos/profession.dto';

@Injectable({providedIn: 'root'})
export class ProfessionService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = environment.apiUrl + "/professions";

  getAll(): Observable<ProfessionDto[]> {
    return this.httpClient.get<ProfessionDto[]>(this.apiUrl, {withCredentials: true});
  }
}
