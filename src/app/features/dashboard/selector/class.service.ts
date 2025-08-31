import {Observable} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ClassDto, ClassStatisticsDto} from '../../../shared/dtos/class.dto';
import {BaseResponseDto} from '../../../core/dto/base-response.dto';

@Injectable({providedIn: 'root'})
export class ClassService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = environment.apiUrl + "/classes";

  getAll(): Observable<ClassDto[]> {
    return this.httpClient.get<ClassDto[]>(this.apiUrl, {withCredentials: true});
  }

  getStatistics(id: number): Observable<ClassStatisticsDto> {
    return this.httpClient.get<ClassStatisticsDto>(`${this.apiUrl}/${id}/statistics`, {withCredentials: true});
  }

  create(name: string, finishingYear: number, schoolId: number): Observable<BaseResponseDto> {
    return this.httpClient.post<BaseResponseDto>(this.apiUrl, {
      name: name,
      finishingYear: finishingYear,
      schoolId: schoolId,
    }, {withCredentials: true});
  }

  delete(id: number): Observable<BaseResponseDto> {
    return this.httpClient.delete<BaseResponseDto>(this.apiUrl + "/" + id, {withCredentials: true});
  }

  update(id: number, name: string, finishingYear: number, schoolId: number): Observable<BaseResponseDto> {
    return this.httpClient.put<BaseResponseDto>(this.apiUrl + "/" + id, {
      name: name,
      finishingYear: finishingYear,
      schoolId: schoolId,
    }, {withCredentials: true});
  }
}
