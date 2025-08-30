import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {SectorDto} from '../../../shared/dtos/sector.dto';

@Injectable({providedIn: 'root'})
export class SectorService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = environment.apiUrl + "/sectors";

  getAll(): Observable<SectorDto[]> {
    return this.httpClient.get<SectorDto[]>(this.apiUrl, {withCredentials: true});
  }
}
