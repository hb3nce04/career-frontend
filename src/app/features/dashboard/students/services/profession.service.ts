import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProfessionModel} from '../../../../shared/models/profession.model';
import {ENVIRONMENT} from '../../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ProfessionService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = ENVIRONMENT.API_URL + "/professions";

  getAll(): Observable<ProfessionModel[]> {
    return this.httpClient.get<ProfessionModel[]>(this.apiUrl, {withCredentials: true});
  }
}
