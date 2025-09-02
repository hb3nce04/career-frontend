import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SectorModel} from '../../../../shared/models/sector.model';
import {ENVIRONMENT} from '../../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class SectorService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = ENVIRONMENT.API_URL + "/sectors";

  getAll(): Observable<SectorModel[]> {
    return this.httpClient.get<SectorModel[]>(this.apiUrl, {withCredentials: true});
  }
}
